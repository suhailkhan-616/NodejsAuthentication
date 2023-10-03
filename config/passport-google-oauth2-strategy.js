const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/Authentication-list');

passport.use(new googleStrategy({
    clientID: "555442726627-fdrnjnjgbog5bur2oohnojhbkpdhs3gh.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        //find the user
        // find a user
        User.findOne({ email: profile.emails[0].value }).then(function (user) {
            // console.log(profile);
            if (user) {
                // if found, set this user to  req.user
                console.log('User found');
                return done(null, user);
            } else {
                // if  not found , create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                }).then(function (user) {
                    console.log('User created');
                    return done(null, user);
                }).catch(function (err) {
                    console.log('Error in create google ouath'.err);
                });
            }
        }).catch(function (err) {
            console.log('Error in create google ouath'.err);
        });
    }

));

module.exports = passport;