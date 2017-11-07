/**
 * Created by leizh on 2017/10/25.
 */

require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _rm = require('util/rm.js');
// 表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

//page逻辑部分
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $('#submit').click(function () {
            _this.submit();
        });
        $('.user-content').keyup(function (e) {
            //回车键监听
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit: function () {
        var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val())
            },
            //表单验证结果
            validateResult = this.formValidate(formData);
        if (validateResult.status) {
            // 验证成功
            _user.login(formData, function (res) {
                window.location.href = _rm.getUrlParam('redirect') || './index.html';
            }, function (err) {
                formError.show(err);
            });
        } else {
            // 验证失败
            formError.show(validateResult.msg);
        }
    },
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_rm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_rm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = "验证通过";
        return result;
    }
};
//当JQuery加载完成的时候会触发
$(function () {
    page.init();
});