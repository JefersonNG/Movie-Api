require("express-async-errors")
const express = require('express')
const routes = require("./routes")
const migrationRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")


migrationRun()


const app = express()
app.use(express.json())
app.use(routes)

app.use((error, req, res, next) => {
  if(error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.log(error)

  return res.status(500).json({
    status: "error",
    message: "internal server error"
  })

})


const port = 3333
app.listen(port, () => console.log(`running on, Click LINK OPEN http://127.0.0.1:${port}`))