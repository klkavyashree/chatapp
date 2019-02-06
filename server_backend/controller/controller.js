var userService = require('../services/userService');
// var jwt = require('jsonwebtoken');

// Create and Save a new user
module.exports.register = (req, res) => {
    console.log("inside register ");
    req.checkBody('firstname', 'Firstname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('lastname', 'Lastname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 }).equals(req.body.confirmPassword);
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        userService.register(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                return res.status(200).send({
                    message: data
                });
            }

        });

    }
};

module.exports.login = (req, res) => {
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 });
    // var secret = "adcgfft";
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        userService.login(req.body, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err
                });
            } else {
               
                return res.status(200).send({
                    message: data,
                });
            }
        })
    }

}



































































// /**
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  */
// /**register api to handle the registration process */
// var register = function (req, res) {
//     try {
//         var response = {};/**response in json format */
//         var email = req.body.email;/**take email as request in body */
//         var db = new usermodel();/**create a database for user schema */
//         // console.log('email', typeof req.body.email);
//         if (typeof req.body.fname === 'undefined' || typeof req.body.lname === 'undefined') {/**handling the undefined part for firstname */
//             throw new Error("Name is required");
//         }
//         if (typeof req.body.email === 'undefined') {
//             throw new Error("Email address is required");/**handling the email undefined part */
//         }
// /**using regular expressions for handling the errors */
//         var regex = /^[0-9]+$/;
//         var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//         if (!re.test(req.body.email)) {
//             throw new Error("some thing went wrong in email....please give a valid emailid.");/**throw error if something went wrong */
//         }
//         var re = /^[a-zA-Z]\S*$/;
//         if (!re.test(req.body.fname) || !re.test(req.body.lname)) {
//             throw new Error("Enter correct name");
//         }
//         var re = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
//         if (!re.test(req.body.password)) {
//             throw new Error("Give a strong password.....");
//         }
//         //if(typeof req.body.password === 'undefined'){
//         //throw new Error("Password is required ");
//         //}

//         db.fname = req.body.fname;
//         db.lname = req.body.lname;
//         db.email = req.body.email;
//         db.password = encrypt(req.body.password);/**passing the password to password encryption method */

//         usermodel.find({ "email": email }, function (err, data) {/**find() method to search the email if already exists or not */
//             if (err) {
//                 response = {
//                     "error": true, "message": "error", "err": err
//                 };
//                 return res.status(400).send(response);/**status=400 indicates bad request */
//             }

//             else {
//                 // save() will run insert() command of MongoDB.
//                 // it will add new data in collection.
//                 if (data.length > 0) {
//                     response = { "error": true, "message": "Mail id exist", "err": err };
//                     return res.json(response);

//                 }
//                 else {
//                     db.save(function (err) {/**save the details into the database */

//                         if (err) {
//                             console.log(err);/**if error exists the it prints the error */
//                             response = { "error": true, "message": "error in adding Data " };
//                         }
//                         else {
//                             response = { "error": false, "message": " Data added " };/**if there is no error, then it dispalys Data added into the data base */
//                             console.log(db);
//                         }
//                         return res.status(200).send(response);/**status=200 indicates ok */

//                         });
//                 }
//             }
//         });
//     }
//     catch (e) {/**using the try-catch to handle the unknown & unexpected errors */
//         console.log(e);
//         if (e instanceof ReferenceError
//             || e instanceof TypeError
//             || e instanceof SyntaxError
//             || e instanceof RangeError) {
//             return res.json({
//                 "error": true,
//                 "message": "Something bad happened. Please contact system administrator"
//             });
//         } else {
//             return res.json({
//                 "error": true,
//                 "message": e.message
//             });
//         }
//     }
// }
// /**
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  */
// /**login api to handle the login process */
// var login = function (req, res) {
//     try {
//         var email=req.body.email;
//         var password;/**only email & password are considered in the login process */
//         var response = {};
//         usermodel.find({ "email": email, "password": encrypt(req.body.password) }, function (err, data) {
//             if (err) {
//                 response = { "error": true, "message": "error" };/**if error then dispalys the error message */
//                 return res.json(response);/**returns the response  */
//             }

//             else if (data.length > 0) {
//                 var id, token;
//                 token = jwt.sign({/**generating the token in the local storage */
//                     email: email,
//                     password: password
//                 }, secret, {
//                         expiresIn: '12d'
//                     })
//                     console.log(data);
//                 var userid = data[0]._id;
//                 var username=data[0].fname;
                

//                 var response = { "error": false, "message": "login successful", "token": token,"username":username, "userid": userid };
//                 return res.status(200).send(response);

//             }
//             else {/**if userlogin without registration,then it displays "first perform registration" */
//                 response = { "error": true, "message": "First do registration..before going to login.." };
//             }
//             //return res.status(400).send(response);

        
//             var bcrypt = require('bcryptjs');
//            var config = require('../config/config');
//              var token = jwt.sign({ id: usermodel._id }, secret, {/**generates the secret token */
//                expiresIn: 86400 // expires in 24 hours
//             });

//             res.status(200).send({ auth: true, token: token, message: response });/**return the response with token,auth & message */
//         });
//     }
//     /**try-catch to handle the unknown errors */
//     catch (e) {
//         console.log(e);
//         if (e instanceof ReferenceError
//             || e instanceof TypeError
//             || e instanceof SyntaxError
//             || e instanceof RangeError) {
//             return res.json({
//                 "error": true,
//                 "message": "Something bad happened. Please contact system administrator"
//             });
//         } else {
//             return res.json({
//                 "error": true,
//                 "message": e.message
//             });
//         }
//     }
// }
// module.exports = {
//     register: register,
//     login: login
// }