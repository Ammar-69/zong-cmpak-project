require('dotenv').config() // To use the .env file

const express = require('express') // Express is used for server
const mongoose = require('mongoose') // Mongoose is used to connect to mongo and use tables etc etc
const cors = require('cors')

const apiRoutes = require('./routes/apiRoutes') // For importing router from router file

const app = express() // Creating a new server

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT))
  .catch(err => console.error(err))

app.use(cors())
app.use(express.json())

app.use('/api', apiRoutes) // router handling /api requests
