/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/10/31
 * @fuction
 */

require('./index.css');
var _sticky = require('util/sticky-search/index.js');
var _rm = require('util/rm.js');
var header = {
    init: function () {
        this.bindEvent();
        this.onload();
    },
    onload: function () {
        var keyword = _rm.getUrlParam('keyword');
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function () {
        var _this = this;
        $('#search-btn').click(function () {
            var keyword = $.trim($('#search-input').val());
            _this.searhSubmit(keyword);
        });
        // 输入回车做搜索提交
        $('#search-input').keyup(function (e) {
            if (e.keyCode === 13) {
                var keyword = $.trim($('#search-input').val());
                _this.searhSubmit(keyword);
            }
        });
        _sticky.initSticky('请输入要商品名称', _rm.getUrlParam('keyword'), '.header', function (key) {
            _this.searhSubmit(key);
        });
    },
    // 搜索的提交
    searhSubmit: function (keyword) {
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _rm.goHome();
        }
    }
};
// 不需要提供给外部调用,所有不用exports
header.init();