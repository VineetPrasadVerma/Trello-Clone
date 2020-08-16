const pool = require('../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  let { username, email, password } = req.body

  if (username === undefined || email === undefined || password === undefined) {
    return res.status(400).json({ message: 'Please enter all fields' })
  }

  try {
    password = await bcrypt.hash(password, 10)

    const duplicateUser = await pool.query(
      `SELECT * FROM USERS WHERE email='${email}'`
    )

    if (duplicateUser.rowCount === 0) {
      const newUser = await pool.query(
        `INSERT INTO USERS (name, email, password) VALUES ('${username}', '${email}', '${password}') RETURNING *;`
      )

      const accessToken = jwt.sign(
        { userId: newUser.rows[0].id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 }
      )
      return res.status(201).json({ accessToken, user: newUser.rows[0] })
    }

    return res.status(400).json({ message: 'Email already exists' })
  } catch (err) {
    return res.status(500).json({ message: 'Some error occured' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (email === undefined || password === undefined) {
    return res.status(400).json({ message: 'Please Enter all fields' })
  }

  try {
    const user = await pool.query(
      `SELECT * FROM USERS WHERE email='${email}'`
    )

    if (user.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password)

    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const accessToken = jwt.sign(
      { userId: user.rows[0].id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 3600 }
    )

    return res.status(200).json({ accessToken, user: user.rows[0] })
  } catch (err) {
    return res.status(500).json({ message: 'Some error occured' })
  }
}

const getCurrentUser = async (req, res) => {
  const userId = req.user.userId

  try {
    const user = await pool.query(`SELECT id, name FROM users WHERE id = ${userId}`)

    if (!user.rowCount) return res.status(400).json({ message: 'User not found' })

    return res.status(200).json(user.rows[0])
  } catch (err) {
    return res.status(500).json({ message: 'Can\'t find User' })
  }
}
module.exports = { registerUser, loginUser, getCurrentUser }
