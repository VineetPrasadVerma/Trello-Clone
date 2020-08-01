import React, { createContext, useReducer, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Reducer as ListReducer } from '../reducers/List.js'

import axios from 'axios'

export const Context = createContext()

export const Provider = (props) => {
  const [lists, listsDispatch] = useReducer(ListReducer, [])
  const { bid } = useParams()

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get(`/boards/${bid}/lists/`)
        listsDispatch({ type: 'GET_LISTS', lists: res.data })
      } catch (err) {
        props.handleError("Can't get Lists")
      }
    }

    fetchLists()
  }, [])

  return (
    <Context.Provider value={{ lists, listsDispatch }}>
      {props.children}
    </Context.Provider>
  )
}
