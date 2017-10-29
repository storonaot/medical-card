import firebaseConfig from 'libs/firebase/config.json'

// const key = 'medicalCard'
//
// const setUserIdToLS = (uid) => {
//   localStorage.setItem(key, uid)
// }
//
// const getUserIdFromLS = () => (localStorage.getItem(key))
//
const removeUserIdFromLS = () => {
  localStorage.removeItem(firebaseConfig.apiKey)
}

const getDataFromLS = () => {
  const { apiKey } = firebaseConfig
  const key = `firebase:authUser:${apiKey}:[DEFAULT]`
  // JSON.parse(localStorage.getItem("myKey"))
  return JSON.parse(localStorage.getItem(key))
}

export { getDataFromLS, removeUserIdFromLS }
