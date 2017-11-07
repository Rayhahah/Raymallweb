/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/10/31
 * @fuction
 */

require('./index.css');
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
            _this.searhSubmit();
        });
        // 输入回车做搜索提交
        $('#search-input').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.searhSubmit();
            }
        });
    },
    // 搜索的提交
    searhSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _rm.goHome();
        }
    }
};
// 不需要提供给外部调用,所有不用exports
header.init();