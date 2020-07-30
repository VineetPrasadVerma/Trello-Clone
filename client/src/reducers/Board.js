import { GET_BOARDS } from '../contexts/actionType'

export const Reducer = (state, action) => {
  switch (action.type) {
    case GET_BOARDS:
      return [...action.boards]

    case 'ADD_TASK':
      return [...state, { _id: action.task.taskId, name: action.task.name }]

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
