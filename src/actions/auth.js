export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";

export const login = (accesstoken,searchTab) => ({
  type: LOGIN,
  accesstoken,
  searchTab
})
export const logOut = () => ({
  type: LOGOUT
})
export const getUser = username => ({
  type: GET_USER,
  username
})
