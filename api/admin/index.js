(function () {
    'use strict';

    var async = require("async"), express = require("express"), request = require("request"), endpoints = require("../endpoints"), helpers = require("../../helpers"), app = express(), cookie_name = "logged_in"

    app.post("/admin/login", function (req, res, next) {
        var options = {
            uri: `${endpoints.adminUrl}/login`,
            method: 'POST',
            json: true,
            body: req.body
        };

        console.log("Login Result: " + JSON.stringify(req.body));
        request(options, function (error, response, body) {
            console.log(response);
            if (error !== null) {
                return;
            }
            if (response.statusCode == 200) {
                if (body.error) {
                    return;
                }

                var options = {
                    uri: endpoints.adminUrl,
                    method: 'GET'
                };
                request(options, function (error, response, body) {
                    console.log(response);
                    if (error) {
                        if (callback) callback(error);
                        return;
                    }
                });
                return;
            } else {
                console.log("Error with log in: " + err);
                res.status(401);
                res.end();
                return;
            }
        });

    });

    module.exports = app;
}());
