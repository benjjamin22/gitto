const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Load user data from JSON file
let userData = JSON.parse(fs.readFileSync('users.json'));

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = userData.users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send('Login successful!');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Registration route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (userData.users.find(user => user.username === username)) {
        res.status(400).send('Username already exists');
    } else {
        userData.users.push({ username, password });
        fs.writeFileSync('users.json', JSON.stringify(userData));
        res.send('Registration successful!');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});