const Listnode = require('../models/Authentication-list');
const crypto = require('crypto');
const forgetMailer = require('../mailers/forget');

module.exports.signIn = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/home');
        }
        return res.render('sign_in', {
            title: 'Authentication Sign-In |'
        })
    } catch (err) {
        console.log('Error in signIn', err);
    }
}

module.exports.signUp = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/home');
        }
        return res.render('sign_up', {
            title: 'Authentication Sign-up |'
        })
    } catch (err) {
        console.log('Error in signUp', err);
    }
}

// sign up post and create into db
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            req.flash('error', 'X Confirm password does not matches passowrd');
            return res.redirect('back');
        }
        const user = await Listnode.findOne({ email: req.body.email });
        if (!user) {
            await Listnode.create(req.body);
            req.flash('success', 'Sign Up Successfull !');
            return res.redirect('/');
        } else {
            req.flash('error', 'User is already exist');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        console.log('Error in create module', err);
        return res.redirect('back');
    }
}

// Authentication with Passport
module.exports.createSession = function (req, res) {
    req.flash('success', 'Log In Successfully');
    return res.redirect('/home');
}

//DestroySession
module.exports.destroysession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.error('errors while login-out', err);
        }
        req.flash('success', 'You have Logout Successfully');
        return res.redirect('/');
    })
}

// forget
module.exports.forgetRender = function (req, res) {
    return res.render('forget_in', {
        title: "Reset Password |"
    })
}

module.exports.reset = async function (req, res) {
    try {
        const email = req.body.email;
        const user = await Listnode.findOne({ email: email });
        if (user) {
            const String = crypto.randomBytes(10).toString('hex');
            user.token = String;
            user.save();
            console.log(user);
            forgetMailer.reset(user, String);
            req.flash('sucess', 'reset send Email');
            return res.redirect('/');
        }
    } catch (err) {
        console.log('Error in forgetgetPassword', err);
        return;
    }
}

module.exports.resetPassword = async function (req, res) {
    try {
        const token = req.query.token;
        console.log(token);
        const user = await Listnode.findOne({ token: token });
        if (user) {
            return res.render('reset_password', {
                title: 'reset Password',
                user_id: user._id // to verify the user
            });
        } else {
            //window.alert('Unauthorized !!');
            req.flash('error', 'unauthorized user');
            return res.redirect('/');
        }
    } catch (err) {
        console.log(`error in updating password ${err}`, err);
    }
}

module.exports.updatePassword = async function (req, res) {
    try {
        let id = req.body.user_id
        let user = await Listnode.findById(id);
        user.password = req.body.password;
        user.token = "";
        user.save();
        console.log(user.password);
        req.flash('success', "Upadate password Successfull");
        return res.redirect('/');
    } catch (err) {
        console.log(`error in updating password ${err}`, err);
    }
}