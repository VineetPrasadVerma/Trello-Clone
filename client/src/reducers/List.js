import { GET_LISTS, ADD_LIST } from '../contexts/actionType'

export const Reducer = (state, action) => {
  switch (action.type) {
    case GET_LISTS:
      return [...action.lists]

    case ADD_LIST:
      return [...state, action.list.newList]

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
