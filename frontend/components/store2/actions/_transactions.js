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

const addTransaction = (txHash, patientId) => (dispatch) => {
  axios.put(`/api/v1/transactions/${patientId}`, { tx: txHash }).then((response) => {
    dispatch({
      type: 'UPDATE_TRANSACTIONS',
      payload: response.data
    })
  }, (error) => {
    console.error('addTransaction err', error.response)
  })
}

const fetchTransactions = () => {}

export { createTransactions, addTransaction, fetchTransactions }
