// import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { Empty, List, ListItem } from '_shared'
import styles from './styles'


const PermReqList = ({ list, goToSendPermReq, showAll, deleteRequest }) => {
  // const resultList = list.filter(item => (item.status !== 'success'))
  const resultList = list.filter(item => item.status)
  if (!resultList.length) return (<Empty btnClick={goToSendPermReq} type="permReq" />)
  return (
    <div>
      <List style={{ marginBottom: '20px' }}>
        {resultList.map(item => (
          <ListItem deleteItem={deleteRequest} key={item._id} item={item} />
        ))}
      </List>
      <div className={styles.btnsWrapper}>
        <RaisedButton onClick={goToSendPermReq} secondary label="Отправить запрос" />
        <RaisedButton
          onClick={showAll}
          primary
          style={{ marginLeft: '20px' }}
          label="Все запросы"
        />
      </div>
    </div>

  )
}

export default PermReqList

PermReqList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  goToSendPermReq: PropTypes.func.isRequired,
  showAll: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired
}
