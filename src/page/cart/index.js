/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/7
 * @fuction
 */
require('./index.css');
require('page/common/header/index.js');
var _nav = require('page/common/nav/index.js');
var _rm = require('util/rm.js');
var _cart = require('service/cart-service.js');
var templateHtml = require('./index.string');

var page = {
    data: {},
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    //加载购物车信息
    loadCart: function () {
        var _this = this;
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    },
    onLoad: function () {
        this.loadCart();
    },
    showCartError: function () {
        _rm.showErrorMessage('.page-wrap','哪里不对了，刷新一下吧~~>_<~~');
    },
    bindEvent: function () {
        var _this = this;
        // 商品选择/取消选择
        $(document).on('click', '.cart-select', function () {
            var $this = $(this),
                //parent表示找到直接的父节点，parents表示顺着往上找父节点
                productId = $this.parents('.cart-table').data('product-id');
            if ($this.is(':checked')) {
                // 选中
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            } else {
                // 取消选中
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
        });
        // 全选/取消全选
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);
            if ($this.is(':checked')) {
                // 全选
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            } else {
                // 取消全选
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
        });
        // 商品数量变化
        $(document).on('click', '.count-btn', function () {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currentCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;
            if (type === 'plus') {
                if (currentCount >= maxCount) {
                    // _rm.errorTips('该商品数量达到上限');
                    return;
                }
                newCount = currentCount + 1;
            } else if (type === 'minus') {
                if (currentCount <= minCount) {
                    return;
                }
                newCount = currentCount - 1;
            }
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function (res) {
                _this.renderCart(res);
            }, function (errMsg) {
                _this.showCartError();
            });
        });
        //单个商品删除
        $(document).on('click', '.cart-delete', function () {
            var $this = $(this);
            _rm.confirmTips('确认要删除该商品吗？', function () {
                var productId = $this.parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            });
        });
        //删除选中的商品
        $(document).on('click', '.delete-selected', function () {
            _rm.confirmTips('确认要删除选中的商品吗？', function () {
                var arrProductIds = [],
                    //:checked 表示取出所有属性为checked 的节点 ，返回一个节点数组
                    $selectedItem = $('.cart-select:checked');
                for (var i = 0, iLength = $selectedItem.length; i < iLength; i++) {
                    //这个时候的$selectedItem[i]已经不是jQuery对象了，所以需要重新包裹一层jQuery来操作
                    //获取每一个id
                    arrProductIds.push($($selectedItem[i])
                        .parents('.cart-table').data('product-id'));
                }
                if (arrProductIds.length) {
                    //拼接数组形成字符串，中间介个是 ，  逗号
                    _this.deleteCartProduct(arrProductIds.join(','));
                } else {
                    _rm.errorTips('您还没选择要删除的商品');
                }
            });
        });

        // 提交购物车

        $(document).on('click', '.btn-submit', function () {
            // 总价大于0就提交
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './order-confirm.html';
            } else {
                _rm.errorTips('请选中商品后提交');
            }
        });
    },
    // 渲染购物车html
    renderCart: function (data) {
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        var cartHtml = _rm.renderHtml(templateHtml, data);
        $('.page-wrap').html(cartHtml);
        //通知导航购物车更新
        _nav.loadCartCount();
    },
    // 删除指定商品，支持批量，ex:productId,productId2,....
    deleteCartProduct: function (productIds) {
        var _this = this;
        _cart.deleteCartProduct(productIds, function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    },
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
        for (var i = 0; i < data.cartProductVoList.length; i++) {
            if (data.cartProductVoList[i].quantity < data.cartProductVoList[i].productStock) {
                data.cartProductVoList[i].hasNext = true;
            }
            if (data.cartProductVoList[i].quantity > 1) {
                data.cartProductVoList[i].hasPrevious = true;
            }
        }
    }
};
$(function () {
    page.init();
});

