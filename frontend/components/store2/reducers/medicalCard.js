const defaultState = {
  loading: true,
  data: null,
  errors: null
}

export default function medicalCard(state = defaultState, action) {
  switch (action.type) {
    case 'FETCH_MEDICAL_CARD_ONLOAD':
      return { ...state, loading: true }
    case 'FETCH_MEDICAL_CARD_SUCCESS':
      return { ...state, loading: false, data: action.payload }
    case 'FETCH_MEDICAL_CARD_ERROR':
      return { ...state, loading: false, errors: action.payload }
    default:
      return state
  }
}
