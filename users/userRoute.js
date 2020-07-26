const express = require('express')
const router = express.Router()

const { registerUser } = require('./userModel')

router.post('/', registerUser)

module.exports = router
