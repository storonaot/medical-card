import { connect } from 'react-redux'
// import path from 'path'
import DoctorProfile from './Doctor'
import PatientProfile from './Patient'
//
// const electron = window.require('electron')
// const fs = electron.remote.require('fs')

// const getRSAKeys = (uid, cb) => {
//   const userDataPath = (electron.app || electron.remote.app).getPath('userData')
//   const filepath = path.join(userDataPath, `keys_${uid}.txt`)
//   fs.readFile(filepath, 'utf8', cb)
// }

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RSAKeys: null
    }
  }

  render() {
    const { user } = this.props
    if (user) {
      if (user.isDoctor) return (<DoctorProfile />)
      return <PatientProfile />
    }
    return (<div>Loading...</div>)
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    ownProps
  })
)(Profile)

Profile.defaultProps = {
  user: null
}

Profile.propTypes = {
  user: PropTypes.shape({})
}
