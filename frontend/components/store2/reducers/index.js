import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from './ui'
import user from './user'
import requests from './requests'
import doctors from './doctors'
import patients from './patients'
import medicalCard from './medicalCard'

export default combineReducers({
  routing: routerReducer,
  ui,
  user,
  requests,
  doctors,
  patients,
  medicalCard
})
