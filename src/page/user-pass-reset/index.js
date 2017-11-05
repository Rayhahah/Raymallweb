/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/3
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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        // 输入用户名点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            _this.submitUsername(username, _this);
        });
        $('#username').keyup(function (e) {
            //回车键监听
            if (e.keyCode === 13) {
                var username = $.trim($('#username').val());
                _this.submitUsername(username, _this);
            }
        });
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            _this.submitAnswer(answer, _this);
        });
        $('#answer').keyup(function (e) {
            //回车键监听
            if (e.keyCode === 13) {
                var answer = $.trim($('#answer').val());
                _this.submitAnswer(answer, _this);
            }
        });
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            _this.submitPassword(password, _this);
        });
        $('#password').keyup(function (e) {
            //回车键监听
            if (e.keyCode === 13) {
                var password = $.trim($('#password').val());
                _this.submitPassword(password, _this);
            }
        });
    },
    // 输入用户名
    loadStepUsername: function () {
        $('.step-username').show();
    },
    // 输入密码提示问题答案
    loadStepQuestion: function () {
        formError.hide();
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    //输入新密码
    loadStepPassword: function () {
        formError.hide();
        $('.step-question').hide()
            .siblings('.step-password').show();
    },
    //提交用户名获取问题
    submitUsername: function (username, _page) {
        if (username) {
            _user.getQuestion(username, function (res) {
                _page.data.username = username;
                _page.data.question = res;
                _page.loadStepQuestion();
            }, function (errMsg) {
                formError.show(errMsg);
            });
        } else {
            formError.show('请输入用户名');
        }
    },
    //提交问题答案获取token
    submitAnswer: function (answer, _page) {
        if (answer) {
            _user.checkAnswer({
                username: _page.data.username,
                question: _page.data.question,
                answer: answer
            }, function (res) {
                _page.data.answer = answer;
                _page.data.token = res;
                _page.loadStepPassword();
            }, function (errMsg) {
                formError.show(errMsg);
            });
        } else {
            formError.show('请输入答案');
        }
    },
    //重置密码
    submitPassword: function (password, _page) {
        if (password && password.length >= 6) {
            _user.resetPassword({
                username: _page.data.username,
                passwordNew: password,
                forgetToken: _page.data.token
            }, function (res) {
                window.location.href = './result.html?type=pass-reset';
            }, function (errMsg) {
                formError.show(errMsg);
            });
        } else {
            formError.show('请输入不少于6位的新密码');
        }
    }
};
//当JQuery加载完成的时候会触发
$(function () {
    page.init();
});