const express = require('express')
const router = express.Router()

const URLs = require('../../models/URL')

router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const URL = req.body.URL
  const letterAndNumber = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let randomValue = ''

  for (let i = 0; i < 5; i++) {
    const randomGroup = Math.floor(Math.random() * (letterAndNumber.length - 1))
    randomValue += letterAndNumber[randomGroup]
  }

  URLs.findOne({ URL })
    .lean()
    .then(data => {
      //如果資料庫已有相同網址，就回傳先前建立過的縮址
      if (data) {
        const shortURL = req.protocol + '://' + req.headers.host + '/' + data.shortURL
        res.render('index', { shortURL: shortURL, URL: data.URL })
      } else {
        const shortURL = req.protocol + '://' + req.headers.host + '/' + randomValue
        URLs.create({ URL, shortURL: randomValue })
          .then(() => res.render('index', { URL: URL, shortURL: shortURL }))
      }
    })
    .catch(error => console.log(error))
})

router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  const URL = req.protocol + '://' + req.headers.host + '/' + shortURL

  URLs.findOne({ shortURL })
    .then(data => {
      res.redirect(data.URL)
    })
    .catch(error => console.log(error))
})


module.exports = router