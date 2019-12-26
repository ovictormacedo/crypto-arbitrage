require('dotenv').config();
require("./Conf");
var PathModel = require("./PathModel");

exports.insertPath = function (path) {
    let pathModel = new PathModel(path);

    return pathModel.save()
        .then(function (res) {
            return true;
        })
        .catch(function (err) {
            return false;
        });
}