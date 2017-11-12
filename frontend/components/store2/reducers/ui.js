const defaultState = {
  sidebarOpened: false,
  snackBar: {
    show: false,
    msg: ''
  }
}

export default function ui(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpened: !state.sidebarOpened }
    case 'SHOW_SNACK_BAR': {
      const snackBar = { show: true, msg: action.payload }
      return { ...state, snackBar }
    }
    case 'CLOSE_SNACK_BAR': {
      const snackBar = { show: false, msg: '' }
      return { ...state, snackBar }
    }
    default:
      return state
  }
}
