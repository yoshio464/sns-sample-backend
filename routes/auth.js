const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/User')

router.use((req, res, next) => {
  next()
})

// 新規ユーザー登録
router.post('/register', async (req, res) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 10)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword
    })
    const user = await newUser.save()
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
})

// ログイン認証
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({"email": req.body.email})
    if (!user) return res.status(404).send('ユーザーが存在しません')

    const validationPassword = bcrypt.compareSync(req.body.password, user.password)
    if (!validationPassword) return res.status(400).send('パスワードが違います')

    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
})

module.exports = router
