import {
  GET_LISTS,
  ADD_LIST,
  SET_CARDS,
  UPDATE_LISTNAME,
  DELETE_LIST,
  ADD_CARD,
  UPDATE_CARDNAME,
  DELETE_CARD
} from '../contexts/actionType'

export const Reducer = (state, action) => {
  switch (action.type) {
    case GET_LISTS:
      return [...action.lists]

    case ADD_LIST:
      return [...state, action.list.newList]

    case DELETE_LIST:
      return state.filter((list) => list.id !== Number(action.list.lid))

    case UPDATE_LISTNAME:
      return state.map((list) => {
        if (list.id === Number(action.list.lid)) {
          list.name = action.list.listName
        }
        return list
      })

    case SET_CARDS:
      return state.map((list) => {
        if (list.id === action.listId) {
          list.cards = action.cards
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

    case UPDATE_CARDNAME:
      return state.map((list) => {
        if (list.id === Number(action.list.lid)) {
          list.cards.map((card) => {
            if (card.id === Number(action.card.cid)) {
              card.name = action.card.cardName
            }
            return card
          })
        }
        return list
      })

    case DELETE_CARD:
      return state.map((list) => {
        if (list.id === Number(action.list.lid)) {
          list.cards = list.cards.filter(
            (card) => card.id !== Number(action.card.cid)
          )
        }
        return list
      })

    default:
      return state
  }
}
