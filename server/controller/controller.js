var userService = require('../services/userService');
var jwt = require('jsonwebtoken');

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
        return res.status(422).send(response);//The request was well-formed but was unable to be followed due to semantic errors
    } else {
        userService.register(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({//given when an unexpected condition was encountered and no more specific message is suitable
                    message: err
                })
            } else {
                return res.status(200).send({//Standard response for successful HTTP requests
                    message: data
                });
            }

        });

    }
};

module.exports.login = (req, res) => {
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 });
    var secret = "adcgfft";
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);//The request was well-formed but was unable to be followed due to semantic errors
    } else {
        userService.login(req.body, (err, data) => {
            if (err) {
                return res.status(500).send({//given when an unexpected condition was encountered and no more specific message is suitable
                    message: err
                });
            } else {
                console.log("in login of contoller"+data)
                var token = jwt.sign({ email: req.body.email, id: data[0]._id }, secret, { expiresIn: "24h" });
                return res.status(200).send({//Standard response for successful HTTP requests
                    message: data,
                    "token": token
                });
            }
        })
    }

}

module.exports.getAllUser = (req, res) => {
    userService.getAllUser((err, data) => {
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