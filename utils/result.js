module.exports = {
    success: function (result) {
        return {
            code: 200,
            result: result
        }
    },
    error: function (msg) {
        return {
            code: 500,
            msg: msg
        }
    }
}