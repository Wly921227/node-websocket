var router = require('express').Router()
var userDao = require('../dao/usersDao')
var RT = require('../utils/result')

router.get('/getUser', function (req, res) {
    var user = req.session.user
    if (user) {
        res.json(RT.success('login'))
    }
})

router.post('/login', function (req, res) {
    // var user = req.session.user
    // if (user) {
    //     req.session.user.destroy()
    // }
    userDao.userLogin(req, res)
})

router.get('/logout', function (req, res) {

})

module.exports = router