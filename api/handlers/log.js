"use strict";
var users   = require("../models/users");

module.exports = {

	in: function(req, reply) {
		var creds = req.auth.credentials;

		var profile = {
			auth_method : "google",
			email       : creds.profile.raw.email
		};

		users.getSingle(profile.email, function(err, user) {
			if (err) {
				reply(err);
			} else {
				req.auth.session.clear();
				req.auth.session.set(profile);
				reply.redirect("/");
			}
		});
	},

	out: function(req, reply) {
		req.auth.session.clear();
		reply("Succesfully logged out");
	}
};
