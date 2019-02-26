import fetch from "./fetch";

export default {
  /*
   * 用户登录
   * */
  Login(params) {
    // return fetch("get", "/api/auth", params)
  },
  /*
   * 手机号码登录
   * */
  smsLogin(params) {
    // return fetch("get", "/api/phone-auth", params)
  },
  /*
   *
   * 更新角色
   * */
  updateRole(params) {
    // return fetch("post", "/api/user/update-role", params)
  },

  /*
   *
   * 登录发送短信
   * */
  sendSms(params) {
    return fetch("post", "/case/getCode.do", params);
  },

  /*
   *
   * 发送短信
   * */
  orderPrepayment(params) {
    // return fetch("get", "/api/orders/order-prepayment", params)
  },
  /*
   *
   * 数据统计
   * */
  orderStastic(params) {
    // return fetch("get", "/api/orders/statstics", params)
  },
  /*
   *
   * 全部项目查询接口（首页、仟姿惠可用）
   * */
  allCategory(params) {
    return fetch("get", "/case/selectAllCategory.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id, params);
  },
  /*
   *
   * 部位列表查询接口
   * */
  getRegionList(params) {
    return fetch("get", "/case/getRegionList.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id, params);
  },
  /*
   *
   * 部位列表查询接口
   * */
  getHospitalSortList(params) {
    return fetch("get", "/case/getHospitalSortList.do?token="+JSON.parse(localStorage.getItem("personInfo")).token,params)
  },
  /*
   *
   * 仟姿汇商品列表查询接口(仟姿汇首页)
   * */
  getGoodsList(params) {
    return fetch("get", "/case/getGoodsList.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
  },
  /*
   *
   * 商品详情接口
   * */
  goodDetail(params) {
    return fetch("get", "/mall/goodDetail?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
  },
  /*
   *
   * 商品详情日记列表接口
   * */
  goodCaseDetailInfo(params) {
    return fetch("get", "/mall/goodCaseDetailInfo?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
  },
  /*
   *
   * 加入购物车接口
   * */
  addCart(params) {
    return fetch("post", "/mall/addCart", params);
  },
  /*
   *
   * 查询购物车接口
   * */
  cartList(params) {
    return fetch("get", "/mall/cartList?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
  },
  /*
   *
   * 确认订单接口
   * */
  confirmOrder(params) {
    console.log(params)
    return fetch("get", "/mall/confirmOrder?token="+JSON.parse(localStorage.getItem("personInfo")).token,params)
  },
  /*
   *
   * 提交订单接口
   * */
  order(params) {

    return fetch("post", "/mall/order", params);
  },
  /*
   *
   * 订单支付接口
   * */
  payOrder(params) {
    return fetch("post", "/mall/payOrder", params);
  },
  //获取日志详情
  getDairyDetail(params, otherUrl) {
    return fetch("get", "/case/getCaseDetailInfoById.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params,otherUrl)
  },
  getAttention(params, otherUrl) {
    //日志里面的关注
    return fetch("post", "/case/insertAttentionRecord.do", params, otherUrl);
  },
  getLook(params, otherUrl) {
    //获取一级日志里面的浏览量的
    return fetch("post", "/case/insertScanRecord.do", params, otherUrl);
  },
  getVote(params, otherUrl) {
    //点赞
    return fetch("post", "/case/insertVoteRecord.do", params, otherUrl);
  },
  setDariy(params, otherUrl) {
    //评论
    return fetch("post", "/case/insertEvaluateRecord.do", params, otherUrl);
  },
  getInsertVote(params, otherUrl) {
    //二级页面大母子点赞
    return fetch("post", "/case/insertEvaluateVote.do", params, otherUrl);
  },
  //获取二级日志详情
  getDairySubDetail(params, otherUrl) {
    return fetch("get", "/case/getSlaveInfoById.do?token="+JSON.parse(localStorage.getItem("personInfo")).token,params,otherUrl);
  },
  getFineList(params, otherUrl) {
    //粉丝列表
    return fetch("get", "/case/getFansList.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params,otherUrl);
  },
  getAttentList(params, otherUrl) {
    //关注列表
    return fetch("get", "/case/getAttentionList.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params, otherUrl);
  },
  deleteAttention(params, otherUrl) {
    //取消关注删除粉丝
    return fetch("post", "/case/cancleOrDeleteAttention.do",params,otherUrl);
  },
  getLogin(params, otherUrl) {
    //登录
    return fetch("post", "/case/login.do",params,otherUrl);
  },
  /*
   *
   * 我的日志列表查询接口
   * */
  getMyLogList(params) {
    return fetch("get", "/case/getMyLogList.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
  },
  /*
   *
   * 查询订单列表接口
   * */
  orderList(params) {
    return fetch("get", "/mall/orderList?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
  },
  /*
   *
   * 日记新增接口
   * */
  insertCaseOrLog(params) {
    return fetch("post", "/case/insertCaseOrLog.do", params);
  },
  /*
   *
   * 用户关注接口
   * */
  insertAttentionRecord(params) {
    return fetch("post", "/case/insertAttentionRecord.do", params);
  },
  /*
   *
   * 取消关注(删除粉丝)接口
   * */
  cancleOrDeleteAttention(params) {
    return fetch("post", "/case/cancleOrDeleteAttention.do", params);
  },
  getEvetList(params, otherUrl) {
    //获取评论列表
    return fetch("get", "/case/getCaseEvaluateByCid.do?token="+JSON.parse(localStorage.getItem("personInfo")).token,params,otherUrl);
  },
  /*
   *
   * 取消关注(删除粉丝)接口
   * */
  getUserInfo(params) {
    return fetch("get", "/case/getUserInfo.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
  },
  /*
   *
   * 查询确认订单
   * */
  orderOne(params) {
    return fetch("get", "/mall/orderOne?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
  },
  hosdetails(params) {
    return fetch("get", "/hospital/getHospitalById.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
    // console.log(1234)
  },
  //医院商品列表
  stardetails(params) {
    return fetch("get", "/hospital/getHospitalGoodsList",params)
  },
  //医院案例列表
  hosmy(params) {
    return fetch("get", "/hospital/getCaseList.do",params)
  },
  userinfo(params) {
    return fetch("get", "/user/getUserInfoById.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
  },
  userDetails(params) {
    return fetch("get", "/user/getMyCaseList.do?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
  },
  usershop(params) {
    return fetch("get", "/user/getMyGoodsList?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)

  },
  // 关键词
  case (params) {
    return fetch("post", "/case/keywordsForCase", params)
  },
  shopdetails(params) {
    return fetch("post", "/case/keywordsForGoods", params)

  },
  goodskeyword(params) {
    return fetch("post", "/case/keywords", params)

  },
  hosother(params) {
    return fetch("get", "/hospital/getCaseUnList?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id, params)

  },
  loginPassword(params) {
    return fetch("post", "/user/loginPassword.do", params)
  },
  updatePassWord(params) {
    return fetch("post", "/user/updatePassWord.do", params)

  },
  updateUserInfo(params) {
    return fetch("post", "/user/updateUserInfo.do", params)

  },
  loginOut(params){
    return fetch("post", "/user/loginOut.do", params)

  },
  userInfo(params){
    return fetch("post", "/user/userInfo.do", params)

  },
 loginPassword(params){
 return fetch("post","/user/loginPassword.do",params)
 },

 //获取客服的url
 getKeFuUrl(params){
 	return fetch("get","/hospital/getCustomerServiceInfo?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)
 },
 setpassword(params){
 	return fetch("post","/user/setPassWord.do",params)

 },
 //3.9.	日记本-术后天数
 getAfterDay(params){
 	return fetch("get","/hospital/getAfterDay?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)

 },
 getHospital(params){
  return fetch("get","/hospital/getHospital?token="+JSON.parse(localStorage.getItem("personInfo")).token+"&user_id="+JSON.parse(localStorage.getItem("personInfo")).user_id,params)

},
orderCase(params){
  return fetch("post","/case/orderCase",params)

},

// 我的日记列表
caseList(params){
  return fetch("post","/case/caseList",params)
},

addCaseMain(params){
  return fetch("post","/case/addCaseMain",params)

},
//喜爱列表
likeList(params){
  return fetch("post","/user/likeList",params)

},
//未完善详情回显
caseDetail(params){
  return fetch("post","/case/caseDetail",params)
},
//已发布视频列表
videoList(params){
  return fetch("post","/user/videoPublishList",params)
},
//发布完善案例
perfectCase(params){
  return fetch("post","/case/perfectCase",params)
},

// 获取版本号
getAppVersion () {
  return fetch('get', '/config/version')
},

// 续写日记
addCaseSlave (params) {
  return fetch('post', '/case/addCaseSlave', params)
},

// 添加用户信息
addUserInfo (param) {
  return fetch('post', '/user/addUserInfo', param)
},

//获取城市接口
location(params){
  return fetch('get', '/quick/provinceCity')
},

// 商城首页banner
mallBanner(params){
  return fetch('get', '/banner/home', params)
},

// 我的红包
myRedpacket(params){
  return fetch('get', '/activity/myRedpacket', params)
},

//商城首页推荐
recommendedGoods(params){
  return fetch('get', '/quick/home', params)
},

//商品搜索
searchGoods(params){
  return fetch('get', '/es/search/commodity', params)
},

// 快捷筛选栏
quickScreening(params){
  return fetch('get', '/quick/findGoods', params)
},

//新人第一单商品品类型
FirstOrderMenu(params){
  return fetch('get', '/quick/newcomerFirst/category', params)
},

//新人第一单商品详细信息
FirstOrder(params){
  return fetch('get', '/quick/newcomerFirst', params)
},

// 白富美城堡商品类型
BaiFuMeiMenu(params){
  return fetch('get', '/quick/richBtfGirl/category', params)
},

// 白富美城堡详细信息
BaiFuMei(params){
  return fetch('get', '/quick/richBtfGirl', params)
},

// 明星同款
starStyle(params){
  return fetch('get', '/banner/celebrity', params)
},

// 名医查询
famousDocctors(params){
  return fetch('get', '/famous/doctors', params)
},

// 名院查询
famousHospital(params){
  return fetch('get', '/famous/hospital', params)
},

// 我的红包
getMyRedpacket (params) {
  return fetch('get', '/activity/myRedpacket', params)
},

//医生信息
doctorInfomation (params) {
  return fetch('get', '/doctor/infomation', params)
},

//成功案例
successCase (params) {
  return fetch('get', '/doctor/getCaseList', params)
},


// 医生下推荐商品
doctorGood (params) {
  return fetch('get', '/doctor/getgoodsList', params)
},

// 关键词查找医院
keywordsForHospital(params){
	return fetch('post', '/case/keywordsForHospital', params)
},

// 关键词查找医生
keywordsForDoctor(params){
	return fetch('post', '/case/keywordsForDoctor', params)
},

// 关键词项目详情
projectDetails(params){
	return fetch('get', '/case/projectDetails', params)
},

// 同款
sameParagraph(params){
	return fetch('get', '/case/sameParagraph', params)
},
//APP获取医院客服信息
getHospitalService(params){
	return fetch('get', '/im/queryImUserByHospitalId', params)
},

// 转盘奖品列表
prizeList (params) {
  return fetch('get', '/prize/prizeInfo', params)
},
// 好友中奖 奖品
friendList (params) {
  return fetch('get', '/prize/prizeRecommendList', params)
},
// 中奖名单列表
rollList (params) {
  return fetch('get', '/prize/prizeNameList', params)
},
// 抽奖
prizeExchange (params) {
  return fetch('get', '/prize/prizeExchange', params)
},

// 医院信息
getHospitalInfo (params) {
  return fetch('get', '/hospital/getHospitalInfo', params)
},
// 医院案例分类
getCat (params) {
  return fetch('get', '/hospital/getCat', params)
},

//热门话题
getHotTopics(params) {
  return fetch('get', '/forum/queryHotTopics', params)
},

//项目类别
getProjects(params) {
  return fetch('post', '/forum/queryFirstLevelProjects', params)
},

//搜索话题
searchTopic(params) {
  return fetch('post', '/forum/searchTopic', params)
},

//查询帖子
getArticleList(params) {
  return fetch('post', '/forum/queryArticleList', params)
},

//帖子点赞
addLikeArticle(params) {
  return fetch('get','/forum/addLikeArticleCount',params)
},

//帖子取消点赞
deleteLikeArticle(params) {
  return fetch('get','/forum/deleteLikeArticleCount',params)
},

//评论点赞
addLikeComment(params) {
  return fetch('get','/forum/addLikeCommentCount',params)
},

//评论取消点赞
deleteLikeComment(params) {
  return fetch('get','/forum/deleteLikeCommentCount',params)
},

//浏览帖子
addViewCount(params) {
  return fetch('get','/forum/addViewCount',params)
},

//查询评论条数
queryArticleCommentNum(params) {
  return fetch('get','/forum/queryArticleCommentNum',params)
},
//查询评论
queryCommentList(params) {
  return fetch('post','/forum/queryCommentList',params)
},

//发表评论
addComment(params) {
  return fetch('post','/forum/addComment',params)
},

//发表帖子
createArticle(params) {
  return fetch('post','/forum/createArticle',params)
}

}
