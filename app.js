var express = require('express')
var path = require('path')

var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

var baseUri = '/api'
var app = express()

// favicon ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
app.use(logger('dev'))

// static resources
app.use(express.static(path.join(__dirname, 'public')))

// request json data 解析
app.use(bodyParser.json({limit: '2mb'}))   //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}))

// session
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'very secret'
}))

// cookie
app.use(cookieParser())

// handle users
var RT = require('./utils/result')
app.use(function (req, res, next) {
    var url = req.url
    var user = req.session.user
    if (url.indexOf(baseUri + '/auth/login') !== -1) {
        next()
    } else if (user) {
        next()
    } else {
        // TODO return to login page
        res.json(RT.error('unLogin'))
    }
})

// routers handle
app.all(baseUri, function (req, res, next) {
    // TODO can't handle exist routers
    console.log('------- Routers Handle All -------')
})
// routers
// var test = require('./routers/test')
// app.use(baseUri + '/test', test)
var auth = require('./routers/auth')
app.use(baseUri + '/auth', auth)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    res.json(RT.error('404'))
    next(err)
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development

    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json(RT.error('404'))
})

module.exports = app