const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const accounts = require('./data.json');
    //const http = require('http')

  


//const rateLimit = require('express-rate-limit')
require('dotenv').config()
const errorHandler = require('./middleware/error')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

//app.get(["/", "/index.html"], (req, res) => {
//  res.sendFile(__dirname + "/index.html");
//});
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

//function keepServerAwaike() {
//axios.get('https://mymongoose.onrender.com', (res) => {
// console.log(`Status Code: ${res.statusCode}`);
//}).on('error', (e) => {
//console.error(`Error: ${e.message}`);
//});
//}

//Schedule the task to run every 5 minutes


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
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', async (req, res) => {
    try{
        const foundUser = accounts.find((data) => req.body.password === data.password);
        if (foundUser) {
    
            //let submittedPass = req.body.password; 
            
    
            //const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            //if (passwordMatch) {
                //let usrname = foundUser.Gender;
                res.render('result',{Name:foundUser.Aname.Name,Mname:foundUser.Aname.Mname,Surname:foundUser.Aname.Surname,NIN:foundUser.NIN,Gender:foundUser.Gender,DateofBirth:foundUser.DateofBirth,Presentclass:foundUser.Presentclass,Bloodgroup:foundUser.Bloodgroup,State:foundUser.State,School:foundUser.School,HometownCommunity:foundUser.HometownCommunity,ParentPhoneNo:foundUser.ParentPhoneNo,ParentPhoneNo2:foundUser.ParentPhoneNo2,picturepath:foundUser.picturepath,Status:foundUser.Status});
                //res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./lohtml'>logout</a></div>`);
            } else {
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        //}
       
    } catch{
        res.send("Internal server error");
    }
});


// Routes
app.use('/api', require('./routes'))
app.use('/evette', require('./routes/evette'))
app.use('/nams', require('./routes/nams'))
app.use('/login', require('./routes/login'))
app.use('/namslogin', require('./routes/NAMSLOGIN'))
app.use('/loginevette', require('./routes/evettlogin'))
app.use('/radical', require('./routes/mydb'))
app.use('/nuasadb', require('./routes/nuasadb'))
app.use('/futo', require('./routes/FUTOSUG'))
app.use('/futol', require('./routes/futologin'))
app.use('/nuasalogin', require('./routes/NUASAlogin'))
app.use('/NUASA', require('./routes/NUASA'))
app.use('/db', require('./routes/db'))

// Error handler middleware
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app;
