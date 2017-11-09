/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/6
 * @fuction
 */

var _rm = require('util/rm.js');
var _product = {
    //获取产品列表
    getProductList: function (listParams, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/product/list.do'),
            //直接指定传参的属性就是key
            data: listParams,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    //获取产品详情
    getProductDetail: function (productId, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/product/detail.do'),
            //直接指定传参的属性就是key
            data: {
                productId: productId
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};
module.exports = _product;
