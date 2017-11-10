/**
 * Created by leizh on 2017/10/27.
 */

var Hogan = require('hogan');
var _dialog = require('util/dialog/index.js');
//服务器主机地址配置
var conf = {
    serverHost: ''
};
var _rm = {
    //异步网络请求
    request: function (params) {
        var _this = this;
        $.ajax({
            type: params.method || 'get',
            url: params.url || '',
            dataType: params.type || 'json',
            data: params.data || '',
            //请求执行成功
            success: function (res) {
                //请求成功
                if (0 === res.status) {
                    typeof params.success === 'function' && params.success(res.data, res.msg);
                }
                //需要强制登陆
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //请求数据发生错误
                else if (1 === res.status) {
                    typeof params.error === 'function' && params.error(res.msg);
                }
            },
            //请求执行失败
            error: function (err) {
                typeof params.error === 'function' && params.error(err.statusText);
            }
        });
    },
    // 获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染HTML模板
    //使用Hogan，可以去细看
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successTips: function (msg) {
        _dialog.show({
            isConfirm: false,
            message: msg || '操作成功！',
            target: 'body',
            onConfirm: function () {
                _dialog.hide();
            },
            onCancel: function () {
            }
        });
    },
    // 错误提示
    errorTips: function (msg) {
        _dialog.show({
            isConfirm: false,
            message: msg || '哪里不好了~',
            target: 'body',
            onConfirm: function () {
                _dialog.hide();
            },
            onCancel: function () {

            }
        });
    },
    //确认操作弹窗
    confirmTips: function (msg, confirm, cancel) {
        _dialog.show({
            isConfirm: true,
            message: msg || '是否确认该操作？',
            target: 'body',
            onConfirm: function () {
                _dialog.hide();
                typeof  confirm === 'function' && confirm();
            },
            onCancel: function () {
                _dialog.hide();
                typeof  cancel === 'function' && cancel();
            }
        });

        // if (window.confirm(msg || '是否确认该操作？')) {
        //     typeof  confirm === 'function' && confirm();
        // } else {
        //     typeof  cancel === 'function' && cancel();
        // }
    },
    //loading动画
    showLoading: function (target) {
        if (target instanceof jQuery) {
            target.html('<div class="loading"></div>');
        } else {
            $(target).html('<div class="loading"></div>');
        }
    },
    //显示错误提示信息
    showErrorMessage: function (target, errMsg) {
        if (target instanceof jQuery) {
            target.html('<p class="err-tip">' + errMsg + '</p>');
        } else {
            $(target).html('<p class="err-tip">' + errMsg + '</p>');
        }
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate: function (value, type) {
        var value = $.trim(value);
        // 非空验证
        if ('require' === type) {
            return !!value;
        }
        // 手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登陆请求
    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //返回首页
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _rm;




