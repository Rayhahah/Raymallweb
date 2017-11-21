# Raymallweb---一个很无聊的商城项目
> 一个基于common.js规范，webpack打包的jQuery商城平台前台项目

## 概述
这个是我自己学习开发前端页面，同时完成整个项目的搭建，从初始化到上线发布，框架仅使用了jQuery,没有使用当红的一些框架，甚至没有使用样式框架如Bootstrap
为的就是学习了解一个纯正原生的前端开发过程。总之收获满满，非常开心哈哈哈哈

下面是学习过程中的一些笔记，也放这里吧哈哈哈哈哈
## 架构设计
- 分层架构
	- 解耦（可服用）
	- MVC、MVVM
- 模块化
	- 解耦，并行开发
	- AMD、CMD、CommonJS、ES6

### 开发环境
#### Node.js 和npm
- JS的运行环境
- 构建工具WebPack的环境依赖
- 单线程、异步编程

npm：Node Package Manager

#### Chrome调试
- Element : 网页标签结构元素
- Console : 打印日志
- NetWork : 网络以及资源的请求
- Sources ； 网页请求的所有文件，可以在里面打断点
- Application : 查看本地的一些保存信息

#### 项目分包版本管理

#### npm、webpack
npm
- `npm init` : 在项目根目录初始化
- `npm install xxx@v.v.v`
- `npm uninstall xxx@v.v.v`
- `-g` : 全局配置
- `--registry==https://registry.npm.taobao.org` : 指向淘宝npm源，速度快很多

```
npm config set registry https://registry.npm.taobao.org 
npm info underscore （如果上面配置正确这个命令会有字符串response）
```

- `npm run script` : 运行自己的快捷脚本，在script里面配置

webpack
- 加载方式 ： 各种loader插件
- 编译方式：commonjs模块-> function类型模块
- [官网Github](https://github.com/webpack/webpack)
- `npm install webpack -g`: 全局webpack安装
- `npm install webpack@1.15.0 --save-dev`

--save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。

webpack2.x版本会生成一条引用object.default的语句会在IE8中报错

`webpack.config.js`
- `entry` : js的入口文件
- `externals` : 外部依赖的声明
- `output` : 目标文件
- `resolve` : 配置别名
- `module` : 各种文件，各种loader
- `plugin` ： 插件

常用loader
- `html` : `html-webpack-plugin`/ `html-loader`
- `js` : `babel-loader ` + `babel-preset-es2015`
- `css` : `style-loader`+ `css-loader`
- `img`+`font` : `url-loader`

常用命令
- `webpack` : 移步压缩的形式来打包，调试代码用
- `webpack -p` : 压缩的形式来打包，常用于环境的发布
- `webpack --watch` : 监听文件改变，用于开发过程
- `webpack --config webpack.config.js ` : 指定webpack配置文件

`webpack-dev-server`
- 作用：前端开发服务器
- 特点：可以在文件改变是，自动刷新浏览器
- 安装：`npm install webpack-dev-server --save-dev`
- 在webpack配置文件中添加：`webpack-dev-server/client?http://localhost:8080`
- 使用：`webpack-dev-server --port 8088 inline`

#### 脚本处理问题
- Js用什么loader加载
	- 考虑到IE8的兼容性问题，不使用babel-loader
	- 使用webpack原生的js加载
- 官方entry只有一个js，有多个怎么办
	- 具体可以看raymall项目的`webpack.config.js`有丰满的注释
- output要分文件夹存放文件，要怎么设置
	- 在`filename`前面加上文件夹名字就可以了
- jquery引入方法
	- 第一种：下面是基本步骤 ： 这种还是比较繁琐的，因为每次都要引入
	- `npm install jquery --save` : npm的方式安装jquery
	- `var $ = require('jquery');`
	- `$('body').html("hello");`
	- 第二种：直接在入口的html引入就可以了
	- 第三种`webpack.config`里面的`externals`配置`jquery`,然后通过`jquery使用`
- 想要提取公共模块
	- 使用`CommonsChunkPlugin`[官网使用指南](http://webpack.github.io/docs/list-of-plugins.html)
	- 配置：看`webpack.config`里面plugin的配置
	- 这里不是很懂使用的必要性和简便性


#### 样式处理问题
- csss使用什么loader
	- `css-loader`和`style-loader`
- webpack打包的css要如何独立成单独文件
	- 百度webpack css独立打包

#### html模板处理
`npm install html-webpack-plugin --save-dev`
`npm install html-loader --save-dev` : 支持EJS语法，公共标签的引用
- 用法：`<%= require('html-loader!./layout/html-head.html') %>`

将html打包到dist下

图片和字体的处理
针对webpack@1.15.0 
需要先安装
`npm install file-loader@0.11.1 --save-dev`
然后再安装
`npm install url-loader --save-dev`
否则会报错，版本不够
`url-loader` : 图片和字体资源等的打包

#### webpack-dev-server
>热编译服务器，让前端调试更加轻松
通过配置config的变量来控制开发环境和正式环境的是否启动
`npm install webpack-dev-server@1.16.5 --save-dev`
`npm install webpack-dev-server@1.16.5 -g` : 全局安装

`webpack-dev-server --inline --port 8088` : 指定端口自定义启动

webstrom/idea保存不更新webpack-dev的方法：`setting->System settings->取消勾选Use 'safe write'` : 也就是不保存到idea的缓存临时文件

```
这个配置也可以让wds刷新快一点
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
```

#### font-awesome
字体图标库
`npm install font-awesome --save`

## 通用封装

### Hogan
- `{{}}` : 带转义的显示信息
- `{{{}}}` : 不带转移的，用于显示数据就是html格式的
- `{{#imageList}} {{/imageList}}` : 遍历imageList集合， `{{.}}` 表示集中的item

```
  <ul class="p-img-list">
                {{#subImages}}
                  <li class="p-img-item">
		       <img class="p-img" src="{{imageHost}}{{.}}" alt="{{name}}"/>
                   </li>
                {{/subImages}}
            </ul>
```

- `{{^title}} message{{title}}`表示 title不存在的时候显示message
- ``

### 通用js工具封装
- 网络请求工具
- URL路径工具
- 模板渲染工具-hogan
- 字段验证 && 通用提示
- 统一跳转

### 页面布局
- 定宽布局
- 通用部分的抽离
	- 通用导航
	- 通用头部
	- 通用footer
	- 通用侧面导航
	- 通过结果返回页面
- icon-font的引入
- 通用样式




##业务开发
###  用户模块
- 页面
	- 用户登录
	- 用户注册
	- 找回密码
	- 个人中心
	- 修改密码
- 数据安全性处理方案
- 表单同步/异步验证
- 小型SPA开发
- 事件委托、事件绑定、事件监听
- hogan模板的使用
### 商品模块
知识点
- jQuery插件模块化改造 
	- 轮播图插件的封装使用
- 独立组件抽离技巧
	- 分页组件
- 多功能列表开发
- 原型、原型链

首页功能点：
- 推荐搜索关键字的快捷链接
- 活动展示的轮播图
- 分楼层的商品分类信息

列表页功能点
- 列表展示
- 排序
- 分页处理

详情页
- 信息展示
- 缩略图
- 添加购物车


### 购物车模块
- 商品状态随时验证
- 模块内部方法调用
- 非Form提交时的数据验证

功能点：
- 购物车商品展示
- 修改购物车数量
- 选择和取消选择，全选，反选，商品
- 结算

### 订单模块
- Modal式组件封装思想
- 城市级联操作
-  复杂表单回填

页面
- 订单页
	- 地址管理（crud）
	- 订单信息展示
	- 订单提交
- 订单列表页
- 订单详情页
	- 订单详细信息
	- 未支付订单可以继续支付
	- 取消订单

### 支付模块
- 支付宝功能对接
- 支付宝状态动态监测
- 支付成功回调

## 生产环境适配
- 添加favicon
	- `Html-webpack-plugin`：添加`favicon`的配置
- 线上域名分离，HTML路径简化
- 添加DNS-prefetch
	-就是当你浏览网页时，浏览器会加载网页时对网页中的域名进行解析缓存，这样在你单击当前网页链接无需DNS解析，减少等待时间
	- 在`head-common`添加配置，把需要引用的文件域名都添加进去
- 对线上打包结果做回归测试

### 访问数据分析
- PV：页面打开次数
- UV： 一个人一个是时间无论打开多少页面都算一个UV
- VV : 用户进入网站到离开，算一次VV
- 流量来源监控：
- 搜索关键词来源：
- 用户设备信息：通过屏幕分辨率，浏览器版本等分析出来
- 用户特征分析

### SEO优化
- SEO优化技巧
	- 增加页面数量
	- 减少页面层级
	- 关键词密度
	- 高质量友链
	- 分析竞争对手
	- SEO监控
- 关键词设计
	- 品牌关键词：Raymall、Raymall电商...
	- 高频关键词：电商平台、手机、笔记本电脑、相机、手表...
	- 长尾关键词：肚子疼了怎么办，什么东西便宜
- SEO监控  
- 百度统计 ： 数据超多，基本能够满足需求
	1. 添加域名
	2. 获取js代码，添加到head-common中

### 可用性网站监控
- 外部监控原理
- 第三方监控的设置
- 更高级的监控方式


