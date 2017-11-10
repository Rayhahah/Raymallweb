/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/10/31
 * @fuction
 */

require('./index.css');
require('page/common/nav-simple/index.js');
var _rm = require('util/rm.js');

$(function () {
    var type = _rm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success').show();
    if (type === 'payment') {
        var orderNumber = _rm.getUrlParam('orderNumber') || '',
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
});