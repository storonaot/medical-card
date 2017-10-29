import { Header, Navbar } from '_shared'
import { connect } from 'react-redux'
import { toggleSidebar, registerUserInApp, destroyUser } from 'store/actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { getDataFromLS } from 'helpers'
import firebase from 'libs/firebase'
import muiTheme from './muiTheme'
import styles from './styles'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    // this.signOut = this.signOut.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && getDataFromLS()) {
        const uid = getDataFromLS().uid
        firebase.database().ref(`/users/${uid}`).once('value').then((snapshot) => {
          this.props.onRegisterUserInApp(snapshot.val())
        })
      } else if (!(user && getDataFromLS()) && this.props.location.path !== '/') {
        this.props.router.replace('/')
      }
    })
  }

  render() {
    const { children, sidebarOpened, user } = this.props
    const getUserName = () => {
      if (user) return user.firstName || user.email
      return null
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles.app}>
          <Header
            toggleSidebar={this.props.onToggleSidebar}
            sidebarOpened={sidebarOpened}
            logged={!!user}
            userName={getUserName()}
            signOut={this.props.onDestroyUser}
          />
          <div className={styles.content}>
            <Navbar sidebarOpened={sidebarOpened} />
            {children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(
  state => ({
    sidebarOpened: state.ui.sidebarOpened,
    user: state.user
  }),
  dispatch => ({
    onToggleSidebar: () => {
      dispatch(toggleSidebar())
    },
    onRegisterUserInApp: (data) => {
      dispatch(registerUserInApp(data))
    },
    onDestroyUser: () => {
      dispatch(destroyUser())
    }
  })
)(App)

App.defaultProps = {
  user: null
}

App.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool.isRequired,
  onRegisterUserInApp: PropTypes.func.isRequired,
  onDestroyUser: PropTypes.func.isRequired,
  location: PropTypes.shape({
    path: PropTypes.string
  }).isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func
  }).isRequired,
  user: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
}
