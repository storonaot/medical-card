import { connect } from 'react-redux'
import { Paper, Title } from '_shared'
import {
  fetchRequests, getUser, removeRequest, showSnackBar,
  updateRequestStatus, addMedicalCard, fetchPatients, fetchDoctors
} from 'store2/actions'
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
    this.updateReqStatus = this.updateReqStatus.bind(this)
    this.showMedicalCard = this.showMedicalCard.bind(this)
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
    this.props.onUpdateRequestStatus(requestId, { status }).then((response) => {
      const msg = response.data.status === 'cancel' ? 'Запрос отменен' : 'Запрос одобрен'
      this.props.onShowSnackBar(msg)
      if (response.data.status === 'success') {
        const mCard = {
          _doctor: response.data._from,
          medicalCard: null
        }
        this.props.onAddMedicalCard(mCard)
      }
    })
  }

  deleteRequest(requestId) {
    this.props.onRemoveRequest(requestId).then((response) => {
      if (response.status === 200) this.props.onShowSnackBar('Запрос удален.')
    })
  }

  showMedicalCard(patientId) {
    console.log('showMedicalCard', patientId)
    this.props.router.push(`medical-card/${patientId}`)
  }

  render() {
    const { user, router, requests, patients, doctors } = this.props
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
            deleteRequest={(id) => { this.deleteRequest(id) }}
            patients={patients}
            showMedicalCard={(patientId) => { this.showMedicalCard(patientId) }}
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
          doctors={doctors}
        />
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    requests: state.requests,
    patients: state.patients,
    doctors: state.patients,
    ownProps
  }),
  dispatch => ({
    onGetUser: () => {
      dispatch(getUser()).then((response) => {
        if (response.status === 200 && response.data) {
          const account = response.data.isDoctor ? 'doctor' : 'patient'
          const funcType = response.data.isDoctor ? fetchPatients : fetchDoctors
          dispatch(fetchRequests(account))
          dispatch(funcType())
        }
      })
    },
    onRemoveRequest: requestId => dispatch(removeRequest(requestId)),
    onShowSnackBar: (msg) => { dispatch(showSnackBar(msg)) },
    onUpdateRequestStatus: (id, status) => dispatch(updateRequestStatus(id, status)),
    onAddMedicalCard: (data) => { dispatch(addMedicalCard(data)) }
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
  onGetUser: PropTypes.func.isRequired,
  onUpdateRequestStatus: PropTypes.func.isRequired,
  onShowSnackBar: PropTypes.func.isRequired,
  onRemoveRequest: PropTypes.func.isRequired,
  onAddMedicalCard: PropTypes.func.isRequired,
  patients: PropTypes.shape({}).isRequired,
  doctors: PropTypes.shape({}).isRequired
}
