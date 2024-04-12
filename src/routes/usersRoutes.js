const { Router } = require("express")
const UsersControllers = require("../controllers/UsersControllers")

const usersRoutes = Router()

const userController = new UsersControllers()

function myMiddleware(req, res, next) {
  console.log("myMiddleware")

  next()
}

usersRoutes.post("/", myMiddleware, userController.create)
usersRoutes.put("/:id", userController.update)

module.exports = usersRoutes