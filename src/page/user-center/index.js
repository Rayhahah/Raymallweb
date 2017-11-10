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
    }
};

$(function () {
    page.init();
});