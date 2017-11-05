import firebase from 'libs/firebase'

const getPayloadata = responce => ({
  email: responce.email,
  emailVerified: responce.emailVerified,
  uid: responce.uid
  // firstName: null,
  // lastName: null,
  // dateOfBirth: null,
  // photo: null,
  // city: null
})

export const destroyUser = () => (dispatch) => {
  firebase.auth().signOut().then(() => {
    dispatch({ type: 'DESTROY_USER' })
  }, (error) => {
    console.error('destroyUser error', error)
  })
}

export const createNewUser = data => (dispatch) => {
  const { email, passPhrase, isDoctor } = data
  return firebase.auth().createUserWithEmailAndPassword(email, passPhrase)
    .then((responce) => {
      const payloadData = {
        ...getPayloadata(responce),
        isDoctor
      }
      dispatch({
        type: 'CREATE_NEW_USER',
        payload: payloadData
      })
      firebase.database().ref(`users/${responce.uid}`).set(payloadData)
      return { type: 'success', uid: responce.uid }
    }, error => ({ type: 'error', error }))
}

export const authUser = data => (dispatch) => {
  const { email, passPhrase } = data
  return firebase.auth().signInWithEmailAndPassword(email, passPhrase)
    .then((responce) => {
      const userId = responce.uid
      firebase.database().ref(`/users/${userId}`).once('value').then((snapshot) => {
        dispatch({
          type: 'AUTH_USER',
          payload: snapshot.val()
        })
      })
      return { type: 'success', uid: responce.uid }
    }, error => ({ type: 'error', error }))
}

export const registerUserInApp = data => (dispatch) => {
  dispatch({
    type: 'REGISTER_USER_IN_APP',
    payload: data
  })
}

export const updateUser = (uid, data) => (dispatch) => {
  firebase.database().ref(`users/${uid}`).update(data).then(() => {
    dispatch({
      type: 'UPDATE_USER',
      payload: data
    })
  }, (error) => {
    console.error(error)
  })
}
