import { connect } from 'react-redux'
import { Paper, Title } from '_shared'
import {
  fetchRequests, getUser, removeRequest, showSnackBar,
  updateRequestStatus, addMedicalCard, fetchPatients, fetchDoctors,
  deleteMedicalCard, fetchTransactions
} from 'store2/actions'
import RaisedButton from 'material-ui/RaisedButton'
import { encryptData } from 'helpers'
import getMedicalRecords from './getMedicalRecords'
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

  componentDidMount() {
    const { onGetUser, onFetchTransactions, transactions } = this.props
    onGetUser()
    if (!transactions.data) onFetchTransactions()
  }

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
    const docPubKey = doctor.publicKey
    const txHashes = this.props.transactions.data.txs
    const patientId = this.props.transactions.data._patient
    const sendData = { _doctor: doctor._id }
    onUpdateRequestStatus(requestId, { status: 'success' }).then((response) => {
      if (response.status === 200) onShowSnackBar('Запрос одобрен')
      else console.log('successRequest response', response)
    })


    if (txHashes.length) {
      getMedicalRecords(txHashes, patientId, (err, res) => {
        const encrypted = encryptData(docPubKey, res)
        onAddMedicalCard({ ...sendData, medicalCard: encrypted })
      })
    } else {
      onAddMedicalCard({ ...sendData, medicalCard: null })
    }
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
    const { user, router, requests, patients, doctors, transactions } = this.props
    if (user.loading || requests.loading || transactions.loading) return (<div>Loading...</div>)
    else if (user.errors || requests.errors || transactions.errors) return (<div>Errors...</div>)

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
    transactions: state.transactions,
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
    onDeleteMedicalCard: (doctorId) => { dispatch(deleteMedicalCard(doctorId)) },
    onFetchTransactions: () => { dispatch(fetchTransactions()) }
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
  transactions: PropTypes.shape({
    data: PropTypes.shape({
      txs: PropTypes.array,
      _patient: PropTypes.string
    })
  }).isRequired,
  onFetchTransactions: PropTypes.func.isRequired,
  onGetUser: PropTypes.func.isRequired,
  onUpdateRequestStatus: PropTypes.func.isRequired,
  onShowSnackBar: PropTypes.func.isRequired,
  onRemoveRequest: PropTypes.func.isRequired,
  onAddMedicalCard: PropTypes.func.isRequired,
  onDeleteMedicalCard: PropTypes.func.isRequired,
  patients: PropTypes.shape({}).isRequired,
  doctors: PropTypes.shape({}).isRequired
}
