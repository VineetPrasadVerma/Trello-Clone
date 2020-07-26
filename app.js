require('dotenv').config()

const userRoutes = require('./users/userRoute')
const boardRoutes = require('./boards/boardRoute')

const express = require('express')

const app = express()

app.use(express.json())

app.use('/', userRoutes)
app.use('/boards', boardRoutes)

app.listen(process.env.APP_PORT, () => console.log('Trello server has started'))
