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
const subText = (item, type) => (
  type === '_to' || type === '_patient'
    ? item[type].login
    : item[type].personalInfo.specialisation
)

const ListItem = ({ item, controls, deleteItem, type }) => {
  const controlsEl = controls || (
    <div className={styles.controls}>
      <StatusTag status={item.status} />
      <IconButton
        onClick={() => { deleteItem(item._id) }}
        tooltip={item.status === 'success' ? null : 'Удалить запрос'}
        tooltipPosition="top-center"
        disabled={item.status === 'success'}
      >
        <ContentClear color="#d03f16" />
      </IconButton>
    </div>
  )
  return (
    <div key={item._id}>
      <li className={styles.listItem}>
        <div className={styles.leftSide}>
          <Avatar size="small" photo={item[type].photo} />
          <div className={styles.name}>
            <span>{fullName(item[type].personalInfo)}</span>
            <span className={styles.subText}>{subText(item, type)}</span>
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
  deleteItem: () => {},
  type: '_to'
}

ListItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  controls: PropTypes.element,
  deleteItem: PropTypes.func,
  type: PropTypes.oneOf(['_to', '_from', '_patient', '_doctor'])
}
