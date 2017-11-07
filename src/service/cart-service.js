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
    },
    //添加到购物车
    getCartList: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    //选择购物车商品
    selectProduct: function (productId, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    //取消选择购物车商品
    unselectProduct: function (productId, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    //全选商品
    selectAllProduct: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    //取消全选
    unselectAllProduct: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    //更新购物车商品数量
    updateProduct: function (productInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    //删除购物车中指定商品
    deleteCartProduct: function (productIds, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        });
    },
};
module.exports = _cart;
