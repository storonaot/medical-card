import { connect } from 'react-redux'
import { sendPersonalInfo } from 'store2/actions'
// import { createKeyFile } from 'helpers'
import { createEthAccount, createKeyFile } from 'helpers'
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
      ethAddress: null
    }

    this.updateValue = this.updateValue.bind(this)
    this.sendPersonalInfo = this.sendPersonalInfo.bind(this)
    this.addPersonalInfo = this.addPersonalInfo.bind(this)
  }

  updateValue(name, value) {
    this.setState({ [name]: value })
  }

  addPersonalInfo() {
    const userId = this.props.user._id
    const fileContent = JSON.stringify(createEthAccount())
    this.setState(
      { ethAddress: createEthAccount().address },
      () => { createKeyFile(userId, fileContent, this.sendPersonalInfo) }
    )
  }

  sendPersonalInfo() {
    // TODO: - сделать проверку если вдруг файл создать не удалось
    console.log('sendPersonalInfo', sendPersonalInfo)
    const { user, router } = this.props
    const {
      firstName, lastName, specialisation,
      ethAddress, gender
    } = this.state
    const userId = user._id
    let personalInfo = { firstName, lastName, gender }
    const pubKey = { pubKey: ethAddress }

    if (user.isDoctor) personalInfo = { ...personalInfo, specialisation }
    const resultObj = { personalInfo, ...pubKey }

    this.props.onSendPersonalInfo(userId, resultObj).then((response) => {
      if (response.data) router.push('dashboard')
      console.log('onSendPersonalInfo', response)
    })
  }

  disabledButton() {
    const { firstName, lastName, specialisation } = this.state
    const { user } = this.props
    if (user.isDoctor) return (!firstName || !lastName || !specialisation)
    return (!firstName || !lastName)
  }

  render() {
    // console.log('this.props', this.props.user.data)
    const { user } = this.props
    if (!user) return null
    return (
      <Form
        isDoctor={user.isDoctor}
        data={user.personalInfo || this.state}
        updateValue={this.updateValue}
        sendPersonalInfo={this.addPersonalInfo}
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
