const defaultState = {
  sidebarOpened: false,
  logged: false
}

export default function ui(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpened: !state.sidebarOpened }
    default:
      return state
  }
}
