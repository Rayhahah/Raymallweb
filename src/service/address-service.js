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
var _address = {
    //获取用户地址信息
    getAddressList: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50,
                pageNum: 1
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //新增收货地址
    save: function (addressInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //获取地址详细信息
    getAddress: function (shippingId, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //更新地址信息
    update: function (shippingInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/shipping/update.do'),
            data: shippingInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //删除收货地址
    deleteAddress: function (shippingId, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};
module.exports = _address;
