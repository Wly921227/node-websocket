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
    },
    userLogin: function (req, res) {
        var u_name = req.body.uname
        var u_pd = req.body.upassword
        if (!u_name) {
            res.json(RT.error('请输入用户名'))
        }
        if (!u_pd) {
            res.json(RT.error('请输入密码'))
        }
        db.query(sql.getUserByName, [u_name],function (err, result) {
            console.log('userLogin result is: ', result)
            if (result) {
                var user = result[0]
                if (user && user.u_pd === u_pd) {
                    var userInfo = {
                        uId: user.u_id,
                        uName: user.u_name,
                        uNickName: user.u_nickname
                    }
                    req.session.user = userInfo

                    console.log('return result is: ', RT.success(userInfo))
                    res.send(RT.success(userInfo))
                } else {
                    res.send(RT.error('用户名不存在或密码错误'))
                }
            } else {
                res.send(RT.error('用户名不存在或密码错误'))
            }
        })
    }
}