/**
 * Created by Rishabh on 2/3/2016.
 */

var User = require('../models/user.model');
var config = require('../../config');
exports.getdetail = function (req, res) {

    var token = req.headers['x-access-token'];
    var username = req.headers['username'];
    if (token) {
        User.find({username: username}, function (err, user) {
            if (err) {
                return res.send(err);
            } else {
                return res.json(user);
            }
        });
    } else {
        res.json({success: false, message: "session logout."});
    }

}


exports.getAllUser = function (req, res) {

    var token = req.headers['x-access-token'];
    var username = req.headers['username'];
    if (token) {
        User.find({'username': {'$ne': username}}, function (err, users) {
            if (err)
                return res.json({message: "No user is found."});
            return res.json(users);
        });
    } else {
        return res.json({message: "Session logout.", status: false});
    }
}