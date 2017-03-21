var db = require('../utils/db')
var RT = require('../utils/result')
var sql = require('../mapping/users')

module.exports = {
    getAllUsers: function (req, res) {
        db.query(sql.getAllUsers, function (err, result) {
            if (result) {
                res.json(RT.success(result))
            } else {
                res.json(RT.error('连接失败'))
            }
        })
    }
}