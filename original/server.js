var csrf = require('csurf')
var bodyParser = require('body-parser')
var express = require('express')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var applicationRouter = require("./routes")

// setup body parsing
var parseJson = bodyParser.json()
var parseUrlencoded = bodyParser.urlencoded()

// create a group
var parseBody = [parseJson, parseUrlencoded]

var sessionHandler = session({
    secret: 'secret!', 
    saveUninitialized: true, 
    resave: false, 
    cookie: { maxAge: 7*24*60*60*1000 }
});

// setup express
var app = express()

app.use(express.static(__dirname + '/public')) // lookups for static files
app.use(sessionHandler) // user sessions
app.use(parseBody)

// CSRF Protection:
app.use(cookieParser());

/*
 * for the demo
 * comment \ uncomment the following 
 */ 
// app.use(csrf({ cookie:true }));

// app urls
app.use(applicationRouter)

// handle csrf errors specifically
app.use(function(err, req, res, next) {
    
    if (err.code === 'EBADCSRFTOKEN') 
        res.status(403).json({"error": "session has expired or tampered with"});
    
    else 
        return next(err);
});

app.listen(3000)
