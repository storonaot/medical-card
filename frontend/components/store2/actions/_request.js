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

const removeRequest = requestId => dispatch => (
  axios.delete(`/api/v1/request/${requestId}`).then((response) => {
    dispatch({
      type: 'REMOVE_REQUEST',
      payload: requestId
    })
    console.log('response', response)
    return response
  }, (error) => {
    console.error('error', error.response)
    return error.response
  })
)

export { fetchRequests, removeRequest }
