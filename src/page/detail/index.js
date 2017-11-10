/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/6
 * @fuction
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var _rm = require('util/rm.js');
var templateHtml = require('./index.string');

var page = {
    data: {
        productId: _rm.getUrlParam('productId') || ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        if (!this.data.productId) {
            _rm.goHome();
            return;
        }
        this.loadDetail();
    },
    bindEvent: function () {
        var _this = this;
        // 图片预览
        // 当前版本jQuery不能使用hover，使用mouseenter（鼠标进入）来代替
        $(document).on('mouseenter', '.p-img-item', function () {
            $(this).addClass('select')
                .siblings('.p-img-item').removeClass('select');
            var imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imgUrl);
        });
        //购买数量点击
        $(document).on('click', '.p-count-btn', function () {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                currentCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = _this.data.detailInfo.stock || 1;
            if (type === 'plus') {
                if (currentCount >= maxCount) {
                    return;
                }
                $pCount.val(currentCount + 1);
            } else if (type === 'minus') {
                if (currentCount <= minCount) {
                    return;
                }
                $pCount.val(currentCount - 1);
            }
            _this.refreshCountBtn($pCount.val(), maxCount);
        });
        //添加购物车点击
        $(document).on('click', '.cart-add', function () {
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function (res) {
                window.location.href = './result.html?type=cart-add';
            }, function (errMsg) {
                _rm.errorTips(errMsg);
            });
        });
    },
    //加载商品详细信息
    loadDetail: function () {
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        _rm.showLoading('.page-wrap');
        //请求商品详细信息
        _product.getProductDetail(this.data.productId, function (res) {
            // 缓存数据
            _this.data.detailInfo = res;
            _this.filter(res);
            html = _rm.renderHtml(templateHtml, res);
            $pageWrap.html(html);
            _this.refreshCountBtn($('.p-count').val(), res.stock);
        }, function (errMsg) {
            _rm.showErrorMessage($pageWrap,'此商品太淘气找不到了');
        })
    },
    // 数据匹配
    filter: function (data) {
        // 因为是引用传递，所以不需要返回
        data.subImages = data.subImages.split(',');
    },
    refreshCountBtn: function (currentCount, maxCount) {
        if (parseInt(currentCount) === 1) {
            $('.minus').addClass('full');
        } else if (parseInt(currentCount) === maxCount) {
            $('.plus').addClass('full');
        } else {
            $('.plus').removeClass('full');
            $('.minus').removeClass('full');
        }
    }
};
$(function () {
    page.init();
});

