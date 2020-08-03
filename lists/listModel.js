const pool = require('../config')
const {
  validateBoardAndUser,
  validateListAndBoard
} = require('../utils/checkAccess')

const getLists = async (req, res) => {
  const userId = Number(req.user.userId)
  const boardId = Number(req.params.bid)

  try {
    const result = await validateBoardAndUser(pool, userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    const lists = await pool.query(
      `SELECT * FROM lists WHERE board_id=${boardId} ORDER BY id;`
    )

    return res.status(200).json(lists.rows)
  } catch (err) {
    return res.status(500).json({ message: "Can't get lists" })
  }
}

const createList = async (req, res) => {
  const userId = Number(req.user.userId)
  const boardId = Number(req.params.bid)
  const { listName } = req.body

  try {
    const result = await validateBoardAndUser(pool, userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    const list = await pool.query(
      `INSERT INTO lists (name, board_id) VALUES ('${listName}', ${boardId}) RETURNING *;`
    )

    return res.status(201).json(list.rows)
  } catch (err) {
    return res.status(500).json({ message: "Can't add lists" })
  }
}

const updateList = async (req, res) => {
  const listId = Number(req.params.lid)
  const userId = Number(req.user.userId)
  const boardId = Number(req.params.bid)
  const { listName } = req.body

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

    await pool.query(
      `UPDATE lists SET name = '${listName}' WHERE id=${listId};`
    )

    return res
      .status(200)
      .json({ message: `List modified with ID: ${listId}` })
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Can't update list of ${req.params.lid} id` })
  }
}

const deleteList = async (req, res) => {
  const listId = Number(req.params.lid)
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

    const list = await pool.query(`SELECT cards from lists where id=${listId}`)
    const cardsId = list.rows[0].cards

    await pool.query(`DELETE FROM lists WHERE id = ${listId};`)
    await pool.query(`DELETE FROM cards WHERE id in (${cardsId});`)

    res.status(200).json({ message: `List deleted with ID: ${listId}` })
  } catch (e) {
    console.log(e)
    res
      .status(500)
      .json({ message: `Can't delete list of ${req.params.lid} id` })
  }
}

module.exports = { getLists, createList, updateList, deleteList }
