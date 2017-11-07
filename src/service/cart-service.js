/**
 * Created by leizh on 2017/10/29.
 */
var _rm = require('util/rm.js');
var _cart = {
    //获取当前登陆用户购物车商品数量
    getCartCount: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    },
    //添加到购物车
    addToCart: function (productInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    }
};
module.exports = _cart;
