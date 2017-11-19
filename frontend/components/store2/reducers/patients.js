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
    case 'UPDATE_PATIENTS_LIST':
      return { ...state, data: [...state.data, action.payload] }
    case 'DELETE_PATIENT_FROM_LIST': {
      if (state.data) {
        const newArr = state.data.filter(item => item._id !== action.payload)
        return { ...state, data: newArr }
      }
      return state
    }
    default:
      return state
  }
}
