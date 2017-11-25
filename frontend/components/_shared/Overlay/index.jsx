import styles from './styles'

const Overlay = ({ isActive, content }) => {
  if (isActive) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>{content}</div>
      </div>
    )
  }
  return null
}

export default Overlay

Overlay.propTypes = {
  isActive: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired
}
