const express = require('express')
const cors = require('cors')
    //const rateLimit = require('express-rate-limit')
require('dotenv').config()
const errorHandler = require('./middleware/error')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

// Rate limiting
//const limiter = rateLimit({
//windowMs: 10 * 60 * 100000, // 10 Mins
//max: 100,
//})
//app.use(limiter)
app.set('trust proxy', 1)

// Enable cors
app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes'))
app.use('/evette', require('./routes/evette'))
app.use('/nams', require('./routes/nams'))
app.use('/login', require('./routes/login'))
app.use('/namslogin', require('./routes/NAMSLOGIN'))
app.use('/loginevette', require('./routes/evettlogin'))
app.use('/radical', require('./routes/mydb'))

// Error handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))