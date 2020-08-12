import axios from 'axios'

const addList = async (bid, listName) => {
  const res = await axios({
    method: 'POST',
    url: `/boards/${bid}/lists`,
    data: { listName },
    headers: { 'Content-type': 'application/json' }
  })

  return res
}

const updateListName = async (listName, bid, lid) => {
  const res = await axios({
    method: 'PUT',
    url: `/boards/${bid}/lists/${lid}`,
    data: { listName },
    headers: { 'Content-type': 'application/json' }
  })

  return res
}

const deleteList = async (bid, lid) => {
  const res = await axios({
    method: 'DELETE',
    url: `/boards/${bid}/lists/${lid}`
  })

  return res
}

const addCard = async (cardName, bid, lid) => {
  const res = await axios({
    method: 'POST',
    url: `/boards/${bid}/lists/${lid}/cards`,
    data: { cardName },
    headers: { 'Content-type': 'application/json' }
  })

  return res
}

export { addList, updateListName, deleteList, addCard }
