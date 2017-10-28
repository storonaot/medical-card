import { Header } from '_shared'
import { connect } from 'react-redux'
import { toggleSidebar } from 'store/actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './muiTheme'
import styles from './styles'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { children, sidebarOpened, logged } = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles.app}>
          <Header
            toggleSidebar={this.props.onToggleSidebar}
            sidebarOpened={sidebarOpened}
            logged={logged}
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
    logged: state.ui.logged
  }),
  dispatch => ({
    onToggleSidebar: () => {
      dispatch(toggleSidebar())
    }
  })
)(App)

App.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool.isRequired,
  logged: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
}
