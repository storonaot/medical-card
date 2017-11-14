import { connect } from 'react-redux'
import {
  getUser, fetchRequests, removeRequest, showSnackBar,
  updateRequestStatus
} from 'store2/actions'
import PatientPermReq from './Patient'
import DoctorPermReq from './Doctor'

class PermReqs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.deleteRequest = this.deleteRequest.bind(this)
    this.updateReqStatus = this.updateReqStatus.bind(this)
  }

  componentDidMount() {
    const { user, onGetUser, onFetchRequests, requests } = this.props
    if (!user.data) onGetUser()
    if (user.data && !requests.data) {
      const account = user.data.isDoctor ? 'doctor' : 'patient'
      onFetchRequests(account)
    }
  }

  deleteRequest(requestId) {
    this.props.onRemoveRequest(requestId).then((response) => {
      if (response.status === 200) this.props.onShowSnackBar('Запрос удален.')
    })
  }

  updateReqStatus(requestId, status) {
    this.props.onUpdateRequestStatus(requestId, { status }).then((response) => {
      const msg = response.data.status === 'cancel' ? 'Запрос отменен' : 'Запрос одобрен'
      this.props.onShowSnackBar(msg)
    })
  }

  render() {
    const { user, requests, router } = this.props
    if (user.loading || requests.loading) return (<div>Loading...</div>)
    else if (user.errors || requests.errors) return (<div>Errors</div>)

    if (user.data.isDoctor) {
      return (
        <DoctorPermReq
          router={router}
          requests={requests.data}
          deleteRequest={this.deleteRequest}
        />
      )
    }
    return (
      <PatientPermReq
        requests={requests.data}
        successReq={(requestId) => { this.updateReqStatus(requestId, 'success') }}
        declineReq={(requestId) => { this.updateReqStatus(requestId, 'cancel') }}
      />
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
    },
    onFetchRequests: (account) => { dispatch(fetchRequests(account)) },
    onRemoveRequest: requestId => dispatch(removeRequest(requestId)),
    onShowSnackBar: (msg) => { dispatch(showSnackBar(msg)) },
    onUpdateRequestStatus: (requestId, status) => dispatch(updateRequestStatus(requestId, status))
  })
)(PermReqs)

PermReqs.propTypes = {
  user: PropTypes.shape({}).isRequired,
  requests: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  onGetUser: PropTypes.func.isRequired,
  onFetchRequests: PropTypes.func.isRequired,
  onRemoveRequest: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired,
  onShowSnackBar: PropTypes.func.isRequired,
  onUpdateRequestStatus: PropTypes.func.isRequired
}
