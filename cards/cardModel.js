const pool = require('../config')

const {
  validateBoardAndUser,
  validateListAndBoard,
  validateCardAndList
} = require('../utils/checkAccess')

const getCards = async (req, res) => {
  const userId = Number(req.user.userId)
  const listId = Number(req.params.lid)
  const boardId = Number(req.params.bid)

  try {
    let result = await validateBoardAndUser(pool, userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    result = await validateListAndBoard(pool, listId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    const cardsArr = await pool.query(
      `SELECT card_ids FROM lists WHERE id=${listId};`
    )

    let cards = { rows: [] }
    if (cardsArr.rows[0].card_ids.length) {
      cards = await pool.query(
      `SELECT * FROM cards WHERE id in (${cardsArr.rows[0].card_ids}) ORDER BY id;`
      )
    }

    return res.status(200).json(cards.rows)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Can't get cards" })
  }
}

const createCard = async (req, res) => {
  const userId = Number(req.user.userId)
  const listId = Number(req.params.lid)
  const boardId = Number(req.params.bid)
  const { cardName } = req.body

  try {
    let result = await validateBoardAndUser(pool, userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    result = await validateListAndBoard(pool, listId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    const card = await pool.query(
      `INSERT INTO cards (name) VALUES ('${cardName}') RETURNING *;`
    )

    await pool.query(
      `UPDATE lists SET card_ids=array_append(card_ids, ${card.rows[0].id}) WHERE id=${listId}`
    )

    return res.status(201).json(card.rows)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Can't add cards" })
  }
}

const updateCard = async (req, res) => {
  const listId = Number(req.params.lid)
  const cardId = Number(req.params.cid)
  const userId = Number(req.user.userId)
  const boardId = Number(req.params.bid)
  const { cardName } = req.body

  try {
    let result = await validateBoardAndUser(pool, userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    result = await validateListAndBoard(pool, listId, boardId)
    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    result = await validateCardAndList(pool, cardId, listId)
    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    await pool.query(
      `UPDATE cards SET name = '${cardName}' WHERE id=${cardId};`
    )

    return res
      .status(200)
      .json({ message: `Card modified with ID: ${cardId}` })
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: `Can't update card of ${req.params.cid} id` })
  }
}

const deleteCard = async (req, res) => {
  const listId = Number(req.params.lid)
  const cardId = Number(req.params.cid)
  const userId = Number(req.user.userId)
  const boardId = Number(req.params.bid)

  try {
    let result = await validateBoardAndUser(pool, userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    result = await validateListAndBoard(pool, listId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    result = await validateCardAndList(pool, cardId, listId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    await pool.query(`DELETE FROM cards WHERE id = ${cardId};`)
    await pool.query(
      `UPDATE lists SET card_ids=array_remove(card_ids, ${cardId}) WHERE id=${listId};`
    )
    res.status(200).json({ message: `Card deleted with ID: ${cardId}` })
  } catch (e) {
    res
      .status(500)
      .json({ message: `Can't delete card of ${req.params.cid} id` })
  }
}

module.exports = { getCards, createCard, updateCard, deleteCard }
