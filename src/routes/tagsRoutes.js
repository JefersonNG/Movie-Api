const { Router } = require("express")

const TagsController = require("../controllers/TagsController")

const tagsRouter = Router()
const tagsView = new TagsController

tagsRouter.get("/:user_id", tagsView.index)

module.exports = tagsRouter