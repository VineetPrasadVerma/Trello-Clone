const express = require('express')
const router = express.Router({ mergeParams: true })

const auth = require('../middleware/authorization')

const {
  getLists,
  createList,
  updateList,
  deleteList
} = require('./listModel')

router.get('/', auth, getLists)

router.post('/', auth, createList)

router.put('/:lid', auth, updateList)

router.delete('/:lid', auth, deleteList)

module.exports = router
