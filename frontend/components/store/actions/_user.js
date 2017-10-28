export const setUser = data => (dispatch) => {
  dispatch({
    type: 'SET_USER',
    payload: data
  })
}

export const destroyUser = () => (dispatch) => {
  dispatch({ type: 'DESTROY_USER' })
}
