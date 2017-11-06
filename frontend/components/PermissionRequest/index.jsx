import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Paper } from '_shared'
import { connect } from 'react-redux'
import firebase from 'libs/firebase'
import { forIn as _forIn } from 'lodash'
import Snackbar from 'material-ui/Snackbar'
import ResultsTable from './ResultsTable'
import styles from './styles'

class PermissionRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snackbarShow: false,
      snackbarMsg: '',
      search: '',
      results: null
    }

    this.updateValue = this.updateValue.bind(this)
    this.searchPatient = this.searchPatient.bind(this)
    this.sendPermissionRequest = this.sendPermissionRequest.bind(this)
  }

  showSnack(msg) {
    this.setState({ snackbarMsg: msg }, () => { this.setState({ snackbarShow: true }) })
  }

  updateValue(name, value) {
    this.setState({ [name]: value })
  }

  searchPatient() {
    const email = this.state.search
    firebase.database()
      .ref('users')
      .orderByChild('email')
      .equalTo(email)
      .once('value', (snap) => {
        if (snap.val()) {
          _forIn(snap.val(), (value) => {
            this.checkExistedPermissions(value)
            // this.setState({ results: value }, () => { this.checkExistedPermissions(value) })
          })
        } else {
          this.setState({ results: 'empty' })
        }
      })
  }

  // storonaot@gmail.com

  checkExistedPermissions(value) {
    const patientId = value.uid
    const doctorId = this.props.user.uid
    if (value.personalInfo) {
      firebase.database()
        .ref('permsRequests')
        .once('value', (snap) => {
          if (snap.val() === null) {
            this.setState({ results: { ...value, requestExist: false } })
          } else {
            // проверяем был ли до этого уже оправлен запрос
            // на доступ этому пациенту
            firebase.database()
              .ref('permsRequests')
              .orderByChild('from')
              .equalTo(doctorId)
              .once('value', (snp) => {
                _forIn(snp.val(), (val) => {
                  if (val.to === patientId) {
                    this.setState({ results: { ...value, requestExist: true } })
                  } else {
                    this.setState({ results: { ...value, requestExist: false } })
                  }
                })
              })
          }
        })
    } else {
      this.setState({ results: 'empty' })
    }
  }

  sendPermissionRequest() {
    const { firstName, lastName } = this.state.results.personalInfo
    const doctor = this.props.user.personalInfo
    const newPermissionKey = firebase.database().ref('permsRequests').push().key
    firebase.database()
      .ref(`permsRequests/${newPermissionKey}`)
      .set({
        to: this.state.results.uid,
        from: this.props.user.uid,
        toName: `${firstName} ${lastName}`,
        fromName: doctor ? `${doctor.lastName} ${doctor.firstName} ${doctor.specialisation}` : 'No name',
        status: 'pending'
      })
    this.setState({ search: '', results: null })
    this.showSnack('Запрос отправлен')
  }

  render() {
    const { results } = this.state
    const resultsComp = () => {
      if (results) {
        if (results === 'empty') return (<Paper>Запрос не дал результатов</Paper>)
        return (
          <ResultsTable
            data={{ ...results.personalInfo, email: results.email }}
            sendPermissionRequest={this.sendPermissionRequest}
            disabledButton={this.state.results.requestExist}
          />
        )
      }
      return null
    }
    return (
      <div>
        <RaisedButton
          secondary
          label="Go to dashboard"
          style={{ marginBottom: '20px' }}
          onClick={() => { this.props.router.push('dashboard') }}
        />
        <Paper style={{ marginBottom: '20px' }}>
          <div className={styles.formWrapper}>
            <TextField
              floatingLabelText="Search patient by email"
              fullWidth
              onChange={(e) => { this.updateValue('search', e.target.value) }}
              value={this.state.search}
            />
            <RaisedButton
              className={styles.searchButton}
              secondary
              label="Search"
              onClick={this.searchPatient}
            />
          </div>
        </Paper>
        {resultsComp()}
        <Snackbar
          open={this.state.snackbarShow}
          message={this.state.snackbarMsg}
          autoHideDuration={4000}
          onRequestClose={() => { this.setState({ snackbarShow: false }) }}
        />
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    ownProps
  })
)(PermissionRequest)

PermissionRequest.defaultProps = {
  user: null
}

PermissionRequest.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
    personalInfo: PropTypes.shape({})
  })
}
