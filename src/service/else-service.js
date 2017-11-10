/**
 * @author Rayhahah
 * @blog http://rayhahah.com
 * @time 2017/11/6
 * @fuction
 */

var _else = {

    bindEvent: function () {
        $('.download').click(function () {
            //登陆后台测试服务器
            _product.loginManageUser('admin', 'admin', function (res) {
                _product.getManageList(100, 1, function (res) {
                    for (var i = 0; i < res.list.length; i++) {
                        if (res.list[i].status !== 1) {
                            continue;
                        }
                        //获取商品详情
                        _product.getProductDetail(res.list[i].id, function (data) {
                            listProduct.push({
                                categoryId: data.categoryId,
                                name: data.name,
                                subtitle: data.subtitle,
                                mainImage: data.mainImage,
                                subImages: data.subImages,
                                detail: data.detail,
                                stock: data.stock,
                                status: data.status,
                                price: data.price
                            });
                        }, function (errMsg) {
                        });
                    }
                }, function (errMsg) {
                    _rm.errorTips(errMsg);
                })
            }, function (errMsg) {
                _rm.errorTips(errMsg);
            })
        });

        $('.insert').click(function () {
            _product.loginRaymallUser(function (res) {
                for (var i = 0; i < listProduct.length; i++) {
                    //插入商品到Raymall
                    _product.saveRaymallProduct({
                        categoryId: listProduct[i].categoryId,
                        name: listProduct[i].name,
                        subtitle: listProduct[i].subtitle,
                        mainImage: listProduct[i].mainImage,
                        subImages: listProduct[i].subImages,
                        detail: listProduct[i].detail,
                        stock: listProduct[i].stock,
                        status: listProduct[i].status,
                        price: listProduct[i].price
                    }, function (res) {
                    }, function (errMsg) {

                    });
                }
            }, function (errMsg) {

            });
        });
    },
    saveRaymallProduct: function (productInfo, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/manage/product/save.do'),
            //直接指定传参的属性就是key
            data: productInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    loginRaymallUser: function (resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/user/login.do'),
            //直接指定传参的属性就是key
            data: {
                username: 'rayhahah',
                password: '19940531'
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    loginManageUser: function (username, password, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/manage/user/login.do'),
            //直接指定传参的属性就是key
            data: {
                username: username,
                password: password
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    getManageList: function (pageSize, pageNum, resolve, reject) {
        _rm.request({
            url: _rm.getServerUrl('/manage/product/list.do'),
            //直接指定传参的属性就是key
            data: {
                pageNum: pageNum,
                pageSize: pageSize
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
};
module.exports = _else;