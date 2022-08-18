const express = require('express')
const router = express.Router()

const URLs = require('../../models/URL')
const randomValue = require('../../models/randomValue')

router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const URL = req.body.URL
  const error = '網址格式不正確，請重新輸入。'

  if (!URL.match(/^(https?:)/
  )) {
    res.render('index', { error: error })
    return
  }

  URLs.findOne({ URL })
    .lean()
    .then(data => {
      //如果資料庫已有相同網址，就回傳先前建立過的縮址
      if (data) {
        res.render('index', { shortURL: data.shortURL })
      } else {
        const shortURL = req.protocol + '://' + req.headers.host + '/' + randomValue()
        URLs.create({ URL, shortURL: shortURL })
          .then(() => res.render('index', { URL: URL, shortURL: shortURL }))
      }
    })
    .catch(error => console.log(error))
})

router.get('/:shortURL', (req, res) => {
  const shortURL = req.protocol + '://' + req.headers.host + '/' + req.params.shortURL

  URLs.findOne({ shortURL })
    .then(data => {
      res.redirect(data.URL)
    })
    .catch(error => console.log(error))
})


module.exports = router