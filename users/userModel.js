const pool = require('../config')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
  let { username, email, password } = req.body

  if (username === undefined || email === undefined || password === undefined) {
    return res.status(400).json({ message: 'Bad Request' })
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
      return res.status(201).json(newUser.rows)
    }

    return res.status(400).json({ message: 'Email already exists' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Some error occured' })
  }
}

module.exports = { registerUser }
