import { GET_BOARDS, ADD_BOARD } from '../contexts/actionType'

export const Reducer = (state, action) => {
  switch (action.type) {
    case GET_BOARDS:
      return [...action.boards]

    case ADD_BOARD:
      return [...state, action.board.newBoard]

    case 'DELETE_TASK':
      return state.filter((task) => task._id !== action.task.taskId)

    case 'UPDATE_TASK':
      return state.map((task) => {
        if (task._id === action.task.taskId) {
          task.name = action.task.name
        }
        return task
      })

    default:
      return state
  }
}
