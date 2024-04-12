const { Router } = require("express")
const movieNotes = require("../controllers/MovieNotesControllers")

const movieRoutes = Router()

const movieNote = new movieNotes


movieRoutes.post("/:user_id", movieNote.create)
movieRoutes.get("/:id", movieNote.show)
movieRoutes.delete("/:id", movieNote.delete)
movieRoutes.get("/", movieNote.index)

module.exports = movieRoutes