const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT 
const connectDB = require('./config/db')
const router = require('./routes/index')

//cookie parser
const cookieParser = require('cookie-parser')

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use(express.json())
app.use(cookieParser())
app.use ('/api/' ,router)

connectDB()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
