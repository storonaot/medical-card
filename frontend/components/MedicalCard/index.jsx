import { connect } from 'react-redux'
import { getUser, fetchMedicalCard, fetchTransactions, showSnackBar, addTransaction, updateUser } from 'store2/actions'
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
      onFetchTransactions, transactions
    } = this.props
    const patientId = params.id
    onGetUser().then((response) => {
      if (response.status === 200) {
        const { isDoctor } = response.data
        if (isDoctor) {
          onFetchMedicalCard(patientId).then((res) => {
            if (res.status === 200) {
              const { medicalCard } = res.data
              const doctorId = res.data._doctor
              if (medicalCard) decryptMedicalCard(medicalCard, doctorId, this.setCurrentMedicalCard)
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

  setCurrentMedicalCard(err, result) {
    console.log('setCurrentMedicalCard', result)
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
      getMedicalRecords(txsHashes, uid, (err, result) => {
        const encryptedDataForUser = encryptData(user.data.publicKey, result)
        onUpdateUser(uid, { medicalCard: encryptedDataForUser }).then((response) => {
          if (response.status === 200) {
            decryptMedicalCard(response.data.medicalCard, uid, this.setCurrentMedicalCard)
          }
        })
        axios.get(`/api/v1/request/params/${uid}`).then((response) => {
          if (response.status === 200) {
            const encryptedArr = []
            response.data.forEach((item) => {
              const medCardEncrypted = encryptData(item.publicKey, result)
              encryptedArr.push({
                medicalCard: medCardEncrypted,
                _doctor: item._doctor
              })
            })
            axios.put(`/api/v1/medical-card/${uid}`, encryptedArr).then((res) => {
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
