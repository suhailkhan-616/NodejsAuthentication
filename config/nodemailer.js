const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "Suhailk616@gmail.com",
        pass: 'cvao hjpo bcbg wwmy'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, "../views/mailer", relativePath),
        data,
        function (err, template) {
            if (err) { console.log('Error found in renderTemplete'); return }

            mailHTML = template;
        });
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}