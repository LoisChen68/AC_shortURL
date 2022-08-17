const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI_URL)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
