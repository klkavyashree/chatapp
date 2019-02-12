const http = require('http');//requiring the http server
const express = require('express');//importing express and assigning obj of express into var app
const app = express()
var socketIO = require('socket.io');//importing socket io to get connection b/w server and client
var chatController = require('./controller/chatcontroller');
const server = http.createServer(app);
var io = socketIO(server);//listening using express server
const port = 3000//port number 
const database = require('./config/config');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var expressValidator = require('express-validator');
app.use(expressValidator())

io.on('connection', (socket) => {//ckecking for events
console.log("New user connected");

socket.on('createMessage', (message) => {//started listening events
    
    //for saving the message to database
    chatController.message(message, (err, data) => {
        if (err) {
            console.log('error---server.js 92', err);
        }
        else {
            //for sending message back to client
            io.emit('newMessageSingle', message);
        }

    })
    socket.on('disconnect', () => {
        console.log("User was disconnected");
    });
});
});

app.use('/', router);//calling function router

mongoose.connect(database.url, { useNewUrlParser: true })
.then(() => {
    console.log("successfully connected");
}).catch(err => {
    console.log("could not connect");
    process.exit();
});
app.use(express.static('client_frontend'));

// listen for requests
server.listen(port, () => {

    console.log(`Example app listening on port ${port}!`)
});
















// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
// mongoose.Promise = global.Promise;//return native code 