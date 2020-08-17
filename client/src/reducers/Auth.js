import {
  LOAD_USER,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_ERROR
} from '../contexts/actionType'

export const Reducer = (state, action) => {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, user: action.user }

    case REGISTER_USER:
    case LOGIN_USER:
      window.localStorage.setItem('accessToken', action.accessToken)
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        isAuthenticated: true
      }

    case AUTH_ERROR:
    case LOGOUT_USER:
      window.localStorage.removeItem('accessToken')
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        user: null,
        authError: action.message
      }

    default:
      return state
  }
}
