import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import styles from '../styles'

const SignIn = ({ data, updateValue }) => (
  <div className={styles.controlsWrapper}>
    <TextField
      floatingLabelText="Login"
      fullWidth
      onChange={(e) => { updateValue('login', e.target.value) }}
      value={data.login}
    />
    <TextField
      floatingLabelText="Pass Phrase"
      className={styles.lastField}
      fullWidth
      onChange={(e) => { updateValue('passPhrase', e.target.value) }}
      value={data.passPhrase}
    />
    <RaisedButton secondary label="Sign In" />
  </div>
)

export default SignIn

SignIn.propTypes = {
  data: PropTypes.shape({}).isRequired,
  updateValue: PropTypes.func.isRequired
}
