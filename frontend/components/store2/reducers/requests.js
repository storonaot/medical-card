import { updateObjInArr } from 'helpers'

const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function requests(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_PERMISSION_REQUESTS_ONLOAD':
      return { ...state, loading: true }
    case 'FETCH_PERMISSION_REQUESTS_SUCCESS':
      return { ...state, loading: false, data: _.reverse(action.payload) }
    case 'FETCH_PERMISSION_REQUESTS_ERROR':
      return { ...state, loading: false, errors: action.payload }
    case 'REMOVE_REQUEST':
    case 'DELETE_REQUEST_FROM_STORE': {
      const requestId = action.payload
      const newArr = _.remove(state.data, item => item._id !== requestId)
      return { ...state, data: newArr }
    }
    case 'UPDATE_REQUEST_STATUS':
    case 'UPDATE_REQUEST_STATUS_IN_STORE': {
      if (state.data) {
        const { status, _id } = action.payload
        return { ...state, data: updateObjInArr(state.data, { _id, status }) }
      }
      return state
    }
    case 'ADD_NEW_REQEST': {
      const newArr = [...state.data, action.payload]
      return { ...state, data: newArr }
    }
    default:
      return state
  }
}
