import { setCookie, deleteCookie, setPasswordToLS, removePasswordFromLS } from 'helpers'

const getUser = () => (dispatch) => {
  dispatch({
    type: 'FETCH_USER_ONLOAD'
  })

  return axios.get('/api/v1/user').then((response) => {
    dispatch({
      type: 'FETCH_USER_SUCCESS',
      payload: response.data
    })
    return response
  }, (error) => {
    dispatch({
      type: 'FETCH_USER_ERROR',
      payload: error.response
    })

    return error.response
  })
}

const signIn = data => (dispatch) => {
  dispatch({
    type: 'FETCH_USER_ONLOAD'
  })

  return axios.post('/api/v1/auth/signIn', data).then((response) => {
    dispatch({
      type: 'FETCH_USER_SUCCESS',
      payload: response.data
    })
    setCookie('user', JSON.stringify(response.data))
    setPasswordToLS(data.passPhrase)
    return response
  }, (error) => {
    dispatch({
      type: 'FETCH_USER_ERROR',
      payload: error.response
    })
    return error
  })
}

const signUp = data => (dispatch) => {
  dispatch({
    type: 'FETCH_USER_ONLOAD'
  })

  return axios.post('/api/v1/auth/signUp', data).then((response) => {
    dispatch({
      type: 'FETCH_USER_SUCCESS',
      payload: response.data
    })
    setCookie('user', JSON.stringify(response.data))
    setPasswordToLS(data.passPhrase)
    return response
  }, (error) => {
    dispatch({
      type: 'FETCH_USER_ERROR',
      payload: error.response
    })
    return error
  })
}

const signOut = () => dispatch => (
  axios.post('/api/v1/auth/signOut').then(() => {
    dispatch({
      type: 'USER_DESTROY'
    })
    removePasswordFromLS()
    deleteCookie('user')
  })
)

const updateUser = (userId, data) => dispatch => (
  axios.put(`/api/v1/user/${userId}`, data).then((response) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: response.data
    })
    return response
  }, (error) => {
    console.error('updateUser', error.response)
    return error
  })
)

// const sendPersonalInfo = (userId, data) => dispatch => (
//   axios.put(`/api/v1/user/${userId}`, data).then((response) => {
//     dispatch({
//       type: 'UPDATE_USER',
//       payload: response.data
//     })
//     return response
//   }, (error) => {
//     console.error('sendPersonalInfo', error.response)
//     return error
//   })
// )

export { getUser, signIn, signUp, signOut, updateUser }
