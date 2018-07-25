export default (state={},action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLogin: false,
        loginMessage: 'loading',
      }
    case "LOGIN_SUCCESS":
      return {
          ...state,
        isLogin: true,
        loginMessage: 'success',
        userInfo: action.data
      }
    case "LOGOUT":
      return {
        ...state,
        isLogin: false,
        loginMessage: null,
        userInfo: null
      }
    case "LOGIN_ERROR":
      return {
        ...state,
        isLogin: false,
        userInfo: null,
        loginMessage: 'failure'
      }
    case "GET_USER_SUCCESS":
       return{
         ...state,
         userDetail: {...action.data,status:true}
       }
    case "GET_USER_ERROR":
      return{
        ...state,
        userDetail: {status:false}
      }
    default:
      return state
  }
}
