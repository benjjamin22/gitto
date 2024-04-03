const url = require('url')
const express = require('express')
const router = express.Router()
const fs = require('fs');
const bodyParser = require('body-parser')

// Load user data from JSON file
let userData = JSON.parse(fs.readFileSync('db/users.json'));

// Login route
router.post('/', (req, res) => {
    const { username, password } = req.body;
    const user = userData.users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('Login successful!');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

module.exports = router