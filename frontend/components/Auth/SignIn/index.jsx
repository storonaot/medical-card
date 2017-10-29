import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import styles from '../styles'

const SignIn = ({ data, updateValue, signIn, disabledButton }) => (
  <div className={styles.controlsWrapper}>
    {/* <TextField
      floatingLabelText="Login"
      fullWidth
      onChange={(e) => { updateValue('login', e.target.value) }}
      value={data.login}
    /> */}
    <TextField
      floatingLabelText="Email"
      fullWidth
      onChange={(e) => { updateValue('email', e.target.value) }}
      value={data.email}
    />
    <TextField
      floatingLabelText="Pass Phrase"
      className={styles.lastField}
      fullWidth
      type="password"
      onChange={(e) => { updateValue('passPhrase', e.target.value) }}
      value={data.passPhrase}
    />
    <RaisedButton
      secondary
      label="Sign In"
      onClick={signIn}
      disabled={disabledButton}
    />
  </div>
)

export default SignIn

SignIn.propTypes = {
  data: PropTypes.shape({}).isRequired,
  updateValue: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool.isRequired
}
