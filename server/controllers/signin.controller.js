/**
 * Created by Rishabh on 2/1/2016.
 */

var User = require('../models/user.model');
var jwttoken = require("jsonwebtoken");
var config = require('../../config');

exports.getuser = function (req, res) {
    User.findOne({username: req.body.username}).select('password username name email dob').exec(function (err, user) {
        if (err) {
            throw err;
        }
        if (!user) {
            return res.json({message: "User does not exist.", status: false});
        } else if (user) {
            var val_password = user.comparePassword(req.body.password);
            if (!val_password) {
                res.json({message: "Password does not matchs.", status: false});
            } else {

                user.update({isOnline: 1}, function (err) {
                    if (err) {
                        throw err;
                    }
                });
                var token = jwttoken.sign({
                    name: user.name,
                    username: user.username
                }, config.secret, {expiresInMinutes: 1440});
                var res_user = {name: user.name, email: user.email, username: user.username, dob: user.dob};
                return res.json({status: 200, user: res_user, token: token});
            }
        }
    });
}

exports.logout = function (req, res) {
    req.headers["x-access-token"] = "";
    User.findOne({username: req.headers['username']}, function (err, user) {
        if (err) {
            throw err;
        }
        user.update({isOnline: 0}, function (err) {
            if (err)
                throw err;
        });

        res.json({message:"Logout success full."});
    });

}


