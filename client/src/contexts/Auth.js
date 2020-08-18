import React, { createContext, useReducer, useEffect } from 'react'
import { Reducer as AuthReducer } from '../reducers/Auth.js'
import axios from 'axios'

export const Context = createContext()

export const Provider = (props) => {
  const initialState = {
    isAuthenticated: false,
    user: null
  }

  const [authUser, authDispatch] = useReducer(AuthReducer, initialState)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: '/user'
        })

        if (res.status === 200) {
          authDispatch({
            type: 'LOAD_USER',
            user: res.data,
            isAuthenticated: true
          })
        } else {
          authDispatch({ type: 'LOAD_USER', user: {}, isAuthenticated: false })
        }
      } catch (err) {
        authDispatch({ type: 'LOAD_USER', user: {}, isAuthenticated: false })
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
