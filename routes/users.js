const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.use((req, res, next) => {
  next()
})

// ユーザー情報の更新
router.put('/:id', async (req, res) => {
  // ユーザーの認証
  if (req.body.user_id === req.params.id || req.body.isAdmin) {
    try {
      // parametrのidと一致するユーザーを更新
      // findByIdAndUpdateはQueryしか返さない
      await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body}
      )
      return res.status(200).json("ユーザー情報の更新に成功しました")
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).send("更新する権限がありません")
  }
})

// ユーザー情報の削除

// ユーザー情報の取得

// ユーザーのフォロー(parameter指定されるユーザーをフォロー)

// ユーザーのフォロー解除

module.exports = router
