// Step-1
const express = require('express');
const app = express();
// Step-6
const cookieParser = require('cookie-parser');
const port = 3000;

// Step-5
const expressLayouts = require('express-ejs-layouts');

// Step-7
const db = require('./config/mongoose');

// Step-8 Auhtenticate session create and cookie store
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stretegy');
const googlePassport = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');

// Step-9 Notyfiacations with noty
const flash = require('connect-flash'); 
const customMware = require('./config/middleware');

// middleware
app.use(express.urlencoded());

// cookie step-6
app.use(cookieParser());

// Step-4
app.use(express.static('./assets'));

//Step-5 Include the Css and Scripts file for sub pages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//layouts//Step-5
app.use(expressLayouts);

// Step-3 set Engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Step-8
app.use(session({
    name: 'nodejs',
    //TODO CHANGE THE SECRET BEFORE DEPLOYMENT IN PRODUCTION MODE
    secret: 'blahsome',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/insta_talked',

            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        })
}));

// Step-9
app.use(passport.initialize());
app.use(passport.session());
//After the setAuthentication function in passport-local-stretegy
app.use(passport.setAuthenticatedUser);

// use Flash
app.use(flash());
app.use(customMware.setFlash);
 
//Routes Step-2
app.use('/', require('./routes/user'));

// Step-1
app.listen(port, function (err) {
    if (err) {
        console.log('Error port server', err);
    }
    console.log(`Sucessfull server is running:${port}`);
})