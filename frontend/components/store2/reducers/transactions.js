const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function transactions(state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_TRANSACTIONS': {
      return state
    }
    case 'FETCH_TXS_ONLOAD':
      return { ...state, loading: true }
    case 'FETCH_TXS_SUCCESS':
    case 'CREATE_TRANSACTIONS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_TXS_ERROR':
      return { ...state, loading: false, errors: action.payload }
    case 'UPDATE_TXS_ARR':
      return { ...state, data: action.payload }
    default:
      return state
  }
}
