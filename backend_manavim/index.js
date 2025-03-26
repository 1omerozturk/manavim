const connectDb = require('./config/dbConnection')
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()


connectDb();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./routes'))

const PORT = process.env.PORT || 6060

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
