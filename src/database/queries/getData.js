const dbConnection = require('../db_connection')

module.exports = (cb) => {
  dbConnection.query('select * from city', (error, result) => {
    if (error) return cb(error)
    cb(null, JSON.stringify(result.rows))
  })
}
