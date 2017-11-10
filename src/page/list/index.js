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
var Pagination = require('util/pagination/index.js');
var _rm = require('util/rm.js');
//列表模块
var templateHtml = require('./index.string');
var page = {
    data: {
        listParams: {
            keyword: _rm.getUrlParam('keyword') || '',
            categoryId: _rm.getUrlParam('categoryId') || '',
            orderBy: _rm.getUrlParam('orderBy') || 'default',
            pageNum: _rm.getUrlParam('pageNum') || 1,
            pageSize: _rm.getUrlParam('pageSize') || 20
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $('.sort-item').click(function () {
            var $this = $(this);
            _this.data.listParams.pageNum = 1;
            // 点击默认排序
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active')
                    //查找同级节点并且去除class
                        .siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParams.orderBy = 'default';
                }
            }
            //点击价格排序
            else if ($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                if (!$this.hasClass('asc')) {
                    // 点击升序
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParams.orderBy = 'price_asc';
                } else {
                    //点击降序
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParams.orderBy = 'price_desc';
                }
            }
            _this.loadList();
        });
    },
    onLoad: function () {
        this.loadList();
    },
    //加载列表数据
    loadList: function () {
        var _this = this,
            listHtml = '',
            listParams = this.data.listParams,
            $pList = $('.p-list-con');
        _rm.showLoading('.p-list-con');
        //删除参数中不必要的参数
        listParams.categoryId ? (delete listParams.keyword) : (delete listParams.categoryId);
        // 请求列表数据
        _product.getProductList(listParams, function (res, msg) {
            listHtml = _rm.renderHtml(templateHtml, {
                list: res.list
            });
            $pList.html(listHtml);
            _this.loadpagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function (errMsg) {
            _rm.errorTips(errMsg);
        });
    },
    //加载分页信息
    loadpagination: function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParams.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};
$(function () {
    page.init();
});
