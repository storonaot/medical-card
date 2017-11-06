const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function user(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_USER_ONLOAD':
      return { ...state, loading: true }
    case 'FETCH_USER_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_USER_ERROR':
      return { loading: false, data: null, errors: action.payload }
    case 'USER_DESTROY':
      return { loading: true, data: null, errors: null }
    default:
      return state
  }
}
