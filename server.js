require('dotenv').config();
const express           = require('express');
const path              = require('path')
const bodyParser        = require('body-parser');
const flash             = require('connect-flash');
const session           = require('express-session');
const expressValidator  = require('express-validator');
const passport          = require('passport');
const cookieParser      = require('cookie-parser');
const nunjucks          = require('nunjucks');
const config            = require('./config');
const router            = require('./http/router');

let app = express();

nunjucks.configure('./views', {
    autoescape: true,
    express: app
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(flash());
app.use(cookieParser());

//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport Init
app.use(passport.initialize());
app.use(passport.session());
require('./http/authService/passport')(passport);

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Global Variable
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use(router);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err });
});

app.listen(config.port, () => {
    console.log(`server at port ${config.port}`);
});
