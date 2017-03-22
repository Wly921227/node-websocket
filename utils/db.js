var mysql = require('mysql')
var _ = require('lodash')
var config = require('../conf/config')

var pool = mysql.createPool(_.extend({}, config.mysql))

module.exports = {
    query: function () {
        var args = Array.prototype.splice.call(arguments, 0, arguments.length - 1)
        var F = arguments[arguments.length - 1]
        pool.getConnection(function (err, connection) {
            var func = function (err, result) {
                if (typeof F === 'function') {
                    F(err, result)
                }
                // connection.release()
                if (err) {
                    throw err
                }
            }
            connection.query.apply(connection, args.concat(func))
        })
    }
}