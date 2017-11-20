import { connect } from 'react-redux'
import { sendPersonalInfo, createTransactions } from 'store2/actions'
import { createKeyFile, generateKeyPair } from 'helpers'
import Form from './Form'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      specialisation: '',
      gender: 'femail',
      publicKey: null
    }

    this.updateValue = this.updateValue.bind(this)
    this.sendPersonalInfo = this.sendPersonalInfo.bind(this)
    this.createKeyFile = this.createKeyFile.bind(this)
  }

  updateValue(name, value) {
    this.setState({ [name]: value })
  }

  createKeyFile() {
    const userId = this.props.user._id
    const keyPairPEM = generateKeyPair()
    this.setState(
      { publicKey: keyPairPEM.publicKey },
      () => { createKeyFile(userId, JSON.stringify(keyPairPEM), this.sendPersonalInfo) }
    )
  }

  sendPersonalInfo() {
    // TODO: - сделать проверку если вдруг файл создать не удалось
    const { user, router } = this.props
    const {
      firstName, lastName, specialisation,
      ethAddress, gender, publicKey
    } = this.state
    const userId = user._id
    let personalInfo = { firstName, lastName, gender }

    if (user.isDoctor) personalInfo = { ...personalInfo, specialisation }
    const resultObj = { personalInfo, ethAddress, publicKey }

    this.props.onSendPersonalInfo(userId, resultObj).then((response) => {
      if (response.data) {
        this.props.onCreateTransactions()
        router.push('dashboard')
      }
    })
  }

  disabledButton() {
    const { firstName, lastName, specialisation } = this.state
    const { user } = this.props
    if (user.isDoctor) return (!firstName || !lastName || !specialisation)
    return (!firstName || !lastName)
  }

  render() {
    const { user } = this.props
    if (!user) return null
    return (
      <Form
        isDoctor={user.isDoctor}
        data={user.personalInfo || this.state}
        updateValue={this.updateValue}
        sendPersonalInfo={this.createKeyFile}
        disabledButton={this.disabledButton()}
        disabledFields={!!user.personalInfo}
      />
    )
  }
}

export default connect(
  state => ({
    user: state.user.data
  }),
  dispatch => ({
    onSendPersonalInfo: (userId, data) => (dispatch(sendPersonalInfo(userId, data))),
    onCreateTransactions: () => { dispatch(createTransactions()) }
  })
)(Profile)

Profile.defaultProps = {
  user: null
}

Profile.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string
  }),
  onSendPersonalInfo: PropTypes.func.isRequired,
  onCreateTransactions: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired
}
