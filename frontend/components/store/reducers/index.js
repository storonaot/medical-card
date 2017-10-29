import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import ui from './ui'

export default combineReducers({
  routing: routerReducer,
  user,
  ui
})
