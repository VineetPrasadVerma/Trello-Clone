require('dotenv').config()

const userRoutes = require('./users/userRoute')
const boardRoutes = require('./boards/boardRoute')
const listRoutes = require('./lists/listRoute')
const cardRoutes = require('./cards/cardRoute')

const cors = require('cors')
const express = require('express')

const app = express()

app.use(cors())
app.use(express.json())

// ROUTES
app.use('/', userRoutes)
app.use('/boards', boardRoutes)
app.use('/boards/:bid/lists', listRoutes)
app.use('/boards/:bid/lists/:lid/cards', cardRoutes)

app.listen(process.env.APP_PORT, () =>
  console.log('Trello server has started')
)
