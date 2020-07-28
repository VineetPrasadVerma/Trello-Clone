const pool = require('../config')

const validateBoardAndUser = async (userId, boardId) => {
  let board = await pool.query(`SELECT * FROM boards WHERE id=${boardId};`)

  if (board.rowCount === 0) {
    return { status: 404, message: `Can't find board with id ${boardId}` }
  }

  board = await pool.query(
      `SELECT * FROM boards WHERE  id=${boardId} and user_id=${userId};`
  )

  if (board.rowCount === 0) {
    return { status: 403, message: 'Not Authorized User' }
  }

  return null
}

const getBoards = async (req, res) => {
  const userId = req.user.userId

  try {
    const result = await pool.query(
      `SELECT * FROM boards WHERE user_id=${userId} ORDER BY id;`
    )

    return res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: "Can't get boards" })
  }
}

const createBoard = async (req, res) => {
  const userId = req.user.userId
  const { boardName } = req.body

  try {
    const result = await pool.query(
      `INSERT INTO boards (name, user_id) VALUES ('${boardName}', ${userId}) RETURNING *;`
    )

    return res.status(201).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: "Can't add board" })
  }
}

const updateBoard = async (req, res) => {
  const userId = Number(req.user.userId)
  const boardId = Number(req.params.bid)
  const { boardName } = req.body

  try {
    const result = await validateBoardAndUser(userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    await pool.query(
      `UPDATE boards SET name = '${boardName}' WHERE id=${boardId};`
    )

    return res
      .status(200)
      .json({ message: `Board modified with ID: ${boardId}` })
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Can't update board of ${req.params.bid} id` })
  }
}

const deleteBoard = async (req, res) => {
  const userId = Number(req.user.userId)
  const boardId = Number(req.params.bid)

  try {
    const result = await validateBoardAndUser(userId, boardId)

    if (result) {
      const { status, message } = result
      return res.status(status).json({ message: message })
    }

    await pool.query(
      `DELETE FROM boards WHERE id =${boardId} and user_id=${userId};`
    )

    res.status(200).json({ message: `Board deleted with ID: ${boardId}` })
  } catch (e) {
    // console.log(e)
    res
      .status(500)
      .json({ message: `Can't delete board of ${req.params.bid} id` })
  }
}

module.exports = { getBoards, createBoard, updateBoard, deleteBoard }
