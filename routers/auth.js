var router = require('express').Router()
var userDao = require('../dao/usersDao')

router.post('/login', function (req, res) {
    var user = req.session.user
    if (user) {
        req.session.destroy()
    }
    userDao.userLogin(req, res)
})

router.get('/logout', function (req, res) {

})

module.exports = router