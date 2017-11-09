/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/4
 * @fuction
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _user = require('service/user-service.js');
var navSide = require('page/common/nav-side/index.js');
var _rm = require('util/rm.js');
var templateHtml = require('./index.string');
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
                    phone: $.trim($('#phone').val()),
                    email: $.trim($('#email').val()),
                    question: $.trim($('#question').val()),
                    answer: $.trim($('#answer').val())
                },
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function (res, msg) {
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
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function () {

        var userHtml = '';
        _rm.showLoading('.panel-body');
        _user.getUserInfo(function (res) {
            userHtml = _rm.renderHtml(templateHtml, res);
            $('.panel-body').html(userHtml)
        }, function (errMsg) {
            _rm.errorTips(errMsg);
        });
    },
    //验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
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
    },
};

$(function () {
    page.init();
});