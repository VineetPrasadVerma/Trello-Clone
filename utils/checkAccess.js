const validateBoardAndUser = async (pool, userId, boardId) => {
  let board = await pool.query(`SELECT * FROM boards WHERE id=${boardId};`)
  if (board.rowCount === 0) {
    return { status: 404, message: `Can't find board with id ${boardId}` }
  }

  board = await pool.query(
    `SELECT * FROM boards WHERE id=${boardId} and user_id=${userId};`
  )

  if (board.rowCount === 0) {
    return { status: 403, message: 'Not Authorized User' }
  }
  return null
}

const validateListAndBoard = async (pool, listId, boardId) => {
  let list = await pool.query(
    `SELECT * FROM lists WHERE id=${listId} and board_id=${boardId};`
  )

  if (list.rowCount === 0) {
    list = await pool.query(`SELECT * FROM lists WHERE id=${listId};`)

    if (list.rowCount === 0) {
      return { status: 404, message: `Can't find list with id ${listId}` }
    }

    return {
      status: 404,
      message: `Can't find list with id ${listId} in board with id ${boardId}`
    }
  }

  return null
}

const validateCardAndList = async (pool, cardId, listId) => {
  let card = await pool.query(
    `SELECT ${cardId} = ANY(cards) AS card_found from lists where id=${listId};`
  )
  if (!card.rows[0].card_found) {
    card = await pool.query(`SELECT * FROM cards WHERE id=${cardId};`)

    if (card.rowCount === 0) {
      return { status: 404, message: `Can't find card with id ${cardId}` }
    }

    return {
      status: 404,
      message: `Can't find card with id ${cardId} in list with id ${listId}`
    }
  }
  return null
}

module.exports = {
  validateBoardAndUser,
  validateListAndBoard,
  validateCardAndList
}
