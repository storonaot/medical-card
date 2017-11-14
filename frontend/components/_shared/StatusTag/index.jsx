import styles from './styles'

const StatusTag = ({ status }) => {
  let label
  switch (status) {
    case 'send':
      label = 'Отправлен'
      break
    case 'cancel':
      label = 'Отказано'
      break
    default:
      label = 'Одобрено'
      break
  }

  return (<div className={styles[status]}>{label}</div>)
}

export default StatusTag

StatusTag.propTypes = {
  status: PropTypes.oneOf(['send', 'cancel', 'success']).isRequired
}
