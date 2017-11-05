import { Paper } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from 'libs/firebase'
import { forIn as _forIn } from 'lodash'
import styles from '../styles'

// const getPermReqForDoctor = (uid) => {
//   return firebase.database()
//     .ref('permsRequests')
//     .orderByChild('from')
//     .equalTo(uid)
//     .once('value', (snap) => {
//       // _forIn(snap.val(), (val) => {
//       //   const patientId = val.to
//       //   console.log('patientId')
//       //   return patientId
//       // })
//       const dataArr = []
//       _forIn(snap.val(), (value) => {
//         dataArr.push(value)
//       })
//       console.log('dataArr', dataArr)
//       return dataArr
//     })
// }
//
// const DoctorProfile = ({ router, user }) => {
//   console.log('router', router)
//   return (
//     <div className={styles.wprapper}>
//       <RaisedButton
//         secondary
//         label="Send permission request"
//         style={{ marginBottom: '20px' }}
//         onClick={() => { router.push('send-perm-req') }}
//       />
//       <div className={styles.gridWrapper}>
//         <Paper className={styles.a}>My profile</Paper>
//         <Paper className={styles.b}>My Patients</Paper>
//         <Paper className={styles.c}>
//           Hui
//         </Paper>
//       </div>
//     </div>
//   )
// }

class DoctorProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      permissions: []
    }

    this.getPermReqForDoctor = this.getPermReqForDoctor.bind(this)
  }

  componentDidMount() {
    this.getPermReqForDoctor(this.props.user.uid)
  }

  getPermReqForDoctor(uid) {
    firebase.database()
      .ref('permsRequests')
      .orderByChild('from')
      .equalTo(uid)
      .once('value', (snap) => {
        const dataArr = []
        _forIn(snap.val(), (value) => {
          dataArr.push(value)
        })
        this.setState({ permissions: dataArr })
      })
  }

  render() {
    if (this.props.user) {
      return (
        <div className={styles.wprapper}>
          <RaisedButton
            secondary
            label="Send permission request"
            style={{ marginBottom: '20px' }}
            onClick={() => { this.props.router.push('send-perm-req') }}
          />
          <div className={styles.gridWrapper}>
            <Paper className={styles.a}>My profile</Paper>
            <Paper className={styles.b}>My Patients</Paper>
            <Paper className={styles.c}>
              <div>
                <div>My Permissions</div>
                {this.state.permissions
                  .map(i => (<div key={i.to}>{i.toName} status: {i.status}</div>))}
              </div>
            </Paper>
          </div>
        </div>
      )
    }
    return null
  }
}

export default DoctorProfile

DoctorProfile.defaultProps = {
  perms: []
}

DoctorProfile.propTypes = {
  router: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired
}
