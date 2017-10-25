import { Link } from 'react-router'
import styles from './styles'

const handleClick = () => { console.log('click') }

const App = ({ children }) => (
  <div className={styles.app}>
    Hello REACT
    <button onClick={handleClick}>Click</button>
    <Link to="/">Home</Link>
    <Link to="test">test</Link>
    {children}
  </div>
)

export default App

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
}
