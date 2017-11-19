import { Tabs, Tab } from 'material-ui/Tabs'
import { connect } from 'react-redux'
import { signUp, signIn, showSnackBar } from 'store2/actions'
import { Paper } from '_shared'
import { randomPhoto } from 'libs'
import { createEthAccount } from 'helpers'
import styles from './styles'
import SignIn from './SignIn'
import SignUp from './SignUp'

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.createEthAccount = this.createEthAccount.bind(this)
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

  createEthAccount() {
    createEthAccount(this.state.signUp.passPhrase, this.signUp)
  }

  signUp(err, ethAddress) {
    if (err) {
      console.log(err)
    } else {
      const { login, email, passPhrase, isDoctor } = this.state.signUp
      const data = { login, email, passPhrase, isDoctor, photo: randomPhoto(), ethAddress }
      this.props.onSignUp(data).then((response) => {
        if (response.status === 200) this.props.router.push('/dashboard')
      })
    }
  }

  signIn() {
    const { login, passPhrase } = this.state.signIn
    const { onShowSnackBar, router, onSignIn } = this.props
    const data = { login, passPhrase }
    onSignIn(data).then((response) => {
      if (response.status === 200) {
        onShowSnackBar('Logged In')
        router.push('/dashboard')
      }
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
                signUp={this.createEthAccount}
                disabledButton={false}
              />
            </Paper>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    onSignUp: data => (dispatch(signUp(data))),
    onSignIn: data => (dispatch(signIn(data))),
    onShowSnackBar: (msg) => { dispatch(showSnackBar(msg)) }
  })
)(Auth)

Auth.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onShowSnackBar: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}
