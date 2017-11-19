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
    case 'UPDATE_DOCTORS_LIST':
      return { ...state, data: [...state.data, action.payload] }
    case 'DELETE_DOCTOR': {
      if (state.data) {
        const newArr = state.data.filter(item => item._doctor._id !== action.payload)
        return { ...state, data: newArr }
      }
      return state
    }
    default:
      return state
  }
}
