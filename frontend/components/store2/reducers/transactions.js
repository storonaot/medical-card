const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function transactions(state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_TRANSACTIONS': {
      console.log('UPDATE_TRANSACTIONS', action.payload)
      return state
    }
    case 'FETCH_TXS_ONLOAD':
      return { ...state, loading: true }
    case 'FETCH_TXS_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_TXS_ERROR':
    case 'CREATE_TRANSACTIONS':
      return { ...state, loading: false, errors: action.payload }
    default:
      return state
  }
}
