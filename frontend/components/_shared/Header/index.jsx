import AppBar from 'material-ui/AppBar'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { white } from 'material-ui/styles/colors'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

const Logged = ({ email, signOut, logged, goTo }) => {
  const iconMenu = logged
    ? (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon color={white} /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Dashboard" onClick={() => { goTo('dashboard') }} />
        <MenuItem primaryText="Profile" onClick={() => { goTo('profile') }} />
        <MenuItem primaryText="Sign out" onClick={signOut} />
      </IconMenu>
    ) : (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon color={white} /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Sign in" onClick={() => { goTo('auth') }} />
      </IconMenu>
    )

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ color: '#fff' }}>{email}</div>
      {iconMenu}
    </div>
  )
}

Logged.defaultProps = {
  email: null
}

Logged.propTypes = {
  email: PropTypes.string,
  signOut: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  goTo: PropTypes.func.isRequired
}

const Header = ({
  toggleSidebar, sidebarOpened, logged, email,
  signOut, goTo
}) => {
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
      onTitleTouchTap={() => { goTo('/') }}
      iconElementRight={
        <Logged
          signOut={signOut}
          email={email}
          logged={logged}
          signIn={goTo}
          goTo={goTo}
        />
      }
    />
  )
}

export default Header

Header.defaultProps = {
  logged: false,
  email: null
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool.isRequired,
  logged: PropTypes.bool,
  email: PropTypes.string,
  signOut: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired
}
