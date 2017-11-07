import { connect } from 'react-redux'
import Form from './Form'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      specialisation: ''
    }

    this.updateValue = this.updateValue.bind(this)
    this.sendPersonalInfo = this.sendPersonalInfo.bind(this)
  }

  updateValue(name, value) {
    this.setState({ [name]: value })
  }

  sendPersonalInfo() {
    const { firstName, lastName, specialisation } = this.state
    const { user } = this.props
    const userId = user._id
    let personalInfo = { firstName, lastName }

    if (user.isDoctor) personalInfo = { ...personalInfo, specialisation }

    console.log('personalInfo', personalInfo)

    axios.put(`/api/v1/user/${userId}`, personalInfo).then((response) => {
      console.log('sendPersonalInfo', response)
      // TODO: Update user Object
    }, (error) => {
      console.error('error sendPersonalInfo', error)
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
  })
)(Profile)

Profile.propTypes = {
  user: PropTypes.shape({}).isRequired
}
