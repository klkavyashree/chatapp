const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
//converting properties into schema types
var userSchema = new mongoSchema({
        'firstname': { type: String, required: [true, "First name is required"] },
        'lastname': { type: String, required: [true, "LastName is required"] },
        'email': { type: String, required: [true, "Email is required"] },
        'password': { type: String, required: [true, "password is required"] },
}, {
                timestamps: true
        });
function usermodel() {

}
var user = mongoose.model('user', userSchema);//acessing model
function hash(password) {
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);
        return hashPassword;
}
try {
        usermodel.prototype.register = (body, callback) => {
                user.find({ 'email': body.email }, (err, data) => {
                        if (err) {
                                console.log("Error in register user schema ");
                                return callback(err);
                        } else if (data.length > 0) {
                                response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
                                return callback(response);
                        }
                        else {
                                const newUser = new user({
                                        'firstname': body.firstname,
                                        'lastname': body.lastname,
                                        'email': body.email,
                                        'password': hash(body.password)
                                });
                                newUser.save((err, result) => {
                                        if (err) {
                                                console.log("error in model file", err);
                                                return callback(err);
                                        } else {
                                                console.log("data save successfully", result);
                                                return callback(null, result);
                                        }
                                })
                        }
                });

        }
}
catch (err) {
        console.log("canot registre due to exception")
}
try {
        usermodel.prototype.login = (body, callback) => {
                user.find({ 'email': body.email }, (err, data) => {
                        if (err) {
                                return callback(err);
                        } else if (data.length > 0) {
                                bcrypt.compare(body.password, data[0].password, function (err, res) {
                                        if (err) {
                                                return callback(err);
                                        } else if (res) {
                                                console.log(data);

                                                return callback(null, data);
                                        } else {
                                                return callback("Incorrect password").status(500);
                                        }
                                });
                        } else {
                                return callback("Invalid User ");
                        }
                })
        }
}
catch (err) {
        console.log("canot login due to exception")
}

usermodel.prototype.getAllUser = (callback) => {
        user.find({}, (err, data) => {
                if (err) {
                        callback("error in model" + err);
                } else {
                        callback(null, data);
                }
        })
}


module.exports = new usermodel();