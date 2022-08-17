const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes')

const app = express()
const port = 3000


app.use(routes)

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




app.listen(port, () => {
  console.log(`app running on the http://localhost:${port}`)
})