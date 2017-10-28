import 'css-wipe'
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { syncHistoryWithStore } from 'react-router-redux'
import App from 'App'
import Test from 'Test'
import Auth from 'Auth'
import reducer from 'store/reducers'
// import axios from 'axios'
import '../stylesheets/default'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
const history = syncHistoryWithStore(hashHistory, store)

// axios.defaults.baseURL = 'http://localhost:3000/'
// axios.get('/').then((responce) => { console.log('responce', responce.data) })
// const data = {
//   login: 'login',
//   email: 'email',
//   passPhrase: 'passPhrase',
//   isDoctor: false
// }
// axios.post('/login', data).then((responce) => { console.log('responce', responce.data) })


render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Auth} />
        <Route path="test" component={Test} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
