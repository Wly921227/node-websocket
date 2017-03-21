var express = require('express')
var path  =require('path')

var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var session = require('express-session')

var baseUri = '/api'
var app = express()

// favicon ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
app.use(logger('dev'))

// static resources
app.use(express.static(path.join(__dirname, 'public')))

// session
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'very secret'
}))

// cookie
app.use(cookieParser())

// handle users
app.use(function (req, res, next) {
    var url = req.url
    var user = req.session.user
    if (user || url === '/api/test/getUser') {
        next()
    } else {
        res.redirect('/api/test/getUser')
    }
})

// routers handle
app.all(baseUri, function (req, res, next) {
    // TODO can't handle exist routers
    console.log('------- Routers Handle All -------')
})
// routers
var test = require('./routers/test')
app.use(baseUri + '/test', test)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    res.send({
        error: 404
    })
    next(err)
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app