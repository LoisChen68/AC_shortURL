const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Test')
})

app.listen(port, () => {
  console.log(`app running on the http://localhost:${port}`)
})