import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import styles from '../styles'

const DoctorProfile = () => (
  <div className={styles.wprapper}>
    <RaisedButton
      secondary
      label="Send permission request"
      style={{ marginBottom: '20px' }}
    />
    <div className={styles.gridWrapper}>
      <Paper className={styles.a} zDepth={1}>My profile</Paper>
      <Paper className={styles.b} zDepth={1}>My Patients</Paper>
      <Paper className={styles.c} zDepth={1}>Permissoin Requests</Paper>
    </div>
  </div>
)

export default DoctorProfile
