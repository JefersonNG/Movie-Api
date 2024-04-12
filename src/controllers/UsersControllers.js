const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const {hash, compare} = require("bcrypt")

class UsersControllers {
  async create(req, res) {
    const { name, email, password } = req.body 

    if(!name) {
      throw new AppError('Obrigatório o nome')
    }
    const database = await sqliteConnection()

    const userExist = await database.get("SELECT * FROM users WHERE email = (?)",  [email])
    if(userExist) {
      throw new AppError('Esse email ja esta em uso')
    }
     
    const passwordHash = await hash(password, 8)


    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",[name, email, passwordHash])

    res.status(201).json("Usuário criado")
  }

  async update(req, res) {
    const { name, email, password, old_pass } = req.body
    const { id } = req.params
    
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = ?", [id])

    user.name = name ?? user.name
    user.email = email ?? user.email
    
    let passwordHash = user.password

    const userExisted = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    
    if(userExisted && userExisted.id != id){
      throw new AppError("Este email ja esta em uso")
    }

    if(!old_pass){
      throw new AppError("Precisa informar senha atual")
    }
      
    const comparePassword = await compare(old_pass, user.password)
    
    if(!comparePassword){
      throw new AppError("Senha atual incorreta")
    }

    if(password){
      passwordHash = await hash(password, 8)
    }


    

    database.run(`
      UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        update_at = DATETIME('now')
      WHERE id = ?
    `, [user.name, user.email, passwordHash, id])

    res.json()
    
  }
}



module.exports = UsersControllers