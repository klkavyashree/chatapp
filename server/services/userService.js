var userModel = require('../app/models/userschema');


exports.register = (req, callback) => {//calling call back functions
    userModel.register(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);//if req contain data then send responce
        }
    })
}
exports.login = (req, callback) => {
    userModel.login(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);//if req contain data then send responce
        }
    });
}


exports.getAllUser = (req, callback) => {
    userModel.getAllUser(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);//if req contain data then send responce
        }
    })
}

