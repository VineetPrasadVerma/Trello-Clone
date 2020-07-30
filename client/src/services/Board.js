import axios from 'axios'

const addBoard = async (boardName) => {
  const res = await axios({
    method: 'POST',
    url: 'boards/',
    data: { boardName },
    headers: { 'Content-type': 'application/json' }
  })

  return res
}

export { addBoard }
