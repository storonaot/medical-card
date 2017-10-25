import 'css-wipe'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import routes from './routes'

console.log('Router', Router)
console.log('hashHistory', hashHistory)

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('root')
)
