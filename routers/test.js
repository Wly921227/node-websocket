var router = require('express').Router()
var usersDao = require('../dao/usersDao')

// test router handle
// router.use(function (req, res, next) {
//     console.log('--- Test Router Handle ---')
//     next()
// })

router.get('/', function (req, res) {
    res.send({
        test: 'hallo word!!!'
    })
})

router.get('/getUser', function (req, res) {
    usersDao.getAllUsers(req, res)
})

module.exports = router