/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/6
 * @fuction
 */

require('./index.css');
var _rm = require('util/rm.js');
var templatePagination = require('./index.string');

var Pagination = function () {
    var _this = this;
    this.defaultOptions = {
        container: null,
        pageNum: 1,
        //缓存的页数
        pageRange: 4,
        onSelectPage: null
    };
    //使用事件代理，因为添加事件的时候结构还没生成
    $(document).on('click','.pg-item',function () {
       var $this = $(this);

        if ($this.hasClass('disabled') || $this.hasClass('active')) {
            return;
        }

        if (typeof _this.option.onSelectPage === 'function') {
            _this.option.onSelectPage($this.data('value'));
        }
    });
};

//渲染分页组件
//原型集成，如此定义的方法在以后的实现里面都是可以继承这些方法
Pagination.prototype.render = function (userOptions) {
    //拓展原型，把后面的对象原型都赋予到第一个上面，会覆盖修改
    //只会对第一层属性生效
    //都覆盖在空对象上，就不会对原对象有影响了
    this.option = $.extend({}, this.defaultOptions, userOptions);
    //判断容器是否为合法的jQuery对象
    //!的优先级大于instanceof
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    // //不需要分页
    if (this.option.pages <= 1) {
        return;
    }
    // 渲染分页
    this.option.container.html(this.getPaginationHtml());
};
//获取分页Html
//样式： |上一页| 1 2 3 4 5 6 |下一页|  5/9
Pagination.prototype.getPaginationHtml = function () {
    var html = '',
        option = this.option,
        pageArray = [],
        //显示的第一个页码
        start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
        //显示的最后一个页码
        end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;

    //填充上一页数据
    pageArray.push({
        name: '上一页',
        value: this.option.prePage,
        disabled: !this.option.hasPreviousPage
    });

    //填充页码数据
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            //是否当前选中
            active: (i === option.pageNum)
        });
    }

    // 填充下一页
    pageArray.push({
        name: '下一页',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    });

    // 渲染
    html = _rm.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });

    return html;
};

module.exports = Pagination;