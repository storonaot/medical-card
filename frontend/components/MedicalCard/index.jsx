import { connect } from 'react-redux'
import { fetchMedicalCard, getUser, addTransaction } from 'store2/actions'
import { Row, Col } from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import { Paper } from '_shared'
import { web3 } from 'libs'
import { getPasswordFromLS, unlockAccount, sendTransaction, encryptData } from 'helpers'
import MedicalRecords from './MedicalRecords'
import Form from './Form'

class MedicalCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formShown: true,
      newRecord: {
        diagnosis: '',
        attendantDiagnosis: '',
        surveyPlan: '',
        generalRecommendations: '',
        recommendedTherapy: '',
        additionalInformation: ''
      }
    }

    this.updateRecord = this.updateRecord.bind(this)
    this.addRecord = this.addRecord.bind(this)
  }

  componentDidMount() {
    const { params, onFetchMedicalCard, user } = this.props
    const patientId = params.id
    onFetchMedicalCard(patientId)
    if (!user.data) this.props.onGetUser()
  }

  updateRecord(name, value) {
    const newRecord = { ...this.state.newRecord, [name]: value }
    this.setState({ newRecord })
  }

  addRecord() {
    const { newRecord } = this.state
    const { _patient } = this.props.medicalCard.data
    const { ethAddress, publicKey, _id } = _patient
    const { onAddTransaction } = this.props
    const encryptedData = encryptData(publicKey, newRecord)
    const senderPassword = getPasswordFromLS()
    const senderEthAddress = this.props.user.data.ethAddress
    const txObj = {
      from: senderEthAddress,
      gas: 100000,
      to: ethAddress,
      data: web3.utils.toHex(encryptedData)
    }

    unlockAccount(senderEthAddress, senderPassword).then((unlocked) => {
      if (unlocked) {
        sendTransaction(txObj).then((tx) => {
          if (tx.transactionHash) onAddTransaction(tx.transactionHash, _id)
          else console.log('sendTransaction ERROR')
        })
      }
    })
  }

  render() {
    const { medicalCard, user } = this.props
    const loading = medicalCard.loading || user.loading
    const errors = medicalCard.errors || user.errors
    if (loading) return (<div>Loading...</div>)
    else if (errors) return (<div>Errors...</div>)
    const { _patient } = medicalCard.data
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Paper>
              <div>{_patient.personalInfo.firstName}</div>
              <RaisedButton
                secondary
                label="Добавить запись"
                onClick={() => { this.setState({ formShown: true }) }}
                disabled={this.state.formShown}
              />
            </Paper>
          </Col>
          <Form
            opened={this.state.formShown}
            record={this.state.newRecord}
            updateValue={this.updateRecord}
            addRecord={this.addRecord}
          />
        </Row>
        <Row>
          <MedicalRecords medicalCard={medicalCard.data.medicalCard} />
        </Row>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    medicalCard: state.medicalCard,
    user: state.user,
    ownProps
  }),
  dispatch => ({
    onFetchMedicalCard: (patientId) => { dispatch(fetchMedicalCard(patientId)) },
    onGetUser: () => { dispatch(getUser()) },
    onAddTransaction: (txHash, patientId) => { dispatch(addTransaction(txHash, patientId)) }
  })
)(MedicalCard)

MedicalCard.propTypes = {
  params: PropTypes.shape({}).isRequired,
  onFetchMedicalCard: PropTypes.func.isRequired,
  onGetUser: PropTypes.func.isRequired,
  onAddTransaction: PropTypes.func.isRequired,
  medicalCard: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.shape({}),
    data: PropTypes.shape({
      _patient: PropTypes.shape({
        ethAddress: PropTypes.string
      })
    })
  }).isRequired,
  user: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.shape({}),
    data: PropTypes.shape({
      ethAddress: PropTypes.string
    })
  }).isRequired
}
