import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from './ui'
import user from './user'

export default combineReducers({
  routing: routerReducer,
  ui,
  user
})