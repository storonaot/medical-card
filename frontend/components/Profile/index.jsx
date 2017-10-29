import { connect } from 'react-redux'
import DoctorProfile from './Doctor'
import PatientProfile from './Patient'

const Profile = ({ user }) => {
  if (user) {
    if (user.isDoctor) return (<DoctorProfile />)
    return <PatientProfile />
  }
  return (<div>Loading...</div>)
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    ownProps
  })
)(Profile)

Profile.defaultProps = {
  user: null
}

Profile.propTypes = {
  user: PropTypes.shape({})
}
