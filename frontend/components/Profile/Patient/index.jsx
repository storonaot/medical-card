import Paper from 'material-ui/Paper'
import styles from '../styles'

const PatientProfile = () => (
  <div className={styles.gridWrapper}>
    <Paper className={styles.a} zDepth={1}>My medical card</Paper>
    <Paper className={styles.b} zDepth={1}>My Doctors</Paper>
    <Paper className={styles.c} zDepth={1}>Permissoin Requests</Paper>
  </div>
)

export default PatientProfile
