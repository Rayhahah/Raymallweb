/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/9
 * @fuction
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _order = require('service/order-service.js');
var navSide = require('page/common/nav-side/index.js');
var _rm = require('util/rm.js');
var templateHtml = require('./index.string');

var page = {
    data: {
        orderNumber: _rm.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //加载侧面导航栏
        navSide.init({
            name: 'order-list'

        });
        this.loadDetail();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.order-cancel', function () {
            _rm.confirmTips("确认取消订单？", function () {
                _order.cancelOrder(_this.data.orderNumber, function (res) {
                    _this.loadDetail();
                    _rm.successTips('该订单取消成功');
                }, function (errMsg) {
                    _rm.errorTips(errMsg);
                });
            });
        });
    },
    //加载订单数据
    loadDetail: function () {
        var _this = this,
            orderDatailHtml = '',
            $content = $('.content');
        _rm.showLoading($content);
        _order.getOrderDetail(this.data.orderNumber, function (res) {
            _this.dataFilter(res);
            orderDatailHtml = _rm.renderHtml(templateHtml, res);
            $content.html(orderDatailHtml);
        }, function (errMsg) {
            _rm.showErrorMessage($content, errMsg);
        });
    },
    dataFilter: function (data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};

$(function () {
    page.init();
});