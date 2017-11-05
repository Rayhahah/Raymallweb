
/**
 * Created by leizh on 2017/10/25.
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
require('util/rm.js');
navSide.init({
    name : 'order-list'
});