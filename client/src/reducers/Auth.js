import {
  LOAD_USER,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER
} from '../contexts/actionType'

export const Reducer = (state, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: action.isAuthenticated
      }

    case REGISTER_USER:
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true
      }

    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }

    default:
      return state
  }
}
