import { connect } from 'react-redux'
// import { signOut } from 'store2/actions'
import { Paper, Title } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'
// import { web3 } from 'libs'
import { encrypt, decrypt } from 'helpers'
import DoctorDashboard from './Doctor'
import PatientDashboard from './Patient'
import styles from './styles'

// web3.eth.personal.unlockAccount('0xC79a76c67c202B404Cee883447c4be7933e37704', '123456789')
//
// web3.eth.getBalance('0x2a55c6c455C47BB33Cd7F5cFF166e65ce2345A9b').then(console.log)

// 0x57a9718e07251ee03dcc7420c650dbda073d32ab643da4134d9114f80987292f

const identity = {
  privateKey: '0x57a9718e07251ee03dcc7420c650dbda073d32ab643da4134d9114f80987292f',
  publicKey: '0x2a55c6c455C47BB33Cd7F5cFF166e65ce2345A9b'
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emptyPersonalInfoText:
        `Для продолжения работы с приложением необходимо заполнить
        Персональную информацию`,
      encMsg: null,
      decMsg: null
    }

    this.sendTx = this.sendTx.bind(this)
    this.encryptMsg = this.encryptMsg.bind(this)
    this.decryptMsg = this.decryptMsg.bind(this)
  }

  sendTx() {
    const transactionObject = {
      from: '0xC79a76c67c202B404Cee883447c4be7933e37704',
      to: '0x2a55c6c455C47BB33Cd7F5cFF166e65ce2345A9b',
      value: 1000000000000000000
    }
    web3.eth.sendTransaction(transactionObject, (error, res) => {
      console.log('sendTransaction error', error)
      console.log('sendTransaction res', res)
    })
  }

  encryptMsg() {
    const encMsg = encrypt(identity, 'Hello encrypt')
    this.setState({ encMsg })
  }

  decryptMsg() {
    const decMsg = decrypt(identity, this.state.encMsg)
    this.setState({ decMsg })
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

    return (
      <div>
        <button onClick={this.sendTx}>Send Transaction</button>
        <button onClick={this.encryptMsg}>Encrypt Msg</button>
        <div>encMsg: {this.state.encMsg}</div>
        <button onClick={this.decryptMsg}>Decrypt Msg</button>
        <div>decMsg: {this.state.decMsg}</div>
        <PatientDashboard user={user.data} />
      </div>
    )
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
