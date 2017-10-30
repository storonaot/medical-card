import { connect } from 'react-redux'
import { createNewUser, authUser } from 'store/actions'
import Paper from 'material-ui/Paper'
import { Tabs, Tab } from 'material-ui/Tabs'
import Snackbar from 'material-ui/Snackbar'
import { hasEmptyValues } from 'helpers'
// import cryptico from 'cryptico-js'
import SignIn from './SignIn'
import SignUp from './SignUp'
import styles from './styles'

// const PassPhrase = 'The Moon is a Harsh Mistress.'
// const Bits = 1024
// const MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits)
// console.log('MattsRSAkey', MattsRSAkey)
// const MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey)
//
// const PlainText = 'Matt, I need you to help me with my Starcraft strategy.'
// const EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString)
// console.log('EncryptionResult', EncryptionResult)
//
// const cipherText = EncryptionResult.cipher
//
// const DecryptionResult = cryptico.decrypt(cipherText, MattsRSAkey)
//
// console.log('DecryptionResult', DecryptionResult)

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pair: null,
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
      }
    }

    this.updateStateValue = this.updateStateValue.bind(this)
    this.auth = this.auth.bind(this)

    this.generateKeyPair = this.generateKeyPair.bind(this)
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
    return hasEmptyValues(this.state[currentTab]) || !this.passMatch()
  }

  showSnack(msg) {
    this.setState({ snackbarMsg: msg }, () => { this.setState({ snackbarShow: true }) })
  }

  auth() {
    const { currentTab } = this.state
    if (currentTab === 'signUp') {
      this.props.onCreateNewUser(this.state[currentTab]).then((responce) => {
        if (responce.type === 'error') this.showSnack(responce.error.message)
        else this.props.router.push(`profile/${responce.uid}`)
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

  generateKeyPair() {
    this.setState({ pair: null })
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
            <button onClick={this.generateKeyPair}>Generate Key Pair</button>
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
    )
  })
)(Auth)

Auth.propTypes = {
  onCreateNewUser: PropTypes.func.isRequired,
  onAuthUser: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}
