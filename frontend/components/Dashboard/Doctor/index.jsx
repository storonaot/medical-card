import { Paper } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'
import firebase from 'libs/firebase'
import { forIn as _forIn } from 'lodash'
import { Row, Col } from 'react-flexbox-grid'
import styles from '../styles'

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
          <Row>
            <Col md={6} style={{ height: '100%' }}>
              <Paper className={styles.a}>My profile</Paper>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={12} style={{ marginBottom: 20 }}>
                  <Paper className={styles.b}>My Patients</Paper>
                </Col>
                <Col md={12}>
                  <Paper className={styles.c}>
                    <div>
                      <div>My Permissions</div>
                      {this.state.permissions
                        .map(i => (<div key={i.to}>{i.toName} status: {i.status}</div>))}
                    </div>
                  </Paper>
                </Col>
              </Row>
            </Col>
          </Row>
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
  router: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired
}
