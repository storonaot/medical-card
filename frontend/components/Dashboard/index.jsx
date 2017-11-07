import { connect } from 'react-redux'
// import { signOut } from 'store2/actions'
import DoctorDashboard from './Doctor'
import PatientDashboard from './Patient'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { user } = this.props
    if (user.loading) return (<div>Loading...</div>)
    else if (user.errors) return (<div>Errors...</div>)

    if (!user.data.profileInfo) return (<div>Бегом профиль заполнять</div>)

    if (user.data.isDoctor) {
      return (<DoctorDashboard router={this.props.router} user={user.data} />)
    }

    return (<PatientDashboard user={user} />)
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    ownProps
  })
  // dispatch => ({
  //   onSignOut: () => { dispatch(signOut()) }
  // })
)(Dashboard)

Dashboard.defaultProps = {
  user: null
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string
  }),
  router: PropTypes.shape({}).isRequired
}
