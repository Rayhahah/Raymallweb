/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/10/31
 * @fuction
 */

require('./index.css');
var _rm = require('util/rm.js');
// 使用hogan渲染的模板
var templateIndex = require('./index.string');
// 侧边导航栏
var navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html'},
            {name: 'about', desc: '关于Raymall', href: './about.html'}
        ]
    },
    init: function (option) {
        //拓展原型，把后面的对象原型都赋予到第一个上面，会覆盖修改
        //只会对第一层属性生效
        // $.extend(dest,src1,src2,src3....)
        //合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav: function () {
        //计算active数据
        for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        // 渲染数据
        var navHtml = _rm.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        //把html放入容器
        $('.nav-side').html(navHtml);
    }
};
module.exports = navSide;