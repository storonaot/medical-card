import 'css-wipe'
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { syncHistoryWithStore } from 'react-router-redux'
import App from 'App'
import Auth from 'Auth'
import Dashboard from 'Dashboard'
import Profile from 'Profile'
import Home from 'Home'
import SendPermReq from 'SendPermReq'
import PermReqs from 'PermReqs'
import MedicalCard from 'MedicalCard'
import { getCookie } from 'helpers'

import reducer from 'store2/reducers'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
const history = syncHistoryWithStore(hashHistory, store)

function notAutorized(nextState, replace) {
  const isAuthPath = nextState.location.pathname === '/auth'
  if (!getCookie('user') && !isAuthPath) replace({ pathname: '/auth' })
}

function isAutorized(nextState, replace) {
  if (getCookie('user')) replace({ pathname: '/dashboard' })
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="auth" component={Auth} onEnter={isAutorized} />
        <Route path="dashboard" component={Dashboard} onEnter={notAutorized} />
        <Route path="profile" component={Profile} onEnter={notAutorized} />
        <Route path="send-perm-req" component={SendPermReq} onEnter={notAutorized} />
        <Route path="perm-reqs" component={PermReqs} onEnter={notAutorized} />
        <Route path="medical-card/:id" component={MedicalCard} onEnter={notAutorized} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
