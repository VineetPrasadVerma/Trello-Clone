import { GET_BOARDS, ADD_BOARD, UPDATE_BOARD, DELETE_BOARD } from '../contexts/actionType'

export const Reducer = (state, action) => {
  switch (action.type) {
    case GET_BOARDS:
      return [...action.boards]

    case ADD_BOARD:
      return [...state, action.board.newBoard]

    case DELETE_BOARD:
      return state.filter(board => board.id !== Number(action.board.bid))

    case UPDATE_BOARD:
      return state.map(board => {
        if (board.id === Number(action.board.bid)) {
          board.name = action.board.boardName
        }
        return board
      })

    default:
      return state
  }
}
