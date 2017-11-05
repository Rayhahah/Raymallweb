/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/2
 * @fuction
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
        // 验证username
        //失去焦点的时候触发
        $('#username').blur(function () {
            //这个触发里面this指向username控件本身
            var username = $.trim($(this).val());
            if (!username) {
                //用户名为空就不做验证
                return;
            }
            _user.checkUsername(username, function (res) {
                formError.hide();
            }, function (errMsg) {
                formError.show(errMsg);
            })
        });
        // 注册按钮
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
                password: $.trim($('#password').val()),
                passwordConfirm: $.trim($('#password-confirm').val()),
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            },
            //表单验证结果
            validateResult = this.formValidate(formData);
        if (validateResult.status) {
            // 验证成功
            _user.register(formData, function (res) {
                window.location.href = './result.html?type=register';
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
        // 验证密码长度
        if (formData.password.length < 6) {
            result.msg = '密码长度不能少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 验证手机号
        if (!_rm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if (!_rm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if (!_rm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if (!_rm.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = "验证通过";
        return result;
    }
};
//当JQuery加载完成的时候会触发
$(function () {
    page.init();
});