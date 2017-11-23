import { connect } from 'react-redux'
import { showSnackBar, getUser } from 'store2/actions'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Paper, Title } from '_shared'
import { Row, Col } from 'react-flexbox-grid'
import ResultsTable from './ResultsTable'
import styles from './styles'

class SendPermReq extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      searchResult: null
    }

    this.searchPatient = this.searchPatient.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.sendPermission = this.sendPermission.bind(this)
  }

  componentDidMount() { this.props.onGetUser() }

  searchPatient() {
    const login = this.state.search
    axios.post('/api/v1/user/search-patient', { login }).then((response) => {
      if (!response.data) this.setState({ searchResult: 'isEmpty' })
      else this.setState({ searchResult: response.data })
    }, (error) => {
      console.error('error', error.response.data)
    }).then(() => { this.setState({ search: '' }) })
  }

  sendPermission(patientId) {
    const data = {
      _to: patientId,
      _from: this.props.user.data._id
    }

    const { onShowSnackBar } = this.props

    axios.post('/api/v1/request/', data).then(() => {
      onShowSnackBar('Permission sended')
    }, (error) => {
      console.error('error', error.response)
      if (error.response.status === 400) {
        onShowSnackBar('Запрос данному пациенту уже был отправлен.')
      }
    })
  }

  updateValue(name, value) {
    this.setState({ [name]: value })
  }

  render() {
    const { user } = this.props
    if (user.loading) return (<div>Loading...</div>)
    else if (user.errors) return (<div>Errors...</div>)

    return (
      <Row>
        <Col md={5}>
          <Paper style={{ marginBottom: '20px' }}>
            <Title text="Найти пациента" />
            <div className={styles.searchWrapper}>
              <TextField
                floatingLabelText="Найти пациента по логину"
                fullWidth
                onChange={(e) => { this.updateValue('search', e.target.value) }}
                value={this.state.search}
              />
              <RaisedButton
                className={styles.searchButton}
                secondary
                label="Search"
                onClick={this.searchPatient}
                disabled={this.state.search.length < 3}
              />
            </div>
          </Paper>
        </Col>
        <Col md={7}>
          <ResultsTable
            result={this.state.searchResult}
            sendPermission={this.sendPermission}
          />
        </Col>
      </Row>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    ownProps
  }),
  dispatch => ({
    onShowSnackBar: (msg) => {
      dispatch(showSnackBar(msg))
    },
    onGetUser: () => { dispatch(getUser()) }
  })
)(SendPermReq)

SendPermReq.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape({
      _id: PropTypes.string
    })
  }).isRequired,
  onShowSnackBar: PropTypes.func.isRequired,
  onGetUser: PropTypes.func.isRequired
}
