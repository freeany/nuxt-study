const Cookie = process.client ? require('js-cookie') : undefined
const COOKIE_NAME = 'user'

export const setCookie = user => {
  Cookie.set(COOKIE_NAME, JSON.stringify(user)) // saving token in cookie for server rendering
}

export const getCookie = user => {
  return Cookie && Cookie.get(COOKIE_NAME) // saving token in cookie for server rendering
}
