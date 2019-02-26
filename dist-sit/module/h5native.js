function getCurNativeType() {
  // 1 => Android ;  2 => iOS ; 0 => 其它

  let u = navigator.userAgent;

  var isAndroid = (u.indexOf("Android") > -1 || u.indexOf("Adr") > -1 || u.indexOf("android") > -1);

  if (isAndroid) return 1;


  var isiOS = (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ||
    u.indexOf("iOS") > -1);

  if (isiOS) return 2;
  else return 0;

};

//跳过回调事件
function cbGoNextSetp() {
  //   console.log(1234)
  // 登录成功的代码复
  let jsonData = localStorage.getItem("personInfo");
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.loginSuccess.postMessage(jsonData);
  } else {
    android.loginSuccess(jsonData);
  }
};

//页面重新显示回调(用于页面被覆盖后，再次显示时的回调)
function cbWebViewReload() {
  //每个页面可重写覆盖此方法

  //重新加载某些xhr数据
};

//1、打开一个webview页面
/*
JsonObjStr=>
{
"web_url":"https://baidu.com/", //具体的url地址
"title":"标题",   //可为空，如果为空，原生获取web页面的网页标题，进行相应的设置.
"needNavBarHide":"1" //  0：正常显示NavBar,  1：隐藏NavBar。不传此值，默认为显示Bar.
}
C.说明：
调用此函数，将会使用传进来的web_url数据，打开并加载一个新的webview页面，如果html有设置<title>标签，则无需再传递 title值。
*/
function openWebView(jsonObjStr) {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.openWebView.postMessage(jsonObjStr);
  } else {
    android.openWebView(jsonObjStr);
  }
};

//2、关闭一个webview页面或返回.
function closeWebView() {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.closeWebView.postMessage("");
  } else {
    android.closeWebView("");
  }
};


/*
3、页面跳转
0x01:  H5 调用 Native JS API:
A.函数名：gotoView(JsonObjStr)

B.参数：(json字符串)
JsonObjStr=>
{
"viewName":"0", //具体的url地址
}

参数一：viewName     跳转的页面名称
viewName参数列表值
{
0 => 跳转到登陆页面
1 => 用户退出登陆.
2 => 跳转到商城
3 => 跳转到首页
}

*/
function gotoView(jsonObjStr) {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.gotoView.postMessage(jsonObjStr);
  } else {
    android.gotoView(jsonObjStr);
  }
};

/*
4、用户退出登陆通知
0x01:  H5 调用 Native JS API:
A.函数名：logoutSuccess()

B.参数：(无参数，携带空窜即可)

C. 用户退出登陆后，通知原生使其token清楚，强制弹登陆界面.
*/
function logoutSuccess() {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.logoutSuccess.postMessage("");
  } else {
    android.logoutSuccess("");
  }
};

/*
5、用户登陆成功通知
0x01:  H5 调用 Native JS API:
A.loginSuccess(jsonObjStr)

B.参数：
JsonObjStr=>
{
  "id": 146,
  "nick_name": "qz_52ca3",
  "password": "qwerty",
  "telphone": "13548583211",
  "sex": 0,
  "logo": "uploadfile/goods/20180206/201802060947481815618422.png",
  "user_grade": "1",
  "token": "9553cb4b550f4075aaf325ef0dc38ccd",
  "user_id": "qz321190b4",
  "attention_num": 6,
  "fans_num": 0,
  "logs_num": 0,
  "last_login_cityId": "广东深圳",
  "create_time": "2018-05-10 10:47:49",
  "nopay": 0,
  "pay": 0,
  "consumer": 0,
  "setIf": 1
}

C. 用户登陆成功后，通知原生token存储更新其它数据加载的界面.
*/
function loginSuccess(jsonObjStr) {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.loginSuccess.postMessage(jsonObjStr);
  } else {
    android.loginSuccess(jsonObjStr);
  }
};


/*
5、进入草稿箱页面[选视频]
0x01:  H5 调用 Native JS API:
A.chooseVideo()

B.参数：（无参数）

C. 进入草稿箱选取相应的视频信息，发表日记。

D. 回调 cbChooseVideo(‘json’)
*/
function chooseVideo() {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.chooseVideo.postMessage("");
  } else {
    android.chooseVideo("");
  }
};

/*
5.1  草稿箱选取视频回调

0x01: 原生通知H5

A.cbChooseVideo(JsonObjStr)

B.参数：(json字符串)
JsonObjStr=>
{
  "videoUrl": "http://qiliu/abc.mp4",
  "content": "随便写写日记内容",
  "coverUrl": "uploadfile/goods/20180206/201802060947481815618422.png"
}

*/

function cbChooseVideo(JsonObjStr){
	//页面如需要回调，重写此方法
};


//====================龚迪&雪峰新增H5交互==========================
/* 6. 播放七牛云视频
A.说明  H5播放视频 jsonObjStr为封装了视频三要素（封面地址，视频地址，视频描述）的json格式数据
B.参数：(json字符串)
JsonObjStr=>
{
"videoUrl": "http://qiliu/abc.mp4",
"content": "随便写写日记内容",
"coverUrl": "uploadfile/goods/20180206/201802060947481815618422.png"
}

*/
function playVideo(jsonObjStr) {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.playVideo.postMessage(jsonObjStr);
  } else {
    android.playVideo(jsonObjStr);
  }
};


/* 7. 跳转原生案例展示界面
A.说明:  我的喜爱H5界面点击案例跳转原生案例展示界面 jsonObjStr为请求喜爱案例接口的必要参数，数据内容待
B.参数：(json字符串)
JsonObjStr=>
{
"pageNum": "当前页面. 从1开始",
"case_id": "案例id值"
}
*/
function toDataLike(jsonObjStr) {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.toDataLike.postMessage(jsonObjStr);
  } else {
    android.toDataLike(jsonObjStr);
  }
};


/* 8. 跳转原生草稿箱界面[观看模式]
A.说明 我的-已发布，H5界面如果数据为空时，跳转原生草稿箱界面
B.无参数
*/
function toDraftVideo() {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.toDraftVideo.postMessage("");
  } else {
    android.toDraftVideo("");
  }
};

//END====================龚迪&雪峰新增H5交互==========================

/* 9、获取当前设备的信息

0x01:  H5 调用 Native JS API:
A.函数名：getDeviceInfo()

B.参数：(无参数，携带空窜即可)

C. 调用成功后，原生会回调cbGetDeviceInfo(jsonObjStr) 返回设备信息。
*/
function getDeviceInfo() {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.getDeviceInfo.postMessage("");
  } else {
    android.getDeviceInfo("");
  }
};

/* 9.1、获取当前设备的信息的回调

0x01:  Native 调用 H5 JS API:
A.函数名：cbGetDeviceInfo(jsonObjStr)

B.参数：(json字符串)
JsonObjStr=>
{
"deviceID": "设备唯一标识",
"appVersion": "app当前版本",
"sysVersion": "系统版本号",
"deviceName": "设备名称"
}

C. 调用成功后，原生会回调cbGetDeviceInfo(jsonObjStr) 返回设备信息。
*/
function  cbGetDeviceInfo(jsonObjStr){
  //hmtl页面如需要回调，重写此方法
};

////////////////////////////////////////
/*  10. APP更新业务.

原生调用H5，以get请求方式在url后串拼接相应的参数.
1.设置页面 之前的url:"app/module/hosdetails.html#/setuserinfo"
 现在需要显示更新提示，在url后面拼接三个参数：systen、version、isNewVersion
 system=“1”         =>  “1”代表安卓;“2”代表IOS
 version ="1.4.0";  =>  代表当前版本号
 isNewVersion:      =>  1代表有新版本； 0代表当前版本已是最新，
拼接后的url:"host/app/module/hosdetails.html#/setuserinfo?system=1&version =1.4.0&isNewVersion = 1“

2.用户在H5端点击更新，通知原生做更新的业务逻辑.
H5 调用 Native JS API:
	A.函数名：versionUpdate()
	B.参数：(无参数，携带空窜即可)
*/

function versionUpdate() {
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.versionUpdate.postMessage("");
  } else {
    android.versionUpdate("");
  }
};

////////////////////////////////////////
/* 11、微信支付

0x01:  H5 调用 Native JS API:
A.函数名：WXPay(jsonObjStr)

B.参数：(json字符串)
JsonObjStr=>
{
"tradeId": "订单ID",
"goodsName": "商品名",
"tradeIdPrice": "商品价格"
}

C.说明
调用成功后，原生会回调cbWXPay(jsonObjStr) 返回微信支付状态信息。

0x02:  Native 回调 H5:
A.函数名：cbWXPay(jsonObjStr)

B.参数：(json字符串)
JsonObjStr=>
{
"status": "支付状态", // 0：成功  1：支付失败，原因在message内  2：用户取消支付.
"message": "支付状态消息"
}

C.说明
接收到回调消息后，可通过status判断当前支付是否成功.
*/
function WXPay(jsonObjStr) {
  //jsonObjStr 为json string串.
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.WXPay.postMessage(jsonObjStr);
  } else {
    android.WXPay(jsonObjStr);
  }
};

function cbWXPay(JsonObjStr){
	//页面如需要回调，重写此方法
};


////////////////////////////////////////
/* 12、支付宝支付

0x01:  H5 调用 Native JS API:
A.函数名：AliPay(jsonObjStr)

B.参数：(json字符串)
JsonObjStr=>
{
"tradeId": "订单ID",
"goodsName": "商品名",
"tradeIdPrice": "商品价格"
}

C.说明
调用成功后，原生会回调cbAliPay(jsonObjStr) 返回微信支付状态信息。

0x02:  Native 回调 H5:
A.函数名：cbAliPay(jsonObjStr)

B.参数：(json字符串)
JsonObjStr=>
{
"status": "支付状态", // 0：成功  1：支付失败，原因在message内  2：用户取消支付.
"message": "支付状态消息"
}

C.说明
接收到回调消息后，可通过status判断当前支付是否成功.
*/
function AliPay(jsonObjStr) {
  //jsonObjStr 为json string串.
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.AliPay.postMessage(jsonObjStr);
  } else {
    android.AliPay(jsonObjStr);
  }
};

function cbAliPay(JsonObjStr){
	//页面如需要回调，重写此方法

};


////////////////////////////////////////
/* 13、隐藏Web页面返回按钮.

0x01:  H5 调用 Native JS API:
A.函数名：hideBackButton("")

C.说明
调用成功后，原生将会隐藏Web页面返回按钮.

*/

function hideBackButton(JsonObjStr) {
  //jsonObjStr 为json string串.
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.hideBackButton.postMessage("");
  } else {
    android.hideBackButton("");
  }
};


////////////////////////////////////////
/* 14、调用分享功能.进行微信好友、朋友圈的分享

0x01:  H5 调用 Native JS API:
A.函数名：SocialShare(JsonObjStr)

B.参数：(json字符串)
JsonObjStr=>
{
"webpageUrl": "网页的url地址，不能为空且长度不能超过10K",
"title": "标题，可为空",
"descr": "描述，不能为空",
"thumImage": "缩略图 image_url,可为空",
"platform":"要分享的平台(前期固定为微信好友、朋友圈)"
}

C.说明
调用成功后，原生将会弹出分享窗口，进行相应的APP跳转操作.
*/
function wb_SocialShare(JsonObjStr) {
  //jsonObjStr 为json string串.
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.SocialShare.postMessage(JsonObjStr);
  } else {
    android.SocialShare(JsonObjStr);
  }
};
////////////////////////////////////////


////////////////////////////////////////
/* 15、商城页面,显示或隐藏右则的购物车按钮.
      PS:默认页面不会显示购物车按钮.

0x01:  H5 调用 Native JS API:
A.函数名：showShoppingcart(Str)

B.参数：(Str字符串)
Str可选参数为：
=> 0 : 隐藏购物车
=> 1 : 显示购物车

C.示例：
wb_ShowShoppingcart('1'); //显示
wb_ShowShoppingcart('0'); //隐藏

D.说明
调用成功后，原生将会跳转新开一个webview到购物车页面去.
*/
function wb_ShowShoppingcart(isShow) {
  //jsonObjStr 为json string串.
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.showShoppingcart.postMessage(isShow);
  } else {
    android.showShoppingcart(isShow);
  }
};

////////////////////////////////////////
/* 16、案例列表点击案例调用视图.

0x01:  H5 调用 Native JS API:
A.函数名：wb_OpenCaseWind(Str)

B.参数：(json字符串)
JsonObjStr=>
{
"pageIndex": "网页的url地址，不能为空且长度不能超过10K",
"user_id": "当前案例用户id",
"id": "案例id",
"hospital_id": "医院id",
"goods_key_word":"关键字"
"pageNum":""
"pageSize":""
"down":""
"type":""
}

D.说明
调用成功后，原生将会跳转新开一个webview到查看案例
*/
function wb_OpenCaseWind(JsonObjStr) {
  //jsonObjStr 为json string串.
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.openBeautyDetail.postMessage(JsonObjStr);
  } else {
    android.openBeautyDetail(JsonObjStr);
  }
};


////////////////////////////////////////
/* 17、跳转到聊天页面.

0x01:  H5 调用 Native JS API:

A.函数名：gotoChatView(JsonObjStr)

B.参数：(json字符串)
JsonObjStr=>
{
"chatId":  "聊天用户id,使用imUserID",
"name":    "聊天用户的名称",
"pic_url": "聊天用户的头像"
}

C.说明
调用成功后，原生将会跳转到chatId用户的聊天界面.
*/
function qz_gotoChatView(JsonObjStr) {
  //jsonObjStr 为json string串.
  if (getCurNativeType() == 2) {
    window.webkit.messageHandlers.gotoChatView.postMessage(JsonObjStr);
  } else {
    android.gotoChatView(JsonObjStr);
  }
};
