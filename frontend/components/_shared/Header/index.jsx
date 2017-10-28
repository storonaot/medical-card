import AppBar from 'material-ui/AppBar'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { white } from 'material-ui/styles/colors'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

const Logged = () => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon color={white} /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
)

const Header = ({ toggleSidebar, sidebarOpened, logged }) => {
  const Close = () => (
    <IconButton onClick={toggleSidebar}>
      <NavigationClose color={white} />
    </IconButton>
  )
  const Burger = () => (
    <IconButton onClick={toggleSidebar}>
      <NavigationMenu color={white} />
    </IconButton>
  )

  const Icon = () => {
    if (logged) return (sidebarOpened ? <Close /> : <Burger />)
    return null
  }

  return (
    <AppBar
      title="MedicalCard"
      showMenuIconButton={logged}
      iconElementLeft={Icon()}
      iconElementRight={logged ? <Logged /> : null}
    />
  )
}

export default Header

Header.defaultProps = {
  logged: false
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool.isRequired,
  logged: PropTypes.bool
}
