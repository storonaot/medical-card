const fetchRequests = account => (dispatch) => {
  dispatch({
    type: 'FETCH_PERMISSION_REQUESTS_ONLOAD'
  })

  axios.get(`/api/v1/request/list/${account}`).then((response) => {
    dispatch({
      type: 'FETCH_PERMISSION_REQUESTS_SUCCESS',
      payload: response.data
    })
  }, (error) => {
    dispatch({
      type: 'FETCH_PERMISSION_REQUESTS_ERROR',
      payload: error.response
    })
  })
}

export default fetchRequests
