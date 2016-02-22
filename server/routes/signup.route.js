/**
 * Created by Rishabh on 2/1/2016.
 */

var signup_controller = require('../controllers/signup.controller');


module.exports = function (app) {


    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'accept');
        next();
    })

    app.post('/api/signup', signup_controller.add);
}