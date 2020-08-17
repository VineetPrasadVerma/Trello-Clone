import React, { createContext, useReducer, useEffect } from 'react'
import { Reducer as AuthReducer } from '../reducers/Auth.js'
import axios from 'axios'

export const Context = createContext()

export const Provider = (props) => {
  const initialState = {
    accessToken: window.localStorage.getItem('accessToken'),
    isAuthenticated: false,
    user: null,
    authError: null
  }

  const [authUser, authDispatch] = useReducer(AuthReducer, initialState)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: '/',
          headers: {
            'Content-type': 'application/json',
            'x-auth-token': window.localStorage.getItem('accessToken')
          }
        })
        authDispatch({ type: 'LOAD_USER', user: res.data })
      } catch (err) {
        authDispatch({ type: 'AUTH_ERROR', message: 'Can\'t Find User' })
      }
    }

    loadUser()
  }, [])

  return (
    <Context.Provider value={{ authUser, authDispatch }}>
      {props.children}
    </Context.Provider>
  )
}
