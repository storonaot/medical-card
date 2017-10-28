const defaultState = null

export default function user(state = defaultState, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'DESTROY_USER':
      return null
    default:
      return state
  }
}
