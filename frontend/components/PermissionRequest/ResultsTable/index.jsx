import { Paper } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles'

const ResultsTable = ({ data, sendPermissionRequest, disabledButton }) => (
  <Paper>
    <table className={styles.table}>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>{data.firstName} {data.lastName}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{data.email}</td>
        </tr>
        <tr>
          <td>DOB:</td>
          <td>{data.dob}</td>
        </tr>
        <tr>
          <td>City:</td>
          <td>{data.city}</td>
        </tr>
      </tbody>
    </table>
    <RaisedButton
      secondary
      label={disabledButton ? 'Permission Request sended yet' : 'Send Permission Request'}
      onClick={sendPermissionRequest}
      disabled={disabledButton}
    />
  </Paper>
)

export default ResultsTable

ResultsTable.defaultProps = {
  disabledButton: false
}

ResultsTable.propTypes = {
  data: PropTypes.shape({}).isRequired,
  sendPermissionRequest: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool
}

// storonaot@gmail.com
