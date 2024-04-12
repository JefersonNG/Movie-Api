const sqliteConnection = require("../../sqlite")

const createUsers = require("./createTableUsers")


async function migrationRun() {
  const schemas = [
    createUsers
  ].join("")


  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.log(error))
}

module.exports = migrationRun