import AppBar from 'material-ui/AppBar'

const logged = false

const Header = () => (
  <AppBar
    title="MedicalCard"
    showMenuIconButton={false}
    iconElementRight={logged ? <div>Logged</div> : null}
  />
)

export default Header
