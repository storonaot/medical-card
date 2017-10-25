import 'css-wipe'
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import App from 'App'
// import Home from 'Home'
import Test from 'Test'
import Auth from 'Auth'
import '../stylesheets/default'

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Auth} />
      <Route path="test" component={Test} />
    </Route>
  </Router>,
  document.getElementById('root')
)
