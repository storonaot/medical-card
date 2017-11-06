import { connect } from 'react-redux'
import { signOut } from 'store2/actions'
import DoctorProfile from './Doctor'
import PatientProfile from './Patient'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { user } = this.props
    if (user) {
      if (user.isDoctor) {
        return (<DoctorProfile router={this.props.router} user={user} />)
      }
      return (
        <div>
          <button onClick={this.props.onSignOut}>signOut</button>
          <PatientProfile user={user} />
        </div>
      )
    }
    return (<div>Loading...</div>)
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    ownProps
  }),
  dispatch => ({
    onSignOut: () => { dispatch(signOut()) }
  })
)(Dashboard)

Dashboard.defaultProps = {
  user: null
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string
  }),
  router: PropTypes.shape({}).isRequired,
  onSignOut: PropTypes.func.isRequired
}
