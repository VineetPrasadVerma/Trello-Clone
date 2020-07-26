const express = require('express')
const router = express.Router()

const auth = require('../middleware/authorization')

const {
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard
} = require('./boardModel')

router.get('/', auth, getBoards)

router.post('/', auth, createBoard)

router.put('/:bid', auth, updateBoard)

router.delete('/:bid', auth, deleteBoard)

module.exports = router
