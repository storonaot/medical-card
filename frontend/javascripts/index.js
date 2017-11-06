import 'css-wipe'
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { syncHistoryWithStore } from 'react-router-redux'
import App from 'App'
import Dashboard from 'Dashboard'
import PermissionRequest from 'PermissionRequest'

import Test from 'Test'
import Auth from 'Auth'
import Home from 'Home'
import reducer from 'store/reducers'
import { getDataFromLS } from 'helpers'
import '../stylesheets/default'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
const history = syncHistoryWithStore(hashHistory, store)

function requireAuth(nextState, replace) {
  if (!getDataFromLS()) {
    replace({ pathname: '/' })
  }
}

function isAutorized(nextState, replace) {
  if (getDataFromLS()) {
    replace({ pathname: 'dashboard' })
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Auth} onEnter={isAutorized} />
        <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
        <Route path="send-perm-req" component={PermissionRequest} onEnter={requireAuth} />
        <Route path="test" component={Test} onEnter={requireAuth} />
        <Route path="home" component={Home} onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
