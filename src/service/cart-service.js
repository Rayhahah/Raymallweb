/**
 * Created by leizh on 2017/10/29.
 */
var _rm = require('util/rm.js');
var _cart = {
    //检查登陆状态
    getCartCount: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    }
};
module.exports = _cart;
