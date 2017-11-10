/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/9
 * @fuction
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _payment = require('service/payment-service.js');
var _rm = require('util/rm.js');
var templateHtml = require('./index.string');

var page = {
    data: {
        orderNumber: ''
    },
    init: function () {
        this.data.orderNumber = _rm.getUrlParam('orderNumber');
        this.loadPaymentInfo();
    },
    //获取支付信息
    loadPaymentInfo: function () {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
        _rm.showLoading($pageWrap);
        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            console.log(res);
            paymentHtml = _rm.renderHtml(templateHtml, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function (errMsg) {
            _rm.showErrorMessage($pageWrap, errMsg);
        });
    },
    //监听订单状态
    listenOrderStatus: function () {
        var _this = this;
        window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if (res == true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            });
        }, 5000)

    }
};
$(function () {
    page.init();
});