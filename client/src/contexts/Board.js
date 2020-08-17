import React, { createContext, useReducer, useEffect } from 'react'
import { Reducer as BoardReducer } from '../reducers/Board.js'
import axios from 'axios'

export const Context = createContext()

export const Provider = (props) => {
  const [boards, boardsDispatch] = useReducer(BoardReducer, [])

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: '/boards/'
          // headers: { 'x-auth-token': window.localStorage.getItem('accessToken') }
        })

        boardsDispatch({ type: 'GET_BOARDS', boards: res.data })
      } catch (err) {
        console.log('Boards', err)
        props.handleError("Can't get boards")
      }
    }

    fetchBoards()
  }, [])

  return (
    <Context.Provider value={{ boards, boardsDispatch }}>
      {props.children}
    </Context.Provider>
  )
}
