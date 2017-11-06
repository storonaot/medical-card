import { Paper } from '_shared'
import styles from '../styles'

const PatientProfile = ({ user }) => {
  if (user.personalInfo) {
    return (
      <div className={styles.gridWrapper}>
        <Paper className={styles.a}>My medical card</Paper>
        <Paper className={styles.b}>My Doctors</Paper>
        <Paper className={styles.c}>Permissoin Requests</Paper>
      </div>
    )
  }
  return (<div>You must fill you Profile Info</div>)
}

export default PatientProfile

PatientProfile.propTypes = {
  user: PropTypes.shape({}).isRequired
}
