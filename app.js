const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000


app.use(routes)


app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.listen(port, () => {
  console.log(`app running on the http://localhost:${port}`)
})