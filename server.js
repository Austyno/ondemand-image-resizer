const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const xss = require('xss-clean')
const hpp = require('hpp')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

dotenv.config({ path: './config/config.env' })

//== Route files ==//
const routes = require('./src/routes')

//== App Initialization ==//
const app = express()
app.use(
  cors({
    origin: '*',
  })
)
// Prevent XSS attacks
app.use(xss())

// Prevent http param pollution
app.use(hpp())

// set headers
// app.use(helmet())

//== mount routes ==//
app.use('/', routes)

const port = process.env.PORT || 5000
const host = process.env.HOST || 'localhost'

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

try {
} catch (e) {
  console.error(e)
  process.exit()
}
app.listen(port, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} mode at http://${host}:${port}`
  )
})
