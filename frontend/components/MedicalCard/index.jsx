import { connect } from 'react-redux'
import { fetchMedicalCard, getUser, addTransaction, showSnackBar } from 'store2/actions'
import { Row, Col } from 'react-flexbox-grid'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import { Paper, Title, Avatar, Overlay } from '_shared'
import { web3 } from 'libs'
import {
  getPasswordFromLS, unlockAccount, sendTransaction,
  encryptData
} from 'helpers'
import MedicalRecords from './MedicalRecords'
import Form from './Form'
import decryptMedicalCard from './decryptMedicalCard'
import styles from './styles'

class MedicalCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMedicalCard: null,
      formShown: false,
      activeRecord: null,
      addingRecord: false,
      overlayContent: 'Пожалуйста, подождите - идет сохранение...',
      newRecord: {
        type: 'advisoryOpinion', // Консультативное заключение
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
    this.triggerForm = this.triggerForm.bind(this)
    this.setCurrentMedicalCard = this.setCurrentMedicalCard.bind(this)
    this.setActiveRecord = this.setActiveRecord.bind(this)
    this.resetNewRecordFields = this.resetNewRecordFields.bind(this)
  }

  componentDidMount() {
    const { params, onFetchMedicalCard, user } = this.props
    const patientId = params.id
    // onFetchMedicalCard(patientId)
    if (!user.data) this.props.onGetUser()
    onFetchMedicalCard(patientId).then((response) => {
      if (response.status === 200) {
        const { medicalCard } = response.data
        const doctorId = response.data._doctor
        if (medicalCard) decryptMedicalCard(medicalCard, doctorId, this.setCurrentMedicalCard)
        else this.setCurrentMedicalCard(null, null)
      }
    })
  }

  setActiveRecord(value) {
    if (value === this.state.activeRecord) this.setState({ activeRecord: null })
    else this.setState({ activeRecord: value })
  }

  setCurrentMedicalCard(err, result) {
    if (err) console.log('setCurrentMedicalCard err', err)
    else this.setState({ currentMedicalCard: result })
  }

  updateRecord(name, value) {
    const newRecord = { ...this.state.newRecord, [name]: value }
    this.setState({ newRecord })
  }

  resetNewRecordFields() {
    const newRecord = {
      type: 'advisoryOpinion',
      diagnosis: '',
      attendantDiagnosis: '',
      surveyPlan: '',
      generalRecommendations: '',
      recommendedTherapy: '',
      additionalInformation: ''
    }

    this.setState({ newRecord })
  }

  dataObj() {
    const { newRecord } = this.state
    const { personalInfo } = this.props.user.data
    const doctor = `${personalInfo.firstName} ${personalInfo.lastName} ${personalInfo.specialisation}`
    const data = {
      ...newRecord,
      doctor,
      created: Date.now()
    }
    return data
  }

  addRecord() {
    this.setState({ addingRecord: true })
    const { _patient } = this.props.medicalCard.data
    const { ethAddress, publicKey, _id } = _patient
    const { onAddTransaction, onShowSnackBar } = this.props
    const encryptedData = encryptData(publicKey, this.dataObj())
    const senderPassword = getPasswordFromLS()
    const senderEthAddress = this.props.user.data.ethAddress
    const txObj = {
      from: senderEthAddress,
      gas: 1000000,
      to: ethAddress,
      data: web3.utils.toHex(encryptedData)
    }

    unlockAccount(senderEthAddress, senderPassword).then((unlocked) => {
      if (unlocked) {
        sendTransaction(txObj).then((tx) => {
          console.log('sendTransaction', tx)
          if (tx.transactionHash) {
            onAddTransaction(tx.transactionHash, _id).then(
              () => {
                this.setState(
                  { addingRecord: false, formShown: false },
                  () => {
                    this.resetNewRecordFields()
                    onShowSnackBar('Запись успешно отправлена.')
                  }
                )
              }
            )
          } else {
            this.setState({ addingRecord: false }, () => {
              onShowSnackBar('Не удалось отправить запись, попробуйте еще раз.')
            })
            console.log('sendTransaction ERROR')
          }
        })
      }
    })
  }

  triggerForm() { this.setState({ formShown: !this.state.formShown }) }

  render() {
    const { medicalCard, user } = this.props
    const loading = medicalCard.loading || user.loading
    const errors = medicalCard.errors || user.errors
    if (loading) return (<div>Loading...</div>)
    else if (errors) return (<div>Errors...</div>)
    const { _patient } = medicalCard.data
    return (
      <div>
        <Row className={styles.block}>
          <Col xs={12} className={styles.block}>
            <Paper>
              <Title text="Медицинская карта пациента" />
              <div className={styles.personalInfoWrapper}>
                <div className={styles.personalInfo}>
                  <Avatar photo={_patient.photo} style={{ marginRight: '20px' }} />
                  <div>
                    <p>
                      {_patient.personalInfo.lastName} {_patient.personalInfo.firstName}
                    </p>
                    <p>{_patient.personalInfo.gender}</p>
                  </div>
                </div>
                <FloatingActionButton
                  onClick={this.triggerForm}
                  secondary={this.state.formShown}
                >
                  {this.state.formShown ? <ContentRemove /> : <ContentAdd />}
                </FloatingActionButton>
              </div>
            </Paper>
          </Col>
          {this.state.formShown && (
            <Col xs={12} className={styles.block}>
              <Form
                record={this.state.newRecord}
                updateValue={this.updateRecord}
                addRecord={this.addRecord}
              />
            </Col>
          )}
        </Row>
        <MedicalRecords
          medicalCard={this.state.currentMedicalCard}
          btnClick={this.triggerForm}
          setActiveRecord={this.setActiveRecord}
          activeRecord={this.state.activeRecord}
        />
        <Overlay
          isActive={this.state.addingRecord}
          content={this.state.overlayContent}
        />
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
    onFetchMedicalCard: patientId => dispatch(fetchMedicalCard(patientId)),
    onGetUser: () => dispatch(getUser()),
    onAddTransaction: (txHash, patientId) => dispatch(addTransaction(txHash, patientId)),
    onShowSnackBar: (msg) => { dispatch(showSnackBar(msg)) }
  })
)(MedicalCard)

MedicalCard.propTypes = {
  params: PropTypes.shape({}).isRequired,
  onFetchMedicalCard: PropTypes.func.isRequired,
  onGetUser: PropTypes.func.isRequired,
  onAddTransaction: PropTypes.func.isRequired,
  onShowSnackBar: PropTypes.func.isRequired,
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
      ethAddress: PropTypes.string,
      personalInfo: PropTypes.shape({})
    })
  }).isRequired
}
