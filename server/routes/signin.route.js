/**
 * Created by Rishabh on 2/1/2016.
 */

var signin_controller = require('../controllers/signin.controller');

var cors = require('cors');
module.exports = function (app) {

    app.use(cors(),function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type','accept');
        next();
    })
    app.post('/api/signin', signin_controller.getuser);
    app.post('/api/signout', signin_controller.logout);

}