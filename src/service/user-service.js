/**
 * Created by leizh on 2017/10/29.
 */

var _rm = require('util/rm.js');
var _user = {
    //检查登陆状态
    checkLogin: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //登出
    logout: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};
module.exports = _user;
