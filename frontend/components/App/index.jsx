import { Header, Navbar } from '_shared'
import { connect } from 'react-redux'
import { toggleSidebar, getUser } from 'store2/actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// const electron = window.require('electron')
// const fs = electron.remote.require('fs')

import muiTheme from './muiTheme'
import styles from './styles'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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

  render() {
    const { children, sidebarOpened } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles.app}>
          <Header
            toggleSidebar={this.props.onToggleSidebar}
            sidebarOpened={sidebarOpened}
            logged={false}
            userName={null}
            signOut={() => {}}
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
    onToggleSidebar: () => { dispatch(toggleSidebar()) },
    onGetUser: () => (dispatch(getUser()))
  })
)(App)

// App.defaultProps = {
//   user: null
// }

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
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  onGetUser: PropTypes.func.isRequired
}
