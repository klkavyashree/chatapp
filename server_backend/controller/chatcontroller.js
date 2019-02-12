const chatServices = require("../services/chatServices");
module.exports.message = (req, callback) => {
    chatServices.addMessage(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);

        }
    })

}
module.exports.getUserMsg = (req, res) => {
    chatServices.getUserMsg((err, data) => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: data
            });
        }
    })
}