const getCookie = (name) => {
  const reg = name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${reg}=([^;]*)`
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}


const setCookie = (name, value, options) => {
  const opts = options || {}
  let expires = opts.expires
  let val = value

  if (typeof expires === 'number' && expires) {
    const d = new Date()
    const expMul = expires * 1000
    d.setTime(d.getTime() + expMul)
    expires = d
    opts.expires = d
  }
  if (expires && expires.toUTCString) {
    opts.expires = expires.toUTCString()
  }

  val = encodeURIComponent(value)

  let updatedCookie = `${name}=${val}`

  _.forIn(options, (propValue, key) => {
    updatedCookie += `;${key}`
    if (propValue !== true) {
      updatedCookie += `=${propValue}`
    }
  })

  document.cookie = updatedCookie
}

const deleteCookie = (name) => {
  setCookie(name, '', {
    expires: -1
  })
}

export { setCookie, getCookie, deleteCookie }
