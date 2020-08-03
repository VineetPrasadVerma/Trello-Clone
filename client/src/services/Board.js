import axios from 'axios'

const addBoard = async (boardName) => {
  const res = await axios({
    method: 'POST',
    url: '/boards',
    data: { boardName },
    headers: { 'Content-type': 'application/json' }
  })

  return res
}

const updateBoardName = async (boardName, bid) => {
  const res = await axios({
    method: 'PUT',
    url: `/boards/${bid}`,
    data: { boardName },
    headers: { 'Content-type': 'application/json' }
  })

  return res
}

const deleteBoard = async (bid) => {
  const res = await axios({
    method: 'DELETE',
    url: `boards/:${bid}`
  })

  return res
}

export { addBoard, updateBoardName, deleteBoard }
