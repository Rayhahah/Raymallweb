/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/8
 * @fuction
 */

var _rm = require('util/rm.js');
var _cities = require('util/cities/index.js');
var _address = require('service/address-service.js');
var templateAddressModal = require('./address-modal.string');

var addressModal = {
    show: function (option) {
        this.option = option;
        //初始化，防止null
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        // 渲染页面
        this.loadModal();
        //绑定事件
        this.bindEvent();
    },
    hide: function () {
        this.$modalWrap.empty();
    },
    loadModal: function () {
        var modalHtml = _rm.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(modalHtml);
        //加载省份
        this.loadProvince();
    },
    bindEvent: function () {
        var _this = this;
        // 选择框改变的情况下
        this.$modalWrap.find('#receiver-province').change(function () {
            var selectProvice = $(this).val();
            _this.loadCities(selectProvice);
        });

        //提交收货地址
        this.$modalWrap.find('.address-btn').click(function () {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            if (!isUpdate && receiverInfo.status) {
                //新增收货地址并且验证通过
                _address.save(receiverInfo.data,
                    function (res) {
                        _rm.successTips('地址添加成功');
                        _this.hide();
                        typeof  _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                    }, function (errMsg) {
                        _rm.errorTips(errMsg);
                    });
            } else if (isUpdate && receiverInfo.status) {
                //更新收货地址，并且验证通过
                _address.update(receiverInfo.data,
                    function (res) {
                        _rm.successTips('更新地址成功');
                        _this.hide();
                        typeof  _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                    }, function (errMsg) {
                        _rm.errorTips(errMsg);
                    });
            } else {
                //验证不通过
                _rm.errorTips(receiverInfo.errMsg || '好像哪里不对了~~>_<~~');
            }
        });
        //拦截事件
        this.$modalWrap.find('.modal-container').click(function (e) {
            //事件拦截,消费掉
            e.stopPropagation();
        });
        //点击蒙版和X都关闭弹窗
        this.$modalWrap.find('.close').click(function () {
            _this.hide();
        });

    },
    //加载省份信息
    loadProvince: function () {
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        //根据省份形成select html数据
        var html = this.getSelectOption(provinces);
        $provinceSelect.html(html);
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    //加载城市信息
    loadCities: function (provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity)
        }
    },
    //获取select框选项，输入数组，输出html
    getSelectOption: function (optionArray) {
        var html = '<option value="">请选择</option>';//默认样式
        for (var i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    //获取表单信息,并做表单验证
    getReceiverInfo: function () {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
        if (this.option.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        // 表单验证
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        }
        else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        }
        else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        }
        else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        }
        else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        }
        // 所有验证都通过了
        else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;


    },
};
module.exports = addressModal;