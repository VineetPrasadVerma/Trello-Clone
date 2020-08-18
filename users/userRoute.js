const express = require('express')
const router = express.Router()
const auth = require('../middleware/authorization')

const { registerUser, loginUser, getCurrentUser } = require('./userModel')

router.get('/user', auth, getCurrentUser)
router.post('/', loginUser)
router.post('/register', registerUser)

module.exports = router
