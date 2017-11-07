import { Header, Navbar, GoToDashboardBtn } from '_shared'
import { connect } from 'react-redux'
import { toggleSidebar, getUser, signOut } from 'store2/actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// const electron = window.require('electron')
// const fs = electron.remote.require('fs')

import muiTheme from './muiTheme'
import styles from './styles'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.signOut = this.signOut.bind(this)
    this.goTo = this.goTo.bind(this)
  }

  componentDidMount() {
    if (!this.props.user.data) {
      this.props.onGetUser().then((response) => {
        const unautorize = response.status === 401
        const { pathname } = this.props.location
        const isAuthPath = pathname === '/auth'
        const isHomePath = pathname === '/'
        if (unautorize && !isAuthPath && !isHomePath) this.props.router.push('/auth')
      })
    }
  }

  goTo(path) {
    const { router, location } = this.props
    if (location.pathname !== `/${path}`) router.push(path)
  }

  signOut() {
    this.props.onSignOut().then(() => { this.goTo('/') })
  }

  render() {
    const {
      children, sidebarOpened, user,
      onToggleSidebar, location, router
    } = this.props

    const email = user.data ? user.data.email : null

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles.app}>
          <Header
            toggleSidebar={onToggleSidebar}
            sidebarOpened={sidebarOpened}
            logged={!!user.data}
            email={email}
            signOut={this.signOut}
            goTo={this.goTo}
          />
          <Navbar
            sidebarOpened={sidebarOpened}
            clickAway={onToggleSidebar}
          />
          <div className={styles.content}>
            <GoToDashboardBtn
              path={location.pathname}
              push={router.push}
            />
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
    onToggleSidebar: () => { dispatch(toggleSidebar()) },
    onGetUser: () => (dispatch(getUser())),
    onSignOut: () => (dispatch(signOut()))
  })
)(App)

App.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape({})
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  sidebarOpened: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  onGetUser: PropTypes.func.isRequired
}
