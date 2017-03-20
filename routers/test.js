var router = require('express').Router()

// test router handle
router.use(function (req, res, next) {
    console.log('--- Test Router Handle ---')
    next()
})

router.get('/', function (req, res) {
    res.send({
        test: 'hallo word!!!'
    })
})

module.exports = router