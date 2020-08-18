import React, { createContext, useReducer, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { Reducer as ListReducer } from '../reducers/List.js'
import { Context as AuthContext } from '../contexts/Auth'

import axios from 'axios'

export const Context = createContext()

export const Provider = (props) => {
  const { authUser, authDispatch } = useContext(AuthContext)
  const [lists, listsDispatch] = useReducer(ListReducer, [])
  const { bid } = useParams()

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get(`/boards/${bid}/lists/`)
        listsDispatch({ type: 'GET_LISTS', lists: res.data })
      } catch (err) {
        if (err.response.status === 401) {
          authDispatch({ type: 'LOGOUT_USER' })
        } else {
          props.handleError("Can't get Lists")
        }
      }
    }

    fetchLists()
  }, [])

  return (
    <Context.Provider value={{ authUser, lists, listsDispatch }}>
      {props.children}
    </Context.Provider>
  )
}
