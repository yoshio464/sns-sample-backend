const express = require('express')
const app = express()
const PORT = 3000
require('dotenv').config()

const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const postsRouter = require('./routes/posts')

// mongoDBと接続
const mongoose = require('mongoose')
// Ref: https://stackoverflow.com/questions/74747476/deprecationwarning-mongoose-the-strictquery-option-w-ill-be-switched-back-to
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URL)
 .then(() =>{
  console.log("MongoDBと接続中")
 })
 .catch((err) => {
    console.log(err);
  })
// middleware
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)

app.get("/", (req, res) => {
  res.send("hello")
})

app.listen(PORT, console.log(`Server listen at localhost:${PORT}`))
