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
    default:
      return state
  }
}