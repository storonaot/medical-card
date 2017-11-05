import { Paper as MuiPaper } from 'material-ui'
import classNames from 'classnames'
import styles from './styles'

const Paper = ({ children, className, style }) => {
  const classList = classNames({
    [className]: className,
    [styles.paper]: true
  })
  return (
    <MuiPaper className={classList} zDepth={1} style={style}>
      {children}
    </MuiPaper>
  )
}

export default Paper

Paper.defaultProps = {
  className: null,
  style: null
}

Paper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  style: PropTypes.shape({})
}
