import { Empty, List, ListItem, PermReqControls } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'

const PermReqList = ({ list, showAll, successReq, declineReq }) => {
  const filteredList = list.filter(item => item.status === 'send')
  const resultList = filteredList.slice(0, 3)
  // const resultList = list.filter(item => item.status)
  if (!resultList.length) return (<Empty type="permReq" />)
  return (
    <div>
      <List style={{ marginBottom: '20px' }}>
        {resultList.map(item => (
          <ListItem
            deleteItem={() => {}}
            key={item._id}
            item={item}
            type="_from"
            controls={
              <PermReqControls
                onSuccess={() => { successReq(item._id, item._from) }}
                onDecline={() => { declineReq(item._id) }}
              />
            }
          />

        ))}
      </List>
      {filteredList.length > 3 && (
        <RaisedButton
          onClick={showAll}
          primary
          style={{ marginLeft: '20px' }}
          label="Все запросы"
        />
      )}
    </div>
  )
}

export default PermReqList

PermReqList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showAll: PropTypes.func.isRequired,
  successReq: PropTypes.func.isRequired,
  declineReq: PropTypes.func.isRequired
}
