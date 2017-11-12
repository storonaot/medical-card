import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles'

const emptyObj = {
  patients: {
    msg: 'You dont have any patients yet.',
    buttonTxt: 'Send permission request'
  },
  permReq: {
    msg: 'You dont have any permission requests.',
    buttonTxt: 'Send permission request'
  }
}

const Empty = ({ type, btnClick }) => (
  <div className={styles.empty}>
    <p className={styles.message}>{emptyObj[type].msg}</p>
    <RaisedButton onClick={btnClick} secondary label={emptyObj[type].buttonTxt} />
  </div>
)

export default Empty

Empty.defaultProps = {
  type: 'patients'
}

Empty.propTypes = {
  type: PropTypes.oneOf(['patients', 'permReq']),
  btnClick: PropTypes.func.isRequired
}
