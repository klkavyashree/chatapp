const ctrlUser = require('../controller/controller');
const express = require('express');
const authroutes = require('./authorization');

const router = express.Router();
router.post('/login', ctrlUser.login);//calling controller function for login
 router.post('/register', ctrlUser.register);// to Create a new user 
 router.use('/auth', authroutes);
module.exports = router;



