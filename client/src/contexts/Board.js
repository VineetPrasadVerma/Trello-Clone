import React, { createContext, useReducer, useEffect, useContext } from 'react'

import { Context as AuthContext } from '../contexts/Auth'
import { Reducer as BoardReducer } from '../reducers/Board.js'

import axios from 'axios'

export const Context = createContext()

export const Provider = (props) => {
  const { authUser, authDispatch } = useContext(AuthContext)
  const [boards, boardsDispatch] = useReducer(BoardReducer, [])

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axios.get('/boards/')
        boardsDispatch({ type: 'GET_BOARDS', boards: res.data })
      } catch (err) {
        if (err.response.status === 401) {
          authDispatch({ type: 'LOGOUT_USER' })
        } else {
          props.handleError("Can't get boards")
        }
      }
    }

    fetchBoards()
  }, [])

  return (
    <Context.Provider
      value={{ authUser, authDispatch, boards, boardsDispatch }}
    >
      {props.children}
    </Context.Provider>
  )
}
