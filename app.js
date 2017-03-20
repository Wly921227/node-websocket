var app = require('express')
var path  =require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')

var baseUri = '/api'

// routers handle
app.all(baseUri, function (req, res, next) {
    console.log('------- Routers Handle All -------')
    next()
})

// favicon ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))

// cookie
app.use(cookieParser())

// static resources
app.use(express.static(path.join(__dirname, 'public')))

// routers
var test = require('./routers/test')
app.use(baseUri + '/test', test)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
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