import { connect } from 'react-redux'
// import { signOut } from 'store2/actions'
import { Paper, Title } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'
import DoctorDashboard from './Doctor'
import PatientDashboard from './Patient'
import styles from './styles'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emptyPersonalInfoText:
        `Для продолжения работы с приложением необходимо заполнить
        Персональную информацию`
    }
  }

  render() {
    const { user, router } = this.props
    if (user.loading) return (<div>Loading...</div>)
    else if (user.errors) return (<div>Errors...</div>)

    if (!user.data.personalInfo) {
      return (
        <Paper className={styles.emptyPersonalInfo}>
          <Title text={this.state.emptyPersonalInfoText} />
          <RaisedButton
            secondary
            label="Fill Personal Info"
            onClick={() => { router.push('profile') }}
          />
        </Paper>
      )
    }

    if (user.data.isDoctor) {
      return (<DoctorDashboard router={this.props.router} user={user.data} />)
    }

    return (<PatientDashboard user={user.data} />)
  }
}

export default connect(
  (state, ownProps) => ({
    user: state.user,
    ownProps
  })
  // dispatch => ({
  //   onSignOut: () => { dispatch(signOut()) }
  // })
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
