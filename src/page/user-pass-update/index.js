/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/5
 * @fuction
 */


require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var _rm = require('util/rm.js');
var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //因为在绑定的时候btn还没渲染，所以对事件来进行监听
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                    password: $.trim($('#password').val()),
                    passwordNew: $.trim($('#password-new').val()),
                    passwordConfirm: $.trim($('#password-confirm').val())
                },
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function (res, msg) {
                    _rm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function (errMsg) {
                    _rm.errorTips(errMsg);
                });
            } else {
                _rm.errorTips(validateResult.msg);
            }
        });
    },
    onLoad: function () {
        //加载侧面导航栏
        navSide.init({
            name: 'user-pass-update'
        });
    },
    //验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        // 验证原密码是否为空
        if (!_rm.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '密码长度要大于6位';
            return result;
        }
        // 验证密码提示问题是否为空
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入密码不一致';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = "验证通过";
        return result;
    }
};

$(function () {
    page.init();
});