require('dotenv').config()

const userRoutes = require('./users/userRoute')
const boardRoutes = require('./boards/boardRoute')
const listRoutes = require('./lists/listRoute')
const cardRoutes = require('./cards/cardRoute')

const express = require('express')

const app = express()

app.use(express.json())

app.use('/', userRoutes)
app.use('/boards', boardRoutes)
app.use('/boards/:bid/lists', listRoutes)
app.use('/boards/:bid/lists/:lid/cards', cardRoutes)

app.listen(process.env.APP_PORT, () =>
  console.log('Trello server has started')
)
