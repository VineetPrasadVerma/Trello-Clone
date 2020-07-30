import React, { createContext, useReducer, useEffect } from 'react'
import { Reducer as BoardReducer } from '../reducers/Board.js'
import axios from 'axios'

export const Context = createContext()

export const Provider = (props) => {
  const [boards, dispatch] = useReducer(BoardReducer, [])

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axios.get('boards/')
        dispatch({ type: 'GET_BOARDS', boards: res.data })
      } catch (err) {
        props.handleError("Can't get boards")
      }
    }

    fetchBoards()
  }, [])

  return (
    <Context.Provider value={{ boards, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}
