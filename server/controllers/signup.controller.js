/**
 * Created by Rishabh on 2/1/2016.
 */

var User = require('../models/user.model');
var jwttoken = require("jsonwebtoken");
var config = require('../../config');
var nodemailer = require('nodemailer');
exports.add = function (req, res) {

    var user = new User();

    user.name = req.body.name;
    user.password = req.body.password;
    user.username = req.body.username;
    user.dob = req.body.dob;
    user.email = req.body.email;
    user.isOnline = 1;
    user.save(function (err) {
        if (err) {
            if (err.code == 11000) {
                return res.json({message: "User already exists."});
            } else {
                return res.send(err);
            }
        } else {
            var mailtransporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: config.adminemail,
                    pass: config.adminpassword
                }
            });

            var mailOptions = {
                from : config.adminemail,
                to : user.email,
                subject : "Testing nodemailer",
                text : "Hello this is rishabh tiwari testing the node mailer features."
            }

            mailtransporter.sendMail(mailOptions,function(error,info){
                if(err) {
                    console.log(err);
                }else{
                    console.log("Mail sent : "+ info);
                }
            })
            var token = jwttoken.sign({name: user.name, username: user.username}, config.secret, {expires: 1440});
            return res.json({token: token, user: user, status: 200});
        }
    });
}