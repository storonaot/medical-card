const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function doctors(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_DOCTORS_ONLOAD':
      return { ...state, loading: true }
    case 'FETCH_DOCTORS_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_DOCTORS_ERROR':
      return { ...state, loading: false, errors: action.payload }
    default:
      return state
  }
}
