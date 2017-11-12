import { connect } from 'react-redux'
import { Paper, Title } from '_shared'
import { fetchRequests, getUser } from 'store2/actions'
import RaisedButton from 'material-ui/RaisedButton'
import DoctorDashboard from './Doctor'
import PatientDashboard from './Patient'
import styles from './styles'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emptyPersonalInfoText:
        `Для продолжения работы с приложением необходимо заполнить
        Персональную информацию`,
      encMsg: null,
      decMsg: null
    }

    this.goTo = this.goTo.bind(this)
  }

  componentDidMount() {
    this.props.onGetUser()
  }

  getLastThreeRequests() {
    const requests = this.props.requests.data
    if (requests.length > 3) return _.slice(requests, 0, 3)
    return requests
  }

  goTo(path) { this.props.router.push(path) }

  updateReqStatus(requestId, status) {
    console.log('updateReqStatus', requestId, status)
  }

  render() {
    const { user, router, requests } = this.props
    if (user.loading || requests.loading) return (<div>Loading...</div>)
    else if (user.errors || requests.errors) return (<div>Errors...</div>)

    if (!user.data.personalInfo) {
      return (
        <Paper className={styles.emptyPersonalInfo}>
          <Title text={this.state.emptyPersonalInfoText} />
          <RaisedButton
            secondary
            label="Fill Personal Info"
            onClick={() => { router.push('profile') }}
          />
        </Paper>
      )
    }

    if (user.data.isDoctor) {
      return (
        <div>
          <DoctorDashboard
            goToSendPermReq={() => { this.goTo('send-perm-req') }}
            showAll={() => { this.goTo('perm-reqs') }}
            user={user.data}
            requests={this.getLastThreeRequests()}
            deleteRequest={(id) => { console.log('deleteRequest', id) }}
          />
        </div>
      )
    }

    return (
      <div>
        <PatientDashboard
          user={user.data}
          requests={this.getLastThreeRequests()}
          showAll={() => { this.goTo('perm-reqs') }}
          successReq={(requestId) => { this.updateReqStatus(requestId, 'success') }}
          declineReq={(requestId) => { this.updateReqStatus(requestId, 'cancel') }}
        />
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    requests: state.requests,
    ownProps
  }),
  dispatch => ({
    onGetUser: () => {
      dispatch(getUser()).then((response) => {
        if (response.status === 200 && response.data) {
          const account = response.data.isDoctor ? 'doctor' : 'patient'
          dispatch(fetchRequests(account))
        }
      })
    }
  })
)(Dashboard)

Dashboard.propTypes = {
  user: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  requests: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  onGetUser: PropTypes.func.isRequired
}
