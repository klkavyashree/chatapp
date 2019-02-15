var express = require('express');//importing express and assigning obj of express into var app
var router = express.Router();
var users = require('../controller/controller');//using controller  function using require
var chatController = require('../controller/chatcontroller');
var auth = require('../authentication');
try{


router.get('/getAllUser', auth, users.getAllUser);//sending responce with tocken
router.get('/getUserMsg', auth, chatController.getUserMsg);//sending responce with tocken
}
catch(err)
{
    console.log("err found while sending tocken")
}

module.exports = router