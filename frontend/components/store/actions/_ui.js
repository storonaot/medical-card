const toggleSidebar = () => (dispatch) => {
  console.log('toggleSidebar', toggleSidebar)
  dispatch({ type: 'TOGGLE_SIDEBAR' })
}

export default toggleSidebar
