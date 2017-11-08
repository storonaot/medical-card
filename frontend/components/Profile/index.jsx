import { connect } from 'react-redux'
import { sendPersonalInfo } from 'store2/actions'
// import { createKeyFile } from 'helpers'
import Web3 from 'web3'
import Form from './Form'

let web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

console.log('web3', web3)

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      specialisation: '',
      gender: ''
    }

    this.updateValue = this.updateValue.bind(this)
    this.sendPersonalInfo = this.sendPersonalInfo.bind(this)
  }

  updateValue(name, value) {
    this.setState({ [name]: value })
  }

  // createEthAccount() {
  //
  // }

  sendPersonalInfo() {
    const { firstName, lastName, specialisation } = this.state
    const { user, router } = this.props
    const userId = user._id
    let personalInfo = { firstName, lastName }

    if (user.isDoctor) personalInfo = { ...personalInfo, specialisation }

    this.props.onSendPersonalInfo(userId, personalInfo).then((response) => {
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
        sendPersonalInfo={this.sendPersonalInfo}
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
  user: PropTypes.shape({}),
  onSendPersonalInfo: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired
}
