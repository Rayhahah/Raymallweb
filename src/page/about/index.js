/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/10
 * @fuction
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _rm = require('util/rm.js');
var navSide = require('page/common/nav-side/index.js');
var about = {
    init: function () {
        //加载侧面导航栏
        navSide.init({
            name: 'about'
        });
    }
};

$(function () {
    about.init();
});
