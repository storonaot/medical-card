import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import classNames from 'classnames'
import styles from './styles'

const Navbar = ({ sidebarOpened, items }) => {
  const classList = classNames({
    [styles.navbar]: true,
    [styles.isActive]: sidebarOpened
  })
  return (
    <Paper className={classList}>
      <Menu>
        {items.map(item => (
          <MenuItem key={item.id} primaryText={item.title} />
        ))}
      </Menu>
    </Paper>
  )
}

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
  items: PropTypes.arrayOf(PropTypes.shape({}))
}
