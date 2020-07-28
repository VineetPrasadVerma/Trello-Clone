const express = require('express')
const router = express.Router({ mergeParams: true })

const auth = require('../middleware/authorization')

const { getCards, createCard, updateCard, deleteCard } = require('./cardModel')

router.get('/', auth, getCards)

router.post('/', auth, createCard)

router.put('/:cid', auth, updateCard)

router.delete('/:cid', auth, deleteCard)

module.exports = router
