import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'

const Navbar = ({ sidebarOpened, items, clickAway }) => (
  <Drawer
    open={sidebarOpened}
    onRequestChange={clickAway}
    docked={false}
  >
    {items.map(item => (
      <MenuItem key={item.id} primaryText={item.title} />
    ))}
  </Drawer>
)

export default Navbar

Navbar.defaultProps = {
  items: [
    { id: 1, title: 'My Medical Card', path: '' },
    { id: 2, title: 'My Doctors', path: '' },
    { id: 3, title: 'Permission requests', path: '' }
  ]
}

Navbar.propTypes = {
  sidebarOpened: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  clickAway: PropTypes.func.isRequired
}
