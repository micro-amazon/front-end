(function() {
    'use strict';

    var async = require("async"), express = require("express"), request = require("request"), endpoints = require("../endpoints"), helpers = require("../../helpers"), app = express(), cookie_name = "logged_in"

    app.post("/admin/login", function(req, res, next) {
        var options = {
            uri: `${endpoints.adminUrl}/login`,
            method: 'POST',
            json: true,
            body: req.body
        };

        console.log("Login Result: " + JSON.stringify(req.body));

        async.waterfall([
                function(callback) {
                    request(options, function(error, response, body) {
                        if (error !== null ) {
                            callback(error);
                            return;
                        }
                        if (response.statusCode == 200) {
                            if (body.error) {
                                callback(body.error);
                                return;
                            }
                            console.log(body);
                            var adminId = body.username;
                            console.log(adminId);
                            req.session.adminId = adminId;
                            callback(null, adminId);
                            return;
                        }
                        console.log(response.statusCode);
                        callback(true);
                    });
                },
                function(adminId, callback) {
                    var sessionId = req.session.id;
                    console.log("Merging carts for customer id: " + adminId + " and session id: " + sessionId);

                    var options = {
                        uri: endpoints.adminUrl,
                        method: 'GET'
                    };
                    request(options, function(error, response, body) {
                        if (error) {
                            if(callback) callback(error);
                            return;
                        }
                        console.log('Carts merged.');
                        if(callback) callback(null, adminId);
                    });
                }
            ],
            function(err, adminId) {
                if (err) {
                    console.log("Error with log in: " + err);
                    res.status(500);
                    res.end();
                    return;
                }
                console.log("set cookie" + adminId);
                res.status(200);
                res.cookie(cookie_name, req.session.id, {
                    maxAge: 3600000
                }).send({id: adminId});
                console.log("Sent cookies.");
                res.end();
                return;
            }
        );
    });

    module.exports = app;
}());
