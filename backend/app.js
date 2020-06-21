const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')

const app = express()

app.use(bodyParser.json())
app.use(cors())

require('./api/users')(app, db)
require('./api/albums')(app, db)

app.listen(3000, () => {
  console.log('Backend server listening on port 3000')
})

