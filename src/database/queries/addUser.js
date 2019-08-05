// Write a query to add the user and their password to the database

const dbConnection = require('../db_connection')

const postSignUpData = (signupEmail, signupPassword, cb) => {
  dbConnection.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [signupEmail, signupPassword], (err, res) => {
    if (err) {
      return cb(err)
    }
    cb(null, res.rows)
  })
}
module.exports = postSignUpData
