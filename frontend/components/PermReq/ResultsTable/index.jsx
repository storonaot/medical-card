import { Paper, Title, Avatar } from '_shared'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

const ResultsTable = ({ result }) => {
  if (result === 'isEmpty') {
    return (
      <Paper>
        <Title text="Search result" />
        <p>Поиск не дал результатов</p>
      </Paper>
    )
  } else if (!result) return null

  const { personalInfo } = result
  const fullName = `${personalInfo.lastName} ${personalInfo.firstName}`
  return (
    <Paper>
      <Title text="Search result" />
      <List>
        <ListItem
          leftAvatar={<Avatar size="small" photo={result.photo} />}
          rightIcon={
            <RaisedButton
              style={{ width: 'auto' }}
              secondary
              label="Send request"
            />
          }
          primaryText={fullName}
          secondaryText={result.login}
        />
      </List>
    </Paper>
  )
}

export default ResultsTable

ResultsTable.defaultProps = {
  result: null
}

ResultsTable.propTypes = {
  result: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})
  ])
}

// import { Paper } from '_shared'
// import RaisedButton from 'material-ui/RaisedButton'
// import styles from './styles'
//
// const ResultsTable = ({ data, sendPermissionRequest, disabledButton }) => (
//   <Paper>
// <table className={styles.table}>
//   <tbody>
//     <tr>
//       <td>Name:</td>
//       <td>{data.firstName} {data.lastName}</td>
//     </tr>
//     <tr>
//       <td>Email:</td>
//       <td>{data.email}</td>
//     </tr>
//     <tr>
//       <td>DOB:</td>
//       <td>{data.dob}</td>
//     </tr>
//     <tr>
//       <td>City:</td>
//       <td>{data.city}</td>
//     </tr>
//   </tbody>
// </table>
//     <RaisedButton
//       secondary
//       label={disabledButton ? 'Permission Request sended yet' : 'Send Permission Request'}
//       onClick={sendPermissionRequest}
//       disabled={disabledButton}
//     />
//   </Paper>
// )
//
// export default ResultsTable
//
// ResultsTable.defaultProps = {
//   disabledButton: false
// }
//
// ResultsTable.propTypes = {
//   data: PropTypes.shape({}).isRequired,
//   sendPermissionRequest: PropTypes.func.isRequired,
//   disabledButton: PropTypes.bool
// }
//
// // storonaot@gmail.com
