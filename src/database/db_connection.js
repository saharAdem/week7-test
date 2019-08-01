require('env2')('./config.env')

const { Pool } = require('pg')

const DB_URL = process.env.DB_URL

if (!DB_URL) {
  throw new Error('environment variable DB_URL must be set ')
}
// const params = url.parse(DB_URL);

const pool = new Pool({
  connectionString: DB_URL,
  ssl: !(DB_URL.includes('localhost'))
})
module.exports = pool
