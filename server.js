require('dotenv').config()

// Import express framework
const express = require('express')
// Import middleware
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
// Import routes
const homeRouter = require('./api/routes/home')
// Setup default port
const PORT = process.env.PORT || 8080
// Create express app
const app = express()
// Implement middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
console.log(process.env.DB_URL)
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.use(express.static(__dirname + '/build'))

    app.get('/', (req, res) => {
      res.sendFile('build/index.html', { root: __dirname })
    })
    app.get('/admin', (req, res) => {
    res.sendFile('build/index.html', { root: __dirname+"../mondobee-admin/" })
  })
}
// Implement route for '/api' endpoint
app.use('/api', homeRouter)


// Implement route for errors
app.use((err, req, res, next) => {
   console.error(err.stack)
   res.status(500).send('Something broke!')
})
// Start express app
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})