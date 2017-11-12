import styles from './styles'

const StatusTag = ({ status }) => {
  const label = status === 'send' ? 'Отправлен' : 'Отказ'

  return (<div className={styles[status]}>{label}</div>)
}

export default StatusTag

StatusTag.propTypes = {
  status: PropTypes.oneOf(['send', 'cancel']).isRequired
}


// const btnBgColor = item => (item.status === 'send' ? '#a4c639' : 'rgb(208, 63, 22)')
