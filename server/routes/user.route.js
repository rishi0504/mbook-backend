/**
 * Created by Rishabh on 1/31/2016.
 */

var user_controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Methods', 'X-Requested-With,Content-Type,Authorization');
        next();
    });
    app.get("/api/users", user_controller.getall);
    app.get("/api/user/:user_id", user_controller.get);
    app.post("/api/user", user_controller.post);
    app.put("/api/user/:user_id",user_controller.put)
    app.delete("/api/user/:user_id",user_controller.delete);
}