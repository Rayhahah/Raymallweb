/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/9
 * @fuction
 */

require('./index.css');
var Hogan = require('hogan');
var templateDialog = require('./index.string');

var searchSticky = {
    data: {
        tips: '请输入...',
        key: ''
    },
    initSticky: function (tips, keyword, targetDiv, submit) {
        var _this = this;
        $(document).on('click', '#sticky-btn', function () {
            var keyword = $.trim($('#sticky-input').val());
            typeof  submit === 'function' && submit(keyword);
        });
        // 输入回车做搜索提交
        $(document).on('keyup', '#sticky-input', function (e) {
            if (e.keyCode === 13) {
                var keyword = $.trim($('#sticky-input').val());
                typeof  submit === 'function' && submit(keyword);
            }
        });
        $(document).on('click', '.sticky-logo', function () {
            window.location.href = './index.html';
        });
        //页面滑动监听
        $(window).scroll(function (event) {
            var scrollTop = $(document).scrollTop();
            if (targetDiv instanceof jQuery) {
                var marginTop = targetDiv.offset().top;
                //获取真实可见的高度
                var outerHeight = targetDiv.outerHeight(true);
            } else {
                var marginTop = $(targetDiv).offset().top;
                //获取真实可见的高度
                var outerHeight = $(targetDiv).outerHeight(true);
            }
            //显示粘性搜索条
            if (scrollTop >= marginTop + outerHeight) {
                _this.show(tips, 'body', keyword || '');
            } else {
                _this.hide();
            }
        });

    },
    //显示粘性搜索栏
    show: function (tips, target, key) {
        this.data.tips = tips;
        this.data.key = key;
        this.$target = $(target);
        this.loadStickySearch();
    },
    //隐藏粘性搜索栏
    hide: function () {
        $('.sticky-search-con').animate({
            opacity: '0',
            margin: '0'
        }, 200, 'swing', function () {
            $('div').remove('.sticky-search-wrap');
        });
    },
    loadStickySearch: function () {
        if ($('.sticky-search-wrap').length && $('.sticky-search-wrap').length > 0) {
        } else {
            var stickyHtml = this.renderHtml(templateDialog, {
                tips: this.data.tips
            });
            this.$target.append(stickyHtml);
            $('.sticky-search-con').animate({
                opacity: '1',
                margin: '10px 0'
            }, 500, 'swing');
        }
        if (!$('#sticky-input').val()) {
            $('#sticky-input').val(this.data.key || '');
        }
    },
    //渲染HTML模板
    //使用Hogan，可以去细看
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    }
};
module.exports = searchSticky;