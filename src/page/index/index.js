/**
 * Created by leizh on 2017/10/25.
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateBanner = require('./banner.string');
require('util/slider/index.js');
var _rm = require('util/rm.js');


$(function () {
    _rm.showLoading('.banner-con');
    // 渲染banner的HTML
    var bannerHtml = _rm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 轮播图初始化
    var $slider = $('.banner').unslider({
        speed: 500,   // 轮播图速度
        delay: 3000,  //轮播图间隔
        dots: true //导航小圆点
    });
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        //unslider给出的使用方法，动态根据字符串来确定function
        $slider.data('unslider')[forward]();
    });
});









