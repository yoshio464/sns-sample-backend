const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  next()
})

// 投稿を作成

// 投稿を編集

// 投稿に「いいね」を押す(すでに「いいね」を押している場合は削除)

// タイムラインの投稿を取得

module.exports = router
