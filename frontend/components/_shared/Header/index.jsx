import AppBar from 'material-ui/AppBar'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { white } from 'material-ui/styles/colors'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

const Logged = ({ name, signOut }) => {
  console.log('Logged', name)
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ color: '#fff' }}>{name}</div>
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon color={white} /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Sign out" onClick={signOut} />
      </IconMenu>
    </div>
  )
}

Logged.defaultProps = {
  name: null
}

Logged.propTypes = {
  name: PropTypes.string,
  signOut: PropTypes.func.isRequired
}

const Header = ({ toggleSidebar, sidebarOpened, logged, userName, signOut }) => {
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

  const NavbarIcon = () => {
    if (logged) return (sidebarOpened ? <Close /> : <Burger />)
    return null
  }

  return (
    <AppBar
      title="MedicalCard"
      showMenuIconButton={logged}
      iconElementLeft={NavbarIcon()}
      iconElementRight={logged ? <Logged signOut={signOut} name={userName} /> : null}
    />
  )
}

export default Header

Header.defaultProps = {
  logged: false,
  userName: null
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool.isRequired,
  logged: PropTypes.bool,
  userName: PropTypes.string,
  signOut: PropTypes.func.isRequired
}
