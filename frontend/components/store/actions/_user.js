import firebase from 'libs/firebase'

const getPayloadata = responce => ({
  email: responce.email,
  emailVerified: responce.emailVerified,
  uid: responce.uid,
  firstName: null,
  lastName: null,
  dateOfBirth: null,
  photo: null,
  city: null
})

export const destroyUser = () => (dispatch) => {
  dispatch({ type: 'DESTROY_USER' })
  // firebase.auth().signOut().then(function() {
  //   // Sign-out successful.
  // }).catch(function(error) {
  //   // An error happened.
  // })
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
      return { type: 'success', responce }
    }, (error) => {
      console.error('createNewUser', error)
      return { type: 'error', error }
    })
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
      return responce
    }, (error) => {
      console.error('authUser', error)
      return { type: 'error', error }
    })
}

export const registerUserInApp = data => (dispatch) => {
  console.log('registerUserInApp', data)
  dispatch({
    type: 'REGISTER_USER_IN_APP',
    payload: data
  })
}
