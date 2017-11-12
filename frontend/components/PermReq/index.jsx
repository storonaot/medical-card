import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Paper, Title } from '_shared'
import { Row, Col } from 'react-flexbox-grid'
import ResultsTable from './ResultsTable'
import styles from './styles'

class PermReq extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      searchResult: null
    }

    this.searchPatient = this.searchPatient.bind(this)
    this.updateValue = this.updateValue.bind(this)
  }

  searchPatient() {
    const login = this.state.search
    axios.post('/api/v1/user/search-patient', { login }).then((response) => {
      if (!response.data) this.setState({ searchResult: 'isEmpty' })
      else this.setState({ searchResult: response.data })
    }, (error) => {
      console.error('error', error.response.data)
    }).then(() => { this.setState({ search: '' }) })
  }

  updateValue(name, value) {
    this.setState({ [name]: value })
  }

  render() {
    return (
      <Row>
        <Col md={5}>
          <Paper style={{ marginBottom: '20px' }}>
            <Title text="Serch patient" />
            <div className={styles.searchWrapper}>
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
                disabled={this.state.search.length < 3}
              />
            </div>
          </Paper>
        </Col>
        <Col md={7}>
          <ResultsTable result={this.state.searchResult} />
        </Col>
      </Row>
    )
  }
}

export default PermReq
