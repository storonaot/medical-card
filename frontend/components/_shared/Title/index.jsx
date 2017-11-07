import styles from './styles'

const Title = ({ text }) => (<h2 className={styles.title}>{text}</h2>)

export default Title

Title.propTypes = {
  text: PropTypes.string.isRequired
}
