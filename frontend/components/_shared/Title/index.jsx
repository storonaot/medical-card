import classNames from 'classnames'
import styles from './styles'

const Title = ({ text, marginBottom }) => {
  const classList = classNames({
    [styles.marginBottom]: marginBottom,
    [styles.title]: true
  })

  return (<h2 className={classList}>{text}</h2>)
}
export default Title

Title.defaultProps = {
  marginBottom: true
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  marginBottom: PropTypes.bool
}
