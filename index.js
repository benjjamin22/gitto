const express = require('express')
const cors = require('cors')
    //const http = require('http')
    //const cron = require('node-cron');

//const rateLimit = require('express-rate-limit')
require('dotenv').config()
const errorHandler = require('./middleware/error')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())


//function keepServerAwaike() {
//http.get('https://mymongoose.onrender.com', (res) => {
// console.log(`Status Code: ${res.statusCode}`);
//}).on('error', (e) => {
//console.error(`Error: ${e.message}`);
//});
//}

// Schedule the task to run every 5 minutes
//cron.schedule('*/14 * * * *', () => {
//  console.log('Sending keep-alive request to server...');
// keepServerAwaike();
//});

//console.log('Keep-alive script started.');

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