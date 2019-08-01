const dbConnection = require('../db_connection')

module.exports = ({ name, country }, cb) => {
  dbConnection.query('insert into city (name,country) values ($1,$2)',
    [name, country], cb)
}
