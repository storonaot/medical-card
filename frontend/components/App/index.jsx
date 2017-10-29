import { Header } from '_shared'
import { connect } from 'react-redux'
import { toggleSidebar, registerUserInApp } from 'store/actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { getDataFromLS } from 'helpers'
import firebase from 'libs/firebase'
import muiTheme from './muiTheme'
import styles from './styles'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (getDataFromLS()) {
      const uid = getDataFromLS().uid
      firebase.database().ref(`/users/${uid}`).once('value').then((snapshot) => {
        this.props.onRegisterUserInApp(snapshot.val())
      })
    } else if (!getDataFromLS && this.props.location.path !== '/') {
      this.props.router.push('/')
    }
  }

  render() {
    const { children, sidebarOpened, user } = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles.app}>
          <Header
            toggleSidebar={this.props.onToggleSidebar}
            sidebarOpened={sidebarOpened}
            logged={!!user}
          />
          <div className={styles.content}>{children}</div>
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
  user: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  location: PropTypes.shape({
    path: PropTypes.string
  }).isRequired
}
