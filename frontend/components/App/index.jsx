import { connect } from 'react-redux'
import { Header, Navbar, GoToDashboardBtn } from '_shared'
import Snackbar from 'material-ui/Snackbar'
import {
  toggleSidebar, signOut, closeSnackBar, addNewRequest,
  deleteRequestFromStore, updateRequestStatusInStore,
  updateDoctorsList, updatePatientsList, deletePatientFromList,
  updateTransactionsArr, updateCurrentMedCard
} from 'store2/actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import io from 'socket.io-client'
import muiTheme from './muiTheme'
import styles from './styles'

const socket = io.connect()

// const electron = window.require('electron')
// const fs = electron.remote.require('fs')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.signOut = this.signOut.bind(this)
    this.goTo = this.goTo.bind(this)
    this.socketInit = this.socketInit.bind(this)
  }

  componentDidMount() {
    this.socketInit()
  }

  socketInit() {
    const {
      onAddNewRequest, onDeleteRequestFromStore,
      onUpdateRequestStatusInStore, onUpdateDoctorsList,
      onUpdatePatientsList, onDeletePatient, router, location,
      onUpdateTransactionsArr, onUpdateCurrentMedCard
    } = this.props
    this.socket = io.connect()
    socket.on('permReqs', (content) => {
      const { user } = this.props
      const uid = user.data._id
      const toid = content.data._to._id || content.data._to
      const fromid = content.data._from._id || content.data._from
      if (uid === toid) {
        if (content.type === 'create') onAddNewRequest(content.data)
        else if (content.type === 'remove') onDeleteRequestFromStore(content.data._id)
      }
      if (uid === fromid) {
        if (content.type === 'update') onUpdateRequestStatusInStore(content.data)
        else if (content.type === 'remove') onDeleteRequestFromStore(content.data._id)
      }
    })

    socket.on('medicalCard', (content) => {
      const { user } = this.props
      const uid = user.data._id
      const patientId = content.data._patient._id || content.data._patient
      const doctorId = content.data._doctor._id || content.data._doctor
      if (uid === patientId) {
        if (content.type === 'create') onUpdateDoctorsList(content.data)
      }
      if (uid === doctorId) {
        if (content.type === 'create') onUpdatePatientsList(content.data)
        else if (content.type === 'remove') {
          if (location.pathname === `/medical-card/${patientId}`) {
            router.push('dashboard')
          }
          onDeletePatient(content.data._id)
        } else if (content.type === 'update') {
          onUpdateCurrentMedCard(content.data)
          console.log('SOCKET medicalCard', content)
        }
      }
    })

    socket.on('transaction', (content) => {
      const { user } = this.props
      const uid = user.data._id
      const patientId = content.data._patient._id || content.data._patient
      if (uid === patientId) {
        if (content.type === 'add') onUpdateTransactionsArr(content.data)
      }
    })
  }

  goTo(path) {
    const { router, location } = this.props
    if (location.pathname !== `/${path}`) router.push(path)
  }

  signOut() {
    this.props.onSignOut().then(() => { this.goTo('/') })
  }

  render() {
    const {
      children, sidebarOpened, user,
      onToggleSidebar, location, router,
      snackbarShow, snackbarMsg, onCloseSnackBar
    } = this.props

    const email = user.data ? user.data.email : null
    const isDoctor = user.data ? user.data.isDoctor : false

    return (
      <MuiThemeProvider muiTheme={muiTheme(isDoctor ? 'doctor' : 'patient')}>
        <div className={styles.app}>
          <Header
            toggleSidebar={onToggleSidebar}
            sidebarOpened={sidebarOpened}
            logged={!!user.data}
            email={email}
            signOut={this.signOut}
            goTo={this.goTo}
          />
          <Navbar
            sidebarOpened={sidebarOpened}
            clickAway={onToggleSidebar}
          />
          <div className={styles.content}>
            <GoToDashboardBtn
              path={location.pathname}
              push={router.push}
            />
            {children}
          </div>
          <Snackbar
            open={snackbarShow}
            message={snackbarMsg}
            autoHideDuration={4000}
            onClick={onCloseSnackBar}
            onRequestClose={onCloseSnackBar}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(
  state => ({
    sidebarOpened: state.ui.sidebarOpened,
    user: state.user,
    snackbarShow: state.ui.snackBar.show,
    snackbarMsg: state.ui.snackBar.msg
  }),
  dispatch => ({
    onToggleSidebar: () => { dispatch(toggleSidebar()) },
    onSignOut: () => (dispatch(signOut())),
    onCloseSnackBar: () => { dispatch(closeSnackBar()) },
    onAddNewRequest: (request) => { dispatch(addNewRequest(request)) },
    onDeleteRequestFromStore: (requestId) => {
      dispatch(deleteRequestFromStore(requestId))
    },
    onUpdateRequestStatusInStore: (request) => {
      dispatch(updateRequestStatusInStore(request))
    },
    onUpdateDoctorsList: (medCard) => {
      dispatch(updateDoctorsList(medCard))
    },
    onUpdatePatientsList: (medCard) => {
      dispatch(updatePatientsList(medCard))
    },
    onDeletePatient: (cardId) => {
      dispatch(deletePatientFromList(cardId))
    },
    onUpdateTransactionsArr: (txHash) => {
      dispatch(updateTransactionsArr(txHash))
    },
    onUpdateCurrentMedCard: (data) => {
      dispatch(updateCurrentMedCard(data))
    }
  })
)(App)

App.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape({})
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  sidebarOpened: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  snackbarShow: PropTypes.bool.isRequired,
  snackbarMsg: PropTypes.string.isRequired,
  onCloseSnackBar: PropTypes.func.isRequired,
  onAddNewRequest: PropTypes.func.isRequired,
  onDeleteRequestFromStore: PropTypes.func.isRequired,
  onUpdateRequestStatusInStore: PropTypes.func.isRequired,
  onUpdateDoctorsList: PropTypes.func.isRequired,
  onUpdatePatientsList: PropTypes.func.isRequired,
  onDeletePatient: PropTypes.func.isRequired,
  onUpdateTransactionsArr: PropTypes.func.isRequired
}
