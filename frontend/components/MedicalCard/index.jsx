import { connect } from 'react-redux'
import {
  getUser, fetchMedicalCard, fetchTransactions,
  showSnackBar, addTransaction, updateUser
} from 'store2/actions'
import {
  getPasswordFromLS, unlockAccount, sendTransaction,
  encryptData
} from 'helpers'
import { web3 } from 'libs'
import decryptMedicalCard from './decryptMedicalCard'
import getMedicalRecords from './getMedicalRecords'
import Patient from './Patient'
import Doctor from './Doctor'

class MedicalCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMedicalCard: null,
      activeRecord: null,
      formShown: false,
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

    this.setCurrentMedicalCard = this.setCurrentMedicalCard.bind(this)
    this.setActiveRecord = this.setActiveRecord.bind(this)
    this.triggerForm = this.triggerForm.bind(this)
    this.updateRecord = this.updateRecord.bind(this)
    this.addRecord = this.addRecord.bind(this)
    this.updateMedicalCard = this.updateMedicalCard.bind(this)
    this.shownUpdateBtn = this.shownUpdateBtn.bind(this)
    this.resetNewRecordFields = this.resetNewRecordFields.bind(this)
  }

  componentDidMount() {
    const {
      onFetchMedicalCard, onGetUser, params,
      onFetchTransactions
    } = this.props
    const patientId = params.id
    onGetUser().then((response) => {
      if (response.status === 200) {
        const { isDoctor } = response.data
        if (isDoctor) {
          onFetchMedicalCard(patientId).then((res) => {
            if (res.status === 200) {
              const { records } = res.data
              const doctorId = res.data._doctor
              if (records.length) decryptMedicalCard(records, doctorId, this.setCurrentMedicalCard)
              else this.setCurrentMedicalCard(null, null)
            }
          })
        } else if (!isDoctor) {
          const { medicalCard, _id } = response.data
          if (medicalCard) decryptMedicalCard(medicalCard, _id, this.setCurrentMedicalCard)
          else this.setCurrentMedicalCard(null, null)
          onFetchTransactions()
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.medicalCard.data && this.props.medicalCard.data) {
      const uid = this.props.user.data._id
      const oldRecords = this.props.medicalCard.data.records
      const newRecords = nextProps.medicalCard.data.records
      if (oldRecords.length < newRecords.length) {
        decryptMedicalCard(newRecords, uid, this.setCurrentMedicalCard)
      }
    }
  }

  setCurrentMedicalCard(err, result) {
    console.log('111setCurrentMedicalCard', err, result)
    if (err) console.log('setCurrentMedicalCard err', err)
    else this.setState({ currentMedicalCard: result })
  }

  setActiveRecord(value) {
    if (value === this.state.activeRecord) this.setState({ activeRecord: null })
    else this.setState({ activeRecord: value })
  }

  updateRecord(name, value) {
    const newRecord = { ...this.state.newRecord, [name]: value }
    this.setState({ newRecord })
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
      to: ethAddress,
      data: web3.utils.toHex(encryptedData)
    }

    unlockAccount(senderEthAddress, senderPassword).then((unlocked) => {
      if (unlocked) {
        web3.eth.estimateGas(txObj, (error, gas) => {
          sendTransaction({ ...txObj, gas }, (err, transactionHash) => {
            if (err) {
              this.setState({ addingRecord: false }, () => {
                onShowSnackBar('Не удалось отправить запись, попробуйте еще раз.')
              })
              console.error('sendTransaction ERROR', err)
            } else {
              onAddTransaction(transactionHash, _id)
                .then(
                  () => {
                    this.setState(
                      { addingRecord: false, formShown: false },
                      () => {
                        this.resetNewRecordFields()
                        onShowSnackBar('Запись успешно отправлена.')
                      })
                  })
            }
          })
        })
      }
    })
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

  updateMedicalCard() {
    const { transactions, user, onUpdateUser } = this.props
    const txsHashes = transactions.data.txs
    const uid = user.data._id
    if (txsHashes.length) {
      getMedicalRecords(txsHashes, uid, (err, records) => {
        const encryptedPatientArray = []
        records.forEach((item) => {
          const encryptedDataForUser = encryptData(user.data.publicKey, item)
          encryptedPatientArray.push(encryptedDataForUser)
        })
        onUpdateUser(uid, { medicalCard: encryptedPatientArray }).then((response) => {
          if (response.status === 200) this.setCurrentMedicalCard(null, records)
          else console.log('onUpdateUser', response)
        })
        axios.get(`/api/v1/request/params/${uid}`).then((myDoctors) => {
          if (myDoctors.status === 200) {
            const encryptedDoctorsArr = []
            myDoctors.data.forEach((doctor) => {
              const medCard = []
              records.forEach((record) => {
                const encryptedRecord = encryptData(doctor.publicKey, record)
                medCard.push(encryptedRecord)
              })
              encryptedDoctorsArr.push({
                records: medCard,
                _doctor: doctor._doctor
              })
            })
            axios.put(`/api/v1/medical-card/${uid}`, encryptedDoctorsArr).then((res) => {
              console.log('medical-card res', res)
            })
          }
        })
      })
    }
  }

  shownUpdateBtn() {
    const user = this.props.user.data
    const transactions = this.props.transactions.data
    if (transactions) {
      const userUpdated = user.updated
      const txsUpdated = transactions.updated
      if (!user.medicalCard && !transactions.txs.length) return false
      else if (
        (!user.medicalCard && transactions.txs.length)
        || (txsUpdated > userUpdated)
      ) return true
    }

    return false
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

  triggerForm() { this.setState({ formShown: !this.state.formShown }) }

  render() {
    const { loading, errors, data } = this.props.user
    if (loading) return (<div>Loading...</div>)
    else if (errors) return (<div>Errors...</div>)
    const { isDoctor } = data
    const patient = this.props.medicalCard.data
      ? this.props.medicalCard.data._patient
      : null
    if (isDoctor) {
      return (
        <Doctor
          medicalCard={this.state.currentMedicalCard}
          setActiveRecord={this.setActiveRecord}
          activeRecord={this.state.activeRecord}
          patient={patient}
          triggerForm={this.triggerForm}
          formShown={this.state.formShown}
          newRecord={this.state.newRecord}
          updateRecord={this.updateRecord}
          addRecord={this.addRecord}
          addingRecord={this.state.addingRecord}
          overlayContent={this.state.overlayContent}
        />
      )
    }
    return (
      <Patient
        medicalCard={this.state.currentMedicalCard}
        setActiveRecord={this.setActiveRecord}
        activeRecord={this.state.activeRecord}
        updateMedicalCard={this.updateMedicalCard}
        shownUpdateBtn={this.shownUpdateBtn()}
        patient={data}
      />
    )
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    medicalCard: state.medicalCard,
    transactions: state.transactions,
    ownProps
  }),
  dispatch => ({
    onGetUser: () => dispatch(getUser()),
    onFetchMedicalCard: patientId => dispatch(fetchMedicalCard(patientId)),
    onFetchTransactions: () => { dispatch(fetchTransactions()) },
    onShowSnackBar: (msg) => { dispatch(showSnackBar(msg)) },
    onAddTransaction: (txHash, patientId) => dispatch(addTransaction(txHash, patientId)),
    onUpdateUser: (uid, data) => dispatch(updateUser(uid, data))
  })
)(MedicalCard)

MedicalCard.propTypes = {
  onFetchMedicalCard: PropTypes.func.isRequired,
  onGetUser: PropTypes.func.isRequired,
  params: PropTypes.shape({}).isRequired,
  onFetchTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.shape({
    data: PropTypes.shape({})
  }).isRequired,
  medicalCard: PropTypes.shape({
    data: PropTypes.shape({
      _patient: PropTypes.shape({})
    })
  }).isRequired,
  user: PropTypes.shape({
    loading: PropTypes.bool,
    errors: PropTypes.shape({}),
    data: PropTypes.shape({
      ethAddress: PropTypes.string,
      personalInfo: PropTypes.shape({})
    })
  }).isRequired,
  onShowSnackBar: PropTypes.func.isRequired,
  onAddTransaction: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired
}
