const versionSQLite = require("sqlite3")
const sqlite = require("sqlite")

const path = require("path")


async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: versionSQLite.Database
  })

  return database
}

module.exports = sqliteConnection