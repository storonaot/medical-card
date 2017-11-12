import { Empty, List, ListItem, PermReqControls } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'

const PermReqList = ({ list, showAll, successReq, declineReq  }) => {
  if (!list.length) return (<Empty type="permReq" />)
  return (
    <div>
      <List style={{ marginBottom: '20px' }}>
        {list.map((item) => {
          if (item.status !== 'success') {
            return (
              <ListItem
                deleteItem={() => {}}
                key={item._id}
                item={item}
                type="_from"
                controls={
                  <PermReqControls
                    onSuccess={() => { successReq(item._id) }}
                    onDecline={() => { declineReq(item._id) }}
                  />
                }
              />
            )
          }
          return null
        })}
      </List>
      <RaisedButton
        onClick={showAll}
        primary
        style={{ marginLeft: '20px' }}
        label="Посмотреть все"
      />
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

// // import { List, ListItem } from 'material-ui/List'
// import RaisedButton from 'material-ui/RaisedButton'
// import { Empty, List, ListItem } from '_shared'
// import styles from './styles'
//
//
// const PermReqList = ({ list, goToSendPermReq, showAll, deleteRequest }) => {
//   if (!list.length) return (<Empty btnClick={goToSendPermReq} type="permReq" />)
//   return (
//     <div>
//       <List style={{ marginBottom: '20px' }}>
//         {list.map((item) => {
//           if (item.status !== 'success') return (<ListItem deleteItem={deleteRequest} key={item._id} item={item} />)
//           return null
//         })}
//       </List>
//       <div className={styles.btnsWrapper}>
//         <RaisedButton onClick={goToSendPermReq} secondary label="Отправить запрос" />
//         <RaisedButton
//           onClick={showAll}
//           primary
//           style={{ marginLeft: '20px' }}
//           label="Посмотреть все"
//         />
//       </div>
//     </div>
//
//   )
// }
//
// export default PermReqList
//
// PermReqList.propTypes = {
//   list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
//   goToSendPermReq: PropTypes.func.isRequired,
//   showAll: PropTypes.func.isRequired,
//   deleteRequest: PropTypes.func.isRequired
// }
