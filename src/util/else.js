/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/6
 * @fuction
 */

var _elseutil = {
    //批量下载图片资源
    downloadPics: function (imgHost, urls) {
        urls.map(function (i) {
            var a = document.createElement('a');
            a.setAttribute('download', '');
            a.href = imgHost + i;
            document.body.appendChild(a);
            a.click();
        })
    }
};
module.exports = _elseutil;