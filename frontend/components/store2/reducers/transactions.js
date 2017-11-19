const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function transactions(state = defaultState, action) {
  switch (action.type) {
    case 'CREATE_TRANSACTIONS':
      return { ...state, loading: false, data: action.payload }
    case 'UPDATE_TRANSACTIONS': {
      console.log('UPDATE_TRANSACTIONS', action.payload)
      return state
    }
    // case 'FETCH_DOCTORS_ONLOAD':
    //   return { ...state, loading: true }
    // case 'FETCH_DOCTORS_SUCCESS':
    //   return { ...state, loading: false, data: action.payload }
    // case 'FETCH_DOCTORS_ERROR':
    //   return { ...state, loading: false, errors: action.payload }
    default:
      return state
  }
}
