import {
  GET_LISTS,
  ADD_LIST,
  SET_CARDS,
  UPDATE_LISTNAME,
  DELETE_LIST,
  ADD_CARD
} from '../contexts/actionType'

export const Reducer = (state, action) => {
  switch (action.type) {
    case GET_LISTS:
      return [...action.lists]

    case ADD_LIST:
      return [...state, action.list.newList]

    case SET_CARDS:
      return state.map((list) => {
        if (list.id === action.listId) {
          list.cards = action.cards
        }
        return list
      })

    case DELETE_LIST:
      return state.filter((task) => task._id !== action.task.taskId)

    case UPDATE_LISTNAME:
      return state.map((list) => {
        if (list.id === Number(action.list.lid)) {
          list.name = action.list.listName
        }
        return list
      })

    case ADD_CARD:
      return state.map((list) => {
        if (list.id === Number(action.list.lid)) {
          list.cards = [...list.cards, action.card.newCard]
          list.card_ids = [...list.card_ids, Number(action.card.newCard.id)]
        }
        return list
      })

    default:
      return state
  }
}
