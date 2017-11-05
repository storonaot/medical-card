import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import styles from '../styles'

const SignUp = ({ data, updateValue, signUp, disabledButton }) => (
  <div className={styles.controlsWrapper}>
    <TextField
      floatingLabelText="Email"
      fullWidth
      onChange={(e) => { updateValue('email', e.target.value) }}
      value={data.email}
    />
    <TextField
      floatingLabelText="Pass Phrase"
      fullWidth
      onChange={(e) => { updateValue('passPhrase', e.target.value) }}
      type="password"
      value={data.passPhrase}
    />
    <TextField
      floatingLabelText="Pass Phrase Repeat"
      fullWidth
      className={styles.lastField}
      onChange={(e) => { updateValue('passPhraseRepeat', e.target.value) }}
      type="password"
      value={data.passPhraseRepeat}
    />
    <Checkbox
      label="I'm a doctor"
      className={`${styles.checkbox} ${styles.lastField}`}
      checked={data.isDoctor}
      onCheck={() => { updateValue('isDoctor', !data.isDoctor) }}
    />
    <RaisedButton
      secondary
      label="Sign Up"
      onClick={signUp}
      disabled={disabledButton}
    />
  </div>
)

export default SignUp

SignUp.propTypes = {
  data: PropTypes.shape({}).isRequired,
  updateValue: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool.isRequired
}
