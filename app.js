const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const port = 3000
const URLs = require('./models/URL')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI_URL)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
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
        res.render('index', { shortURL: data.shortURL, URL: data.URL })
      } else {
        const shortURL = req.protocol + '://' + req.headers.host + '/' + randomValue
        URLs.create({ URL, shortURL: randomValue })
          .then(() => res.render('index', { URL: URL, shortURL: shortURL }))
      }
    })
    .catch(error => console.log(error))
})

app.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  const URL = req.protocol + '://' + req.headers.host + '/' + shortURL

  URLs.findOne({ shortURL })
    .then(data => {
      res.redirect(data.URL)
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`app running on the http://localhost:${port}`)
})