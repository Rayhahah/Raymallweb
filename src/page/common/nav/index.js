/**
 * Created by leizh on 2017/10/29.
 */
require('./index.css');
var _rm = require('util/rm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
    init: function () {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function () {
        $('.js-login').click(function () {
            _rm.doLogin();
        });
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.href = './index.html';
            }, function (errMsg) {
                _rm.errorTips(errMsg);
            });
        });
        $('.js-register').click(function () {
            window.location.href = './user-register.html';
        });
    },
    //加载用户信息
    loadUserInfo: function () {
        _user.checkLogin(function (res) {
            $('.user.no-login').hide()//找到节点并隐藏
                .siblings('.user.login').show()//找到兄弟节点然后显示
                .find('.username').text(res.username);//查找他的子节点并修改
        }, function (errMsg) {
            //doNothing
        });
    },
    loadCartCount: function () {
        _cart.getCartCount(function (res) {
            $('.nav .cart-count').text(res || 0);
        }, function (errMsg) {
            $('.nav .cart-count').text(0);
        });
    }
};
module.exports = nav.init();