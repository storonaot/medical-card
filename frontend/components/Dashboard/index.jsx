import { connect } from 'react-redux'
import { Paper, Title } from '_shared'
import {
  fetchRequests, getUser, removeRequest, showSnackBar,
  updateRequestStatus, addMedicalCard, fetchPatients, fetchDoctors,
  deleteMedicalCard
} from 'store2/actions'
import { decryptMedicalCard, encryptData } from 'helpers'
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
      decMsg: null,
      medicalCard: []
    }

    this.goTo = this.goTo.bind(this)
    this.declineRequest = this.declineRequest.bind(this)
    this.successRequest = this.successRequest.bind(this)
    this.showMedicalCard = this.showMedicalCard.bind(this)
    this.deleteDoctor = this.deleteDoctor.bind(this)
  }

  componentDidMount() { this.props.onGetUser() }

  getLastThreeRequests() {
    const requests = this.props.requests.data
    if (requests.length > 3) return _.slice(requests, 0, 3)
    return requests
  }

  goTo(path) { this.props.router.push(path) }

  declineRequest(requestId) {
    const { onUpdateRequestStatus, onShowSnackBar } = this.props
    onUpdateRequestStatus(requestId, { status: 'cancel' }).then((response) => {
      if (response.status === 200) onShowSnackBar('Запрос отменен')
      else console.log('declineRequest response', response)
    })
  }

  successRequest(requestId, doctor) {
    const { onAddMedicalCard, onUpdateRequestStatus, onShowSnackBar } = this.props
    const { medicalCard, _id } = this.props.user.data
    decryptMedicalCard(medicalCard, _id, (err, result) => {
      if (result && result.length) {
        const medCard = []
        result.forEach((record) => {
          const encryptedRecord = encryptData(doctor.publicKey, record)
          medCard.push(encryptedRecord)
        })
        const sendData = {
          records: medCard,
          _doctor: doctor._id
        }
        onUpdateRequestStatus(requestId, { status: 'success' }).then((response) => {
          if (response.status === 200) {
            onShowSnackBar('Запрос одобрен')
            onAddMedicalCard(sendData)
          } else console.log('ERROR successRequest', response)
        })
      } else onAddMedicalCard({ _doctor: doctor._id, records: [] })
    })
  }

  deleteRequest(requestId) {
    this.props.onRemoveRequest(requestId).then((response) => {
      if (response.status === 200) this.props.onShowSnackBar('Запрос удален.')
    })
  }

  showMedicalCard(patientId) {
    this.props.router.push(`medical-card/${patientId}`)
  }

  deleteDoctor(doctorId) {
    this.props.onDeleteMedicalCard(doctorId)
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
          requests={requests.data}
          showAll={() => { this.goTo('perm-reqs') }}
          successReq={this.successRequest}
          declineReq={this.declineRequest}
          doctors={doctors}
          deleteDoctor={this.deleteDoctor}
          goToMedCard={() => { this.props.router.push('medical-card/current') }}
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
    doctors: state.doctors,
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
    onAddMedicalCard: (data) => { dispatch(addMedicalCard(data)) },
    onDeleteMedicalCard: (doctorId) => { dispatch(deleteMedicalCard(doctorId)) }
  })
)(Dashboard)

Dashboard.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape({
      medicalCard: PropTypes.array,
      _id: PropTypes.string
    })
  }).isRequired,
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
  onDeleteMedicalCard: PropTypes.func.isRequired,
  patients: PropTypes.shape({}).isRequired,
  doctors: PropTypes.shape({}).isRequired
}
