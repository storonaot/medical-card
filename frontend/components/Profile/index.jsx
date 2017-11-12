import { connect } from 'react-redux'
import { sendPersonalInfo } from 'store2/actions'
// import { createKeyFile } from 'helpers'
import { createEthAccount, createKeyFile, generateRSAKeyPair } from 'helpers'
// import Web3 from 'web3'

import Form from './Form'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      specialisation: '',
      gender: 'femail',
      ethAddress: null,
      publicPEM: null
    }

    this.updateValue = this.updateValue.bind(this)
    this.sendPersonalInfo = this.sendPersonalInfo.bind(this)
    this.createEthAccount = this.createEthAccount.bind(this)
    // this.addPersonalInfo = this.addPersonalInfo.bind(this)
  }

  updateValue(name, value) {
    this.setState({ [name]: value })
  }

  createEthAccount() {
    const userId = this.props.user._id
    const ethAccountKeys = createEthAccount()
    const pemRsaKeys = generateRSAKeyPair()
    const fileContent = {
      eth: ethAccountKeys,
      pem: pemRsaKeys
    }
    this.setState(
      { ethAddress: ethAccountKeys.address, publicPEM: pemRsaKeys.publicKey },
      () => { createKeyFile(userId, JSON.stringify(fileContent), this.sendPersonalInfo) }
    )
  }

  sendPersonalInfo() {
    // TODO: - сделать проверку если вдруг файл создать не удалось
    const { user, router } = this.props
    const {
      firstName, lastName, specialisation,
      ethAddress, gender, publicPEM
    } = this.state
    const userId = user._id
    let personalInfo = { firstName, lastName, gender }

    if (user.isDoctor) personalInfo = { ...personalInfo, specialisation }
    const resultObj = { personalInfo, ethAddress, publicPEM }

    this.props.onSendPersonalInfo(userId, resultObj).then((response) => {
      if (response.data) router.push('dashboard')
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
        sendPersonalInfo={this.createEthAccount}
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
    onSendPersonalInfo: (userId, data) => (dispatch(sendPersonalInfo(userId, data)))
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
  router: PropTypes.shape({}).isRequired
}
