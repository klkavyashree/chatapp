const express = require('express');
const app = express()
const port = 3000
const database = require('./config/config');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const bodyParser = require('body-parser')   
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  var expressValidator = require('express-validator');
app.use(expressValidator())
// app.get('/', (req, res) => res.send('Hello World!'));

 app.use('/', router);//calling function router
app.use(express.static('client_frontend'));

mongoose.Promise=global.Promise;//return native code 
    mongoose.connect(database.url, { useNewUrlParser: true }).then(()=>{
        console.log("successfully connected");
    }).catch(err =>{
        console.log("could not connect");
        process.exit();
    })
    

app.listen(port, () => {

    console.log(`Example app listening on port ${port}!`)
})