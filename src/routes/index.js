const { Router } = require("express")
const usersRoutes  = require("./usersRoutes")
const movieNotesRoutes = require("./movieNotesRoutes")
const tagsRoutes = require("./tagsRoutes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/movienotes", movieNotesRoutes)
routes.use("/tags", tagsRoutes)

module.exports = routes