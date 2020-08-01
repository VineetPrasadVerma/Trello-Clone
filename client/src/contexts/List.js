import React, { createContext, useReducer, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { Reducer as ListReducer } from '../reducers/List.js'
import { Context as BoardContext } from './Board'

import axios from 'axios'

export const Context = createContext()

export const Provider = (props) => {
  const [lists, dispatch] = useReducer(ListReducer, [])
  const { boards } = useContext(BoardContext)
  const { bid } = useParams()

  const board = boards.filter(board => board.id === Number(bid))[0]

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get(`/boards/${bid}/lists/`)
        dispatch({ type: 'GET_LISTS', lists: res.data })
      } catch (err) {
        props.handleError("Can't get Lists")
      }
    }

    fetchLists()
  }, [])

  return (
    <Context.Provider value={{ board, lists, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}
