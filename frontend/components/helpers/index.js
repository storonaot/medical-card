import { hasEmptyValues, tmp } from './objOperations'
import { getDataFromLS, removeUserIdFromLS } from './localStore.js'
import { setCookie, getCookie, deleteCookie } from './cookie'

export {
  hasEmptyValues, tmp,
  getDataFromLS, removeUserIdFromLS,
  setCookie, getCookie, deleteCookie
}
