import { connect } from 'react-redux'
import { getUser, fetchRequests } from 'store2/actions'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'
import { Paper, Title, List, ListItem } from '_shared'
import styles from './styles'

class PermReqs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.deleteRequest = this.deleteRequest.bind(this)
  }

  componentDidMount() {
    const { user, onGetUser, onFetchRequests, requests } = this.props
    if (!user.data) onGetUser()
    if (user.data && !requests.data) {
      const account = user.data.isDoctor ? 'doctor' : 'patient'
      onFetchRequests(account)
    }
  }

  deleteRequest(id) {
    console.log('deleteRequest', id)
  }

  render() {
    const { user, requests, router } = this.props
    if (user.loading || requests.loading) return (<div>Loading...</div>)
    else if (user.errors || requests.errors) return (<div>Errors</div>)
    return (
      <Row>
        <Col md={12}>
          <Paper>
            <div className={styles.top}>
              <Title text="Запросы доступа" marginBottom={false} />
              <RaisedButton
                secondary
                label="Отправить запрос"
                onClick={() => { router.push('send-perm-req') }}
              />
            </div>
            <List>
              {requests.data.map(item => (
                <ListItem
                  deleteItem={this.deleteRequest}
                  key={item._id}
                  item={item}
                />
              ))}
            </List>
          </Paper>
        </Col>
      </Row>
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
    onFetchRequests: (account) => { dispatch(fetchRequests(account)) }
  })
)(PermReqs)

PermReqs.propTypes = {
  user: PropTypes.shape({}).isRequired,
  requests: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  onGetUser: PropTypes.func.isRequired,
  onFetchRequests: PropTypes.func.isRequired
}
