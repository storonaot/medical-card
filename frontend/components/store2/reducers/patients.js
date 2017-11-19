const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function patients(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_PATIENTS_ONLOAD':
      return { ...state, loading: true }
    case 'FETCH_PATIENTS_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_PATIENTSS_ERROR':
      return { ...state, loading: false, errors: action.payload }
    default:
      return state
  }
}
