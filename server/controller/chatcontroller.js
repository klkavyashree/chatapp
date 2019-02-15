const chatServices = require("../services/chatServices");
try {
    module.exports.message = (req, callback) => {
        chatServices.addMessage(req, (err, data) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, data);//call back function for data

            }
        })

    }
}
catch (err) {
    console.log("err in sending message")
}
try{
module.exports.getUserMsg = (req, res) => {
    chatServices.getUserMsg((err, data) => {
        if (err) {
            return res.status(500).send({//given when an unexpected condition was encountered and no more specific message is suitable
                message: err
            });
        } else {
            return res.status(200).send({//Standard response for successful HTTP requests
                message: data
            });
        }
    })
}
}
catch(err)
{
    console.log("err found")
}