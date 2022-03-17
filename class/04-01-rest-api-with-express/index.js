const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log(req)
  res.send('Hello World!')
})

app.listen(3001, () => {
  console.log(`Example app listening on port ${3001}`)
})