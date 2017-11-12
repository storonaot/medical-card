import Divider from 'material-ui/Divider'
import { Avatar, StatusTag } from '_shared'
import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear'
import styles from './styles'

const List = ({ children, style }) => (<ul style={style}>{children}</ul>)

List.defaultProps = {
  style: null
}

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  style: PropTypes.shape({})
}

const fullName = item => `${item.lastName} ${item.firstName}`

const ListItem = ({ item, controls, deleteItem }) => {
  const controlsEl = controls || (
    <div className={styles.controls}>
      <StatusTag status={item.status} />
      <IconButton
        onClick={() => { deleteItem(item._id) }}
        tooltip="Удалить заявку"
        tooltipPosition="top-center"
      >
        <ContentClear color="rgb(208, 63, 22)" />
      </IconButton>
    </div>
  )
  return (
    <div key={item._id}>
      <li className={styles.listItem}>
        <div className={styles.leftSide}>
          <Avatar size="small" photo={item._to.photo} />
          <div className={styles.name}>
            <span>{fullName(item._to.personalInfo)}</span>
            <span className={styles.subText}>{item._to.login}</span>
          </div>
        </div>
        {controlsEl}
      </li>
      <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
    </div>
  )
}

export { List, ListItem }

ListItem.defaultProps = {
  controls: null,
  deleteItem: () => {}
}

ListItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  controls: PropTypes.element,
  deleteItem: PropTypes.func
}
