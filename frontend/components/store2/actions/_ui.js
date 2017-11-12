const toggleSidebar = () => (dispatch) => {
  dispatch({ type: 'TOGGLE_SIDEBAR' })
}

const showSnackBar = msg => (dispatch) => {
  dispatch({
    type: 'SHOW_SNACK_BAR',
    payload: msg
  })
}

const closeSnackBar = () => (dispatch) => {
  dispatch({ type: 'CLOSE_SNACK_BAR' })
}

export { toggleSidebar, closeSnackBar, showSnackBar }
