import { Tabs, Tab } from 'material-ui/Tabs'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { signUp, signIn } from 'store2/actions'
import { Paper } from '_shared'
import { randomPhoto } from 'libs'
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
    const data = { login, email, passPhrase, isDoctor, photo: randomPhoto() }
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
