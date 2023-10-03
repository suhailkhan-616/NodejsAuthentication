const nodemailer = require('../config/nodemailer');

module.exports.reset = (user, token) => {
    console.log('Inside token', token);
    let htmlString = nodemailer.renderTemplate({ token: token }, '/foget-password.ejs');
    nodemailer.transporter.sendMail({
        from: "Suhailk616@gmail.com",
        to: user.email,
        subject: "Reset the password with gmail",
        html: htmlString
    }, function (err, info) {
        if (err) {
            console.log(`error in sending mail ${err}`, err);

        }
        console.log(info);
    })

}