import RaisedButton from 'material-ui/RaisedButton'
import styles from './styles'

const emptyObj = {
  patients: {
    msg: 'У вас пока нет ни одного пациента.',
    buttonTxt: 'Отправить запрос'
  },
  permReq: {
    msg: 'У вас пока нет ни одного запроса.',
    buttonTxt: 'Отправить запрос'
  }
}

const Empty = ({ type, btnClick }) => {
  const btnComp = btnClick
    ? (<RaisedButton onClick={btnClick} secondary label={emptyObj[type].buttonTxt} />)
    : null

  return (
    <div className={styles.empty}>
      <p className={styles.message}>{emptyObj[type].msg}</p>
      {btnComp}
    </div>
  )
}

export default Empty

Empty.defaultProps = {
  type: 'patients',
  btnClick: null
}

Empty.propTypes = {
  type: PropTypes.oneOf(['patients', 'permReq']),
  btnClick: PropTypes.func
}
