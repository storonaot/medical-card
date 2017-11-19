const setPasswordToLS = (password) => {
  localStorage.setItem('MCpassword', password)
}

const getPasswordFromLS = () => (localStorage.getItem('MCpassword'))

const removePasswordFromLS = () => { localStorage.removeItem('MCpassword') }

export { setPasswordToLS, getPasswordFromLS, removePasswordFromLS }
