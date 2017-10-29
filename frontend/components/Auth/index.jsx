import { connect } from 'react-redux'
import { createNewUser, authUser } from 'store/actions'
import Paper from 'material-ui/Paper'
import { Tabs, Tab } from 'material-ui/Tabs'
// import { hasEmptyValues } from 'helpers'
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
        passPhraseRepeat: '',
        isDoctor: false
      }
    }

    this.updateStateValue = this.updateStateValue.bind(this)
    this.auth = this.auth.bind(this)
  }

  changeTab(currentTab) {
    this.setState({ currentTab })
  }

  disabledButton() {
    console.log(this)
    // const { currentTab } = this.state
    // return hasEmptyValues(this.state[currentTab])
    return false
  }

  auth() {
    const { currentTab } = this.state
    if (currentTab === 'signUp') {
      this.props.onCreateNewUser(this.state[currentTab]).then((responce) => {
        // console.log('onCreateNewUser', responce)
        if (responce.type === 'error') console.error(responce.message)
        else this.props.router.push('test')
      })
    } else if (currentTab === 'signIn') {
      this.props.onAuthUser(this.state[currentTab]).then((responce) => {
        // console.log('onAuthUser', responce)
        if (responce.type === 'error') console.error(responce.message)
        else this.props.router.push('test')
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
