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

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RSAKeys: null,
      perms: null
    }
  }

  render() {
    const { user } = this.props
    if (user) {
      if (user.isDoctor) {
        return (
          <DoctorProfile router={this.props.router} user={user} />
        )
      }
      return (
        <PatientProfile user={user} />
      )
    }
    return (<div>Loading...</div>)
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    ownProps
  })
)(Dashboard)

Dashboard.defaultProps = {
  user: null
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string
  }),
  router: PropTypes.shape({}).isRequired
}
