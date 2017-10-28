import firebase from 'firebase'
import config from './config.json'

export default firebase.initializeApp(config.firebase)
