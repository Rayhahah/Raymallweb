/**
 * Created by leizh on 2017/10/29.
 */

var _rm = require('util/rm.js');
var _user = {
    //用户注册
    register: function (userInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/register.do'),
            //直接指定传参的属性就是key
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //用户登录
    login: function (userInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //获取当前登陆用户信息，强制登陆
    getUserInfo: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //更新当前登陆用户个人信息
    updateUserInfo: function (userInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/update_information.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //登陆状态下更新密码
    updatePassword: function (userInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查用户名和邮箱是否合法
    checkUsername: function (username, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/check_valid.do'),
            //直接指定传参的属性就是key
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查登陆状态
    checkLogin: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //获取密码提示问题
    getQuestion: function (username, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //检查密码提示问题答案
    checkAnswer: function (userInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //忘记密码-重置密码
    resetPassword: function (userInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
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
