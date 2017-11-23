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
    return response
  }, (error) => {
    console.error('error', error.response)
    return error.response
  })
)

const deleteRequestFromStore = requestId => (dispatch) => {
  dispatch({
    type: 'DELETE_REQUEST_FROM_STORE',
    payload: requestId
  })
}

const updateRequestStatusInStore = request => (dispatch) => {
  dispatch({
    type: 'UPDATE_REQUEST_STATUS_IN_STORE',
    payload: request
  })
}

const updateRequestStatus = (requestId, status) => dispatch => (
  axios.put(`/api/v1/request/${requestId}`, status).then((response) => {
    dispatch({
      type: 'UPDATE_REQUEST_STATUS',
      payload: response.data
    })

    return response
  }, (error) => {
    console.error('error', error.response)
    return error.response
  })
)

const addNewRequest = request => (dispatch) => {
  dispatch({
    type: 'ADD_NEW_REQEST',
    payload: request
  })
}

export {
  fetchRequests, removeRequest, updateRequestStatus,
  addNewRequest, deleteRequestFromStore, updateRequestStatusInStore
}
