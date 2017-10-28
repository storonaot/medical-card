import Paper from 'material-ui/Paper'
import { Tabs, Tab } from 'material-ui/Tabs'
import SignIn from './SignIn'
import SignUp from './SignUp'
import styles from './styles'

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
      }
    }

    this.updateStateValue = this.updateStateValue.bind(this)
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
              <SignIn data={signIn} updateValue={this.updateStateValue} />
            </Paper>
          </Tab>
          <Tab label="Sign Up" value="signUp">
            <Paper className={styles.paper}>
              <SignUp data={signUp} updateValue={this.updateStateValue} />
            </Paper>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Auth
