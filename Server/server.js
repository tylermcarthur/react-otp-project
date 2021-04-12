const express = require('express')
const PORT = process.env.PORT || 3000
const pool = require('./db_connection.js')
const cors = require('cors')
// our server container
const app = express();

// middleware 
app.use(cors())
app.use(express.json())

// just a test get for development ONLY
app.get('/', async(req,res)=>{
  try {
    const allUsers = await pool.query("SELECT * FROM users")
       res.json(allUsers.rows)
  } catch (err) {
      console.error(err.message)
  }
})

// get to log in and push the user data to the state
app.get('/:username/:password',async(req,res)=>{
  try {
    const usernameToCheck = req.params.username
    const passwordToCheck = req.params.password

    const specificUser = await pool.query(`SELECT * FROM users WHERE name = '${usernameToCheck}' AND password = '${passwordToCheck}'`)
      res.json(specificUser.rows)
  } catch (err) {
    console.error(err.message)
  }
})

// to create a new user and send back an alert saying if the user was created or not
app.post('/newUser',async(req,res)=>{
  try {
    const name = (req.body.name.input)
    const password = (req.body.password.input)
    const email = (req.body.email.input)
    
    const checkIfUserExists = await pool.query(`SELECT * FROM users WHERE name = '${name}'`) 
    if(checkIfUserExists.rows.length === 0){
      await pool.query(`INSERT INTO users (name,password,email) VALUES ('${name}','${password}','${email}')`)
      res.send('Account successfully created')
    } else {
      res.send('Please choose a diffrent name, this one is already taken')
    }

  } catch (err) {
    console.error(err.message)
  }
})
// update the users favorite champion
app.post('/updateFavorite/:input',async(req,res)=>{
  try {
    const name = req.body.name
    const favoritedCharacter = req.params.input
    await pool.query(`UPDATE users SET user_favorites = '${favoritedCharacter}' WHERE name = '${name}'`)
    res.send('Favorite set, When logged in you will be sent to this page')
  } catch (err) {
      console.error(err.message)
  }
})

// causes our server to listen for incoming reuqests to this port
app.listen(PORT, ()=>{
    console.log(`LISTINING ON PORT ${PORT}`)
}); 