const pool = require('../config')

const validateBoardAndUser = async (userId, boardId) => {
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

const validateListAndBoard = async (listId, boardId) => {
  let list = await pool.query(`SELECT * FROM lists WHERE id=${listId};`)

  if (list.rowCount === 0) {
    return { status: 404, message: `Can't find list with id ${listId}` }
  }

  list = await pool.query(
    `SELECT * FROM lists WHERE id=${listId} and board_id=${boardId};`
  )

  if (list.rowCount === 0) {
    return { status: 403, message: 'Not Authorized' }
  }

  return null
}

const getLists = async (req, res) => {
  const userId = Number(req.user.userId)
  const boardId = Number(req.params.bid)

  try {
    const result = await validateBoardAndUser(userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    const lists = await pool.query(
      `SELECT * FROM lists WHERE board_id=${boardId};`
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
    const result = await validateBoardAndUser(userId, boardId)

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
    let result = await validateBoardAndUser(userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    result = await validateListAndBoard(listId, boardId)

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
  const listId = Number(req.user.lid)
  const userId = Number(req.user.userId)
  const boardId = Number(req.params.bid)

  try {
    let result = await validateBoardAndUser(userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    result = await validateListAndBoard(listId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    await pool.query(
      `DELETE FROM lists WHERE id = ${listId};`
    )

    res.status(200).json({ message: `List deleted with ID: ${listId}` })
  } catch (e) {
    // console.log(e)
    res
      .status(500)
      .json({ message: `Can't delete list of ${req.params.lid} id` })
  }
}

module.exports = { getLists, createList, updateList, deleteList }
