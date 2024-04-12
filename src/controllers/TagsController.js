const knex = require("../database/knex")


class TagsController{
  async  index(req, res){
    const {user_id} = req.params

    const tags = await knex("tags").where({user_id}).orderBy("name")

    res.json(tags)
  }
}

module.exports = TagsController