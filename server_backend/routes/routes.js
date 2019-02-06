const ctrlUser = require('../controller/controller');
const express = require('express');

const router = express.Router();
router.post('/login', ctrlUser.login);//calling controller function for login
//Create a new user 
 router.post('/register', ctrlUser.register);

module.exports = router;