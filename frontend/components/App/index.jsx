import { Header } from '_shared'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import styles from './styles'

const App = ({ children }) => (
  <MuiThemeProvider>
    <div className={styles.app}>
      <Header />
      {children}
    </div>
  </MuiThemeProvider>
)

export default App

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
}
