const fs = require('fs')

const dbConnection = require('./db_connection')

const sql = fs.readFileSync(`${__dirname}/db_sql.sql`).toString()

dbConnection.query(sql, (error, result) => {
  if (error) {
    console.log('Something bad happend, which is', error)
  } else {
    console.log('Everdything is Okay')
  }
})
