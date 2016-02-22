/**
 * Created by Rishabh on 1/31/2016.
 */

var User = require("../models/user.model");

exports.getall = function (req, res) {
    User.find(function (err, users) {
        if (err)
            return res.json({message: "No user is found."});

        return res.send(users);
    });
}

exports.get = function (req, res) {
    User.find(req.body.user_id, function (err, user) {
        if (err) {
            return res.send(err);
        } else {
            return res.send(user);
        }
    });

}
exports.post = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.username = req.body.username;
    user.save(function (err) {
        if (err)
            if (err.code = 11000) {
                return res.json({message: "Username already exist."});
            } else {
                return res.send(err);
            }
        res.json({message: "User Created."});
    });
}


exports.put = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            return res.send(err);
        } else {
            user.name = req.body.name;
            user.save(function (err) {
                if (err)
                    return res.json(err);
                return res.json({message: "User updated."});
            });
        }
    });
}
exports.delete = function (req, res) {
    User.remove({_id: req.params.user_id}, function (err) {
        if (err)
            return res.send(err);
        return res.json({message: "User Deleted"});
    });
}




