const defaultState = null

export default function user(state = defaultState, action) {
  switch (action.type) {
    case 'CREATE_NEW_USER':
    case 'AUTH_USER':
    case 'REGISTER_USER_IN_APP':
      return action.payload
    case 'DESTROY_USER':
      return null
    case 'UPDATE_USER':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
