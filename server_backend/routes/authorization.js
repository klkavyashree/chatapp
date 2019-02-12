var express = require('express');
var router = express.Router();
var users = require('../controller/controller');
var chatController = require('../controller/chatcontroller');
var auth = require('../authentication');

router.get('/getAllUser', auth, users.getAllUser);
router.get('/getUserMsg', auth, chatController.getUserMsg);


module.exports = router