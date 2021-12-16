(function () {
    'use strict';

    var async = require("async"), express = require("express"), request = require("request"), endpoints = require("../endpoints"), helpers = require("../../helpers"), app = express(), cookie_name = "logged_in"

    app.post("/admin/login", function (req, res, next) {
        var headers = {'content-type' : 'application/x-www-form-urlencoded'};
        var options = {
            headers,
            uri: `${endpoints.adminUrl}/login`,
            method: 'POST',
            json: true,
            body: req.body
        };
        console.log(options);

        request(options, function (error, response, body) {
            if (error !== null) {
                console.log(error);
                return;
            }
            console.log(response)
            if (response.statusCode == 200) {
                if (body.error) {
                    return;
                }
                res.status(200);
                res.end();
                return;
            } else {
                res.status(401);
                res.end();
                return;
            }
        });
        return;
    });

    module.exports = app;
}());
