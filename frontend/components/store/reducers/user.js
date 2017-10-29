const defaultState = null

export default function user(state = defaultState, action) {
  switch (action.type) {
    case 'CREATE_NEW_USER':
    case 'AUTH_USER':
      return action.payload
    case 'DESTROY_USER':
      return null
    default:
      return state
  }
}
