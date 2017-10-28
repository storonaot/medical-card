import { connect } from 'react-redux'
import { setUser } from 'store/actions'
import Paper from 'material-ui/Paper'
import { Tabs, Tab } from 'material-ui/Tabs'
import firebase from 'fBase'
import SignIn from './SignIn'
import SignUp from './SignUp'
import styles from './styles'

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 'signIn', // signIn, signUp
      signIn: {
        // login: '',
        email: '',
        passPhrase: ''
      },
      signUp: {
        // login: '',
        email: '',
        passPhrase: '',
        passPhraseRepeat: ''
        // isDoctor: false
      }
    }

    this.updateStateValue = this.updateStateValue.bind(this)
    this.auth = this.auth.bind(this)
  }

  changeTab(currentTab) {
    this.setState({ currentTab })
  }

  auth() {
    const { currentTab } = this.state
    const { passPhrase, email } = this.state[currentTab]
    firebase.auth().createUserWithEmailAndPassword(email, passPhrase)
      .then((responce) => {
        console.log('responce', responce)
        if (currentTab === 'signUp') this.createKeys(passPhrase)
        // this.props.router.push('/Home')
        // this.props.onSetUser({ email: 'user' })
      }, (error) => {
        console.error('error', error.message)
      })
  }

  createKeys(passPhrase) {
    console.log(this)
    console.log(passPhrase)
  }

  updateStateValue(name, value) {
    const { currentTab } = this.state
    const data = {
      ...this.state[currentTab],
      [name]: value
    }
    this.setState({ [currentTab]: data })
  }

  render() {
    console.log(this.props)
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
              />
            </Paper>
          </Tab>
          <Tab label="Sign Up" value="signUp">
            <Paper className={styles.paper}>
              <SignUp
                data={signUp}
                updateValue={this.updateStateValue}
                signUp={this.auth}
              />
            </Paper>
          </Tab>
        </Tabs>
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
    onSetUser: (data) => {
      dispatch(setUser(data))
    }
  })
)(Auth)
