import { Tabs, Tab } from 'material-ui/Tabs'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { signUp, signIn } from 'store2/actions'
import { Paper } from '_shared'
import styles from './styles'
import SignIn from './SignIn'
import SignUp from './SignUp'

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snackbarShow: false,
      snackbarMsg: '',
      currentTab: 'signIn', // signIn, signUp
      signIn: {
        login: '',
        passPhrase: ''
      },
      signUp: {
        login: '',
        email: '',
        passPhrase: '',
        passPhraseRepeat: '',
        isDoctor: false
      },
      sendingData: false
    }

    this.changeTab = this.changeTab.bind(this)
    this.updateStateValue = this.updateStateValue.bind(this)
    this.signUp = this.signUp.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  changeTab(currentTab) {
    this.setState({ currentTab })
  }

  updateStateValue(name, value) {
    const { currentTab } = this.state
    const data = {
      ...this.state[currentTab],
      [name]: value
    }
    this.setState({ [currentTab]: data })
  }

  signUp() {
    const { login, email, passPhrase, isDoctor } = this.state.signUp
    const data = { login, email, passPhrase, isDoctor }
    this.props.onSignUp(data).then((response) => {
      if (response.status === 200) this.props.router.push('/dashboard')
    })
  }

  signIn() {
    const { login, passPhrase } = this.state.signIn
    const data = { login, passPhrase }
    this.props.onSignIn(data).then((response) => {
      if (response.status === 200) this.props.router.push('/dashboard')
    })
  }

  render() {
    const { currentTab } = this.state
    const signInData = this.state.signIn
    const signUpData = this.state.signUp
    return (
      <div className={styles.authWrapper}>
        <Tabs
          value={currentTab}
          onChange={(val) => { this.changeTab(val) }}
          className={styles.tabsWrapper}
        >
          <Tab label="Sign In" value="signIn">
            <Paper>
              <SignIn
                data={signInData}
                updateValue={this.updateStateValue}
                signIn={this.signIn}
                disabledButton={false}
              />
            </Paper>
          </Tab>
          <Tab label="Sign Up" value="signUp">
            <Paper>
              <SignUp
                data={signUpData}
                updateValue={this.updateStateValue}
                signUp={this.signUp}
                disabledButton={false}
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
  () => ({}),
  dispatch => ({
    onSignUp: data => (dispatch(signUp(data))),
    onSignIn: data => (dispatch(signIn(data)))
  })
)(Auth)

Auth.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}

// import { connect } from 'react-redux'
// import { createNewUser, authUser, updateUser } from 'store/actions'
// import firebase from 'libs/firebase'
// import Paper from 'material-ui/Paper'
// import { Tabs, Tab } from 'material-ui/Tabs'
// import Snackbar from 'material-ui/Snackbar'
// import { hasEmptyValues } from 'helpers'
// import path from 'path'
// import Web3 from 'web3'
// import { pki } from 'node-forge'
// import SignIn from './SignIn'
// import SignUp from './SignUp'
// import styles from './styles'
//
// let web3
//
// if (typeof web3 !== 'undefined') {
//   web3 = new Web3(web3.currentProvider)
// } else {
//   // set the provider you want from Web3.providers
//   web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
// }
//
// const electron = window.require('electron')
// const fs = electron.remote.require('fs')
//
// const createFile = (uid, fileContent, cb) => {
//   const userDataPath = (electron.app || electron.remote.app).getPath('userData')
//   const filepath = path.join(userDataPath, `keys_${uid}.txt`)
//
//   fs.writeFile(filepath, fileContent, cb)
// }
//
// class Auth extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       snackbarShow: false,
//       snackbarMsg: '',
//       currentTab: 'signIn', // signIn, signUp
//       signIn: {
//         email: '',
//         passPhrase: ''
//       },
//       signUp: {
//         email: '',
//         passPhrase: '',
//         passPhraseRepeat: '',
//         isDoctor: false
//       },
//       loadingData: false
//     }
//
//     this.updateStateValue = this.updateStateValue.bind(this)
//     this.auth = this.auth.bind(this)
//
//     this.generateKeyPair = this.generateKeyPair.bind(this)
//     this.createFileCallback = this.createFileCallback.bind(this)
//   }
//
//   setAppPubKey(uid, userPubKey) {
//     this.props.onUpdateUser(uid, { appPubKey: userPubKey })
//   }
//
//   setEthPubKey(uid, ethPubKey) {
//     this.props.onUpdateUser(uid, { ethPubKey })
//   }
//
//   createFileCallback(error) {
//     if (error) {
//       // Если не удалось создать файл с ключами,
//       // удаляем свежесозданный аккаунт юзера
//       const user = firebase.auth().currentUser
//       user.delete().then((responce) => {
//         console.log('DELETE USER', responce)
//       }, (err) => {
//         console.log('DELETE USER', err)
//       })
//     }
//     this.setState(
//       { loadingData: false },
//       () => { this.props.router.push('dashboard') }
//     )
//     console.log('File CREATED')
//   }
//
//   changeTab(currentTab) {
//     this.setState({ currentTab })
//   }
//
//   passMatch() {
//     const { passPhrase, passPhraseRepeat } = this.state.signUp
//     if (passPhrase === passPhraseRepeat) return true
//     return false
//   }
//
//   disabledButton() {
//     const { currentTab } = this.state
//     return hasEmptyValues(this.state[currentTab]) || !this.passMatch() || this.state.loadingData
//   }
//
//   showSnack(msg) {
//     this.setState({ snackbarMsg: msg }, () => { this.setState({ snackbarShow: true }) })
//   }
//
//   auth() {
//     const { currentTab } = this.state
//     this.setState({ loadingData: true })
//     if (currentTab === 'signUp') {
//       this.props.onCreateNewUser(this.state[currentTab]).then((responce) => {
//         if (responce.type === 'error') this.showSnack(responce.error.message)
//         else this.generateKeyPair(responce.uid)
//       })
//     } else if (currentTab === 'signIn') {
//       this.props.onAuthUser(this.state[currentTab]).then((responce) => {
//         if (responce.type === 'error') this.showSnack(responce.error.message)
//         else this.props.router.push('dashboard')
//       })
//     }
//   }
//
//   unlockEthAccount(address) {
//     const { currentTab } = this.state
//     const { passPhrase } = currentTab
//     web3.eth.personal.unlockAccount(address, passPhrase)
//   }
//
//   updateStateValue(name, value) {
//     const { currentTab } = this.state
//     const data = {
//       ...this.state[currentTab],
//       [name]: value
//     }
//     this.setState({ [currentTab]: data })
//   }
//
//   generateKeyPair(uid) {
//     const keyPair = pki.rsa.generateKeyPair({ bits: 256, e: 0x10001 })
//
//     const hexPub = pki.getPublicKeyFingerprint(keyPair.publicKey, { encoding: 'hex' })
//
//     const publicKeyPem = pki.publicKeyToPem(keyPair.publicKey)
//     const privateKeyPem = pki.privateKeyToPem(keyPair.privateKey)
//
//     const rsaKeys = {
//       publicKey: publicKeyPem,
//       privateKey: privateKeyPem
//     }
//
//     this.setAppPubKey(uid, hexPub)
//     createFile(uid, JSON.stringify(rsaKeys), this.createFileCallback)
//     this.createEthAccount(uid)
//   }
//
//   createEthAccount(uid) {
//     web3.eth.personal.newAccount(
//       this.state[this.state.currentTab].passPhrase,
//       (err, res) => {
//         if (err) throw err
//         this.setEthPubKey(uid, res)
//       }
//     )
//   }
//
//   render() {
//     const { currentTab, signIn, signUp } = this.state
//     return (
//       <div className={styles.authWrapper}>
//         <Tabs
//           value={currentTab}
//           onChange={(val) => { this.changeTab(val) }}
//           className={styles.tabsWrapper}
//         >
//           <Tab label="Sign In" value="signIn">
//             <Paper className={styles.paper}>
//               <SignIn
//                 data={signIn}
//                 updateValue={this.updateStateValue}
//                 signIn={this.auth}
//                 disabledButton={this.disabledButton()}
//               />
//             </Paper>
//           </Tab>
//           <Tab label="Sign Up" value="signUp">
//             <Paper className={styles.paper}>
//               <SignUp
//                 data={signUp}
//                 updateValue={this.updateStateValue}
//                 signUp={this.auth}
//                 disabledButton={this.disabledButton()}
//               />
//             </Paper>
//           </Tab>
//         </Tabs>
//         <Snackbar
//           open={this.state.snackbarShow}
//           message={this.state.snackbarMsg}
//           autoHideDuration={4000}
//           onRequestClose={() => { this.setState({ snackbarShow: false }) }}
//         />
//       </div>
//     )
//   }
// }
//
// export default connect(
//   (state, ownProps) => ({
//     user: state.user,
//     ownProps
//   }),
//   dispatch => ({
//     onCreateNewUser: data => (
//       dispatch(createNewUser(data))
//     ),
//     onAuthUser: data => (
//       dispatch(authUser(data))
//     ),
//     onUpdateUser: (uid, data) => {
//       dispatch(updateUser(uid, data))
//     }
//   })
// )(Auth)
//
// Auth.defaultProps = {
//   user: null
// }
//
// Auth.propTypes = {
//   onUpdateUser: PropTypes.func.isRequired,
//   onCreateNewUser: PropTypes.func.isRequired,
//   onAuthUser: PropTypes.func.isRequired,
//   router: PropTypes.shape({
//     push: PropTypes.func
//   }).isRequired,
//   user: PropTypes.shape({
//     uid: PropTypes.string,
//     ethPubKey: PropTypes.string
//   })
// }
