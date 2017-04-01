module.exports = {
    success: function (result) {
        return {
            code: 200,
            success: true,
            result: result
        }
    },
    error: function (msg) {
        return {
            code: 500,
            success: false,
            msg: msg
        }
    }
}