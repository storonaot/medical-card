import { connect } from 'react-redux'
import { createNewUser, authUser, updateUser } from 'store/actions'
import Paper from 'material-ui/Paper'
import { Tabs, Tab } from 'material-ui/Tabs'
import Snackbar from 'material-ui/Snackbar'
import { hasEmptyValues } from 'helpers'
import path from 'path'
import { pki } from 'node-forge'
import SignIn from './SignIn'
import SignUp from './SignUp'
import styles from './styles'

const electron = window.require('electron')
const fs = electron.remote.require('fs')

const createFile = (uid, fileContent, cb) => {
  const userDataPath = (electron.app || electron.remote.app).getPath('userData')
  const filepath = path.join(userDataPath, `keys_${uid}.txt`)

  fs.writeFile(filepath, fileContent, cb)
}

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snackbarShow: false,
      snackbarMsg: '',
      currentTab: 'signIn', // signIn, signUp
      signIn: {
        email: '',
        passPhrase: ''
      },
      signUp: {
        email: '',
        passPhrase: '',
        passPhraseRepeat: '',
        isDoctor: false
      },
      loadingData: false
    }

    this.updateStateValue = this.updateStateValue.bind(this)
    this.auth = this.auth.bind(this)

    this.generateKeyPair = this.generateKeyPair.bind(this)
    this.createFileCallback = this.createFileCallback.bind(this)
  }

  setAppPubKey(uid, userPubKey) {
    this.props.onUpdateUser(uid, { appPubKey: userPubKey })
  }

  createFileCallback(error) {
    if (error) {
      // Если не удалось создать файл с ключами,
      // удаляем свежесозданный аккаунт юзера
      const user = firebase.auth().currentUser
      user.delete().then((responce) => {
        console.log('DELETE USER', responce)
      }, (err) => {
        console.log('DELETE USER', err)
      })
    }
    this.setState(
      { loadingData: false },
      () => { this.props.router.push(`profile/${this.props.user.uid}`) }
    )
    console.log('File CREATED')
  }

  changeTab(currentTab) {
    this.setState({ currentTab })
  }

  passMatch() {
    const { passPhrase, passPhraseRepeat } = this.state.signUp
    if (passPhrase === passPhraseRepeat) return true
    return false
  }

  disabledButton() {
    const { currentTab } = this.state
    return hasEmptyValues(this.state[currentTab]) || !this.passMatch() || this.state.loadingData
  }

  showSnack(msg) {
    this.setState({ snackbarMsg: msg }, () => { this.setState({ snackbarShow: true }) })
  }

  auth() {
    const { currentTab } = this.state
    this.setState({ loadingData: true })
    if (currentTab === 'signUp') {
      this.props.onCreateNewUser(this.state[currentTab]).then((responce) => {
        if (responce.type === 'error') this.showSnack(responce.error.message)
        else {
          this.generateKeyPair(responce.uid)
        }
      })
    } else if (currentTab === 'signIn') {
      this.props.onAuthUser(this.state[currentTab]).then((responce) => {
        if (responce.type === 'error') this.showSnack(responce.error.message)
        else this.props.router.push(`profile/${responce.uid}`)
      })
    }
  }

  updateStateValue(name, value) {
    const { currentTab } = this.state
    const data = {
      ...this.state[currentTab],
      [name]: value
    }
    this.setState({ [currentTab]: data })
  }

  generateKeyPair(uid) {
    const keyPair = pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 })

    const publicKeyPem = pki.publicKeyToPem(keyPair.publicKey)
    const privateKeyPem = pki.privateKeyToPem(keyPair.privateKey)

    const rsaKeys = {
      publicKey: publicKeyPem,
      privateKey: privateKeyPem
    }

    // console.log('publicKeyPem', publicKeyPem)
    // console.log('privateKeyPem', privateKeyPem)
    //
    // const publicKey = pki.publicKeyFromPem(publicKeyPem)
    // const privateKey = pki.privateKeyFromPem(privateKeyPem)

    // createFile(uid, JSON.stringify(rsaKeys))
    this.setAppPubKey(uid, JSON.stringify(publicKeyPem))
    createFile(uid, JSON.stringify(rsaKeys), this.createFileCallback)
  }

  render() {
    const { currentTab, signIn, signUp } = this.state
    return (
      <div className={styles.authWrapper}>
        <Tabs
          value={currentTab}
          onChange={(val) => { this.changeTab(val) }}
          className={styles.tabsWrapper}
        >
          <Tab label="Sign In" value="signIn">
            <Paper className={styles.paper}>
              <SignIn
                data={signIn}
                updateValue={this.updateStateValue}
                signIn={this.auth}
                disabledButton={this.disabledButton()}
              />
            </Paper>
          </Tab>
          <Tab label="Sign Up" value="signUp">
            <Paper className={styles.paper}>
              <SignUp
                data={signUp}
                updateValue={this.updateStateValue}
                signUp={this.auth}
                disabledButton={this.disabledButton()}
              />
            </Paper>
          </Tab>
        </Tabs>
        <Snackbar
          open={this.state.snackbarShow}
          message={this.state.snackbarMsg}
          autoHideDuration={4000}
          onRequestClose={() => { this.setState({ snackbarShow: false }) }}
        />
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    ownProps
  }),
  dispatch => ({
    onCreateNewUser: data => (
      dispatch(createNewUser(data))
    ),
    onAuthUser: data => (
      dispatch(authUser(data))
    ),
    onUpdateUser: (uid, data) => {
      dispatch(updateUser(uid, data))
    }
  })
)(Auth)

Auth.defaultProps = {
  user: null
}

Auth.propTypes = {
  onUpdateUser: PropTypes.func.isRequired,
  onCreateNewUser: PropTypes.func.isRequired,
  onAuthUser: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string
  })
}
