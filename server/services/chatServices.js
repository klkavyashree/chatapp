const chatModel = require('../app/models/chatschema');

exports.addMessage = (req, callback) => {

    console.log("req on service");

    chatModel.addMessage(req, (err, data) => {

        if (err) {
            console.log("err on service file", err);
            //returning err
            return callback(err)
        } else {

            console.log("data on service file", data);
            return callback(null, data)
        }

    })

}
exports.getUserMsg = (req, callback) => {
    chatModel.getUserMsg(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}