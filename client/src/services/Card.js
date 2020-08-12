import axios from 'axios'

const addCard = async (cardName, bid, lid) => {
  const res = await axios({
    method: 'POST',
    url: `/boards/${bid}/lists/${lid}/cards`,
    data: { cardName },
    headers: { 'Content-type': 'application/json' }
  })

  return res
}

const updateCard = async (cardName, bid, lid, cid) => {
  const res = await axios({
    method: 'PUT',
    url: `/boards/${bid}/lists/${lid}/cards/${cid}`,
    data: { cardName },
    headers: { 'Content-type': 'application/json' }
  })

  return res
}

const deleteCard = async (cardName, bid, lid, cid) => {
  const res = await axios({
    method: 'DELETE',
    url: `/boards/${bid}/lists/${lid}/cards/${cid}`

  })

  return res
}

export { addCard, updateCard, deleteCard }
