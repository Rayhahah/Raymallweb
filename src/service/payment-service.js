/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/7
 * @fuction
 */

/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/6
 * @fuction
 */

var _rm = require('util/rm.js');
var _payment = {
    //获取支付信息
    getPaymentInfo: function (orderNumber, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //获取订单支付状态
    getPaymentStatus: function (orderNumber, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};
module.exports = _payment;
