const createTransactions = () => (dispatch) => {
  axios.post('/api/v1/transactions').then((response) => {
    dispatch({
      type: 'CREATE_TRANSACTIONS',
      payload: response.data
    })
  }, (error) => {
    console.error('createTransactions error', error.response)
  })
}

const addTransaction = (txHash, patientId) => dispatch => (
  axios.put(`/api/v1/transactions/${patientId}`, { tx: txHash }).then((response) => {
    dispatch({
      type: 'UPDATE_TRANSACTIONS',
      payload: response.data
    })
    return response
  }, (error) => {
    console.error('addTransaction err', error.response)
    return error.response
  })
)

const fetchTransactions = () => (dispatch) => {
  dispatch({
    type: 'FETCH_TXS_ONLOAD'
  })
  axios.get('/api/v1/transactions').then((response) => {
    dispatch({
      type: 'FETCH_TXS_SUCCESS',
      payload: response.data
    })
  }, (error) => {
    dispatch({
      type: 'FETCH_TXS_ERROR',
      payload: error.response
    })
    console.error('fetchTransactions error', error.response)
  })
}

const updateTransactionsArr = txHash => (dispatch) => {
  dispatch({
    type: 'UPDATE_TXS_ARR',
    payload: txHash
  })
}

export { createTransactions, addTransaction, fetchTransactions, updateTransactionsArr }
