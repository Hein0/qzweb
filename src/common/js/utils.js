/**
 * Created by hp on 2018/1/24.
 */
// let kfUrl = "http://10.83.38.122:8080"; //sit
let kfUrl = "http://znkf.billionsfinance.cn:8000"; //prod
export default {
  getQueryMap: function(queryString) {
    if (typeof queryString !== "string") return queryString;
    if (!queryString) return queryString;

    queryString = "?" + queryString;
    var paramObj = {},
      paramList,
      oneQueryMatch,
      regGlobal = /[\?\&][^\?\&]+=[^\?\&#]*/g,
      regOne = /[\?\&]([^=\?]+)=([^\?\&#]*)/;

    queryString = queryString || location.href;
    paramList = queryString.match(regGlobal);

    if (!paramList) {
      return paramObj;
    }

    for (var i = 0, len = paramList.length; i < len; i++) {
      oneQueryMatch = paramList[i].match(regOne);
      if (null === oneQueryMatch) {
        continue;
      }
      paramObj[oneQueryMatch[1]] = oneQueryMatch[2];
    }
    return paramObj;
  },
  setTitle: function(str = "") {
    //设置导航头
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    if (u.indexOf("OS") != -1) {
      window.webkit && window.webkit.messageHandlers.setTitle.postMessage(str);
    } else if (isAndroid) {
      window.android && window.android.setTitle(str);
    }
  },
  goToCustomer: function(obj) {
    location.href =
      kfUrl +
      "/webchat/web/h5?" +
      encodeURI(
        "customerName=" +
          obj.telphone +
          "&customerMobile=" +
          obj.telphone +
          "&customerSource=仟姿在线APP&openid=" +
          obj.telphone +
          "&isOpenProvince=y&timeStamp=" +
          new Date().getTime() +
          "&tenantId=dcdd784880ce496f93a6a3eef584b0b7&groupId=qzQueue"
      );
  },

  // 验证身份证
  validateID (idCard) {
    var aCity = {
      11 : "北京",
      12 : "天津",
      13 : "河北",
      14 : "山西",
      15 : "内蒙古",
      21 : "辽宁",
      22 : "吉林",
      23 : "黑龙江",
      31 : "上海",
      32 : "江苏",
      33 : "浙江",
      34 : "安徽",
      35 : "福建",
      36 : "江西",
      37 : "山东",
      41 : "河南",
      42 : "湖北",
      43 : "湖南",
      44 : "广东",
      45 : "广西",
      46 : "海南",
      50 : "重庆",
      51 : "四川",
      52 : "贵州",
      53 : "云南",
      54 : "西藏",
      61 : "陕西",
      62 : "甘肃",
      63 : "青海",
      64 : "宁夏",
      65 : "新疆",
      71 : "台湾",
      81 : "香港",
      82 : "澳门",
      91 : "国外"
    };

    function isCardID(sId) {
      var iSum = 0;
      var info = "";
      var sBirthday;
      if (!(/^\d{17}(\d|x)$/i.test(sId) || /^\d{15}$/i.test(sId))) {
        return "你输入的身份证长度或格式错误";
      }
      sId = sId.replace(/x$/i, "a");
      if (aCity[parseInt(sId.substr(0, 2))] == null)
        return "你的身份证地区非法";
      if (sId.length == 18) {
        sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-"
          + Number(sId.substr(12, 2));
      } else if (sId.length == 15) {
        sBirthday = "19" + sId.substr(6, 2) + "-" + Number(sId.substr(8, 2)) + "-"
          + Number(sId.substr(10, 2));
      }
      var d = new Date(sBirthday.replace(/-/g, "/"));
      if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()))
        return "身份证上的出生日期非法";
      if (sId.length == 18) {
        for (var i = 17; i >= 0; i--) {
          iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
        }
        if (iSum % 11 != 1)
          return "你输入的身份证号非法";
      }
      return true;
    };

    return isCardID(idCard)
  },

  // 延迟执行
  delay (time, callback) {
    setTimeout(() => {
      callback()
    }, time)
  },

  // 对象数组根据对象里面的某一个属性值，来把这个对象在数组中排序
  compare(property){ //降序
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value2 - value1;
      }
  },

  // 解决整数和浮点数相减
  formatPremium(premium, format, noNumType) {
    /*
      在JS中四舍五入的函数 toFixed(n) , n为要保留的小数位数。 n为0~20，当n超过20的时候，JS会出错。
      如果小数点前和要截取的前一位都是0时，不会按常理截取。
      var h=0.07
      h.toFixed(1)的值为0.0
      其实要解决这个问题，原来是不一定要重写js中的Number类型的toFixed方法的。
      一个非常牛的同事，想到了一个他说很笨，但是我觉得很牛的方法。
      JS的API上说， 截取的位数前至少要有一位不是0的。
      于是，他这个很笨却很牛的方法是：使用toFixed方法之前加1，使用之后再减去1。
      site://blog.csdn.net/znn626/article/details/7961731
    */
    var newPre = premium;
    if (navigator.userAgent=="safari") {
        premium = Number(premium);
        temp = (new Number(premium + 1)).toFixed(format || (format == 0 ? 0 : 2));
        newPre = (new Number(temp - 1)).toFixed(format || (format == 0 ? 0 : 2));
    } else {
        newPre = (new Number(premium)).toFixed(format || (format == 0 ? 0 : 2));
    }
    return noNumType ? newPre : Number(newPre);
  },

  hospitalChange(id){
    let hospital_id={
      26:"综合型整形医院",
      27:"整形外科专科医院",
      28:"齿科专科医院",
      29:"皮肤科专科医院",
      30:"医院整形外科",
      147:"眼科专科医院",
      152:"综合泌尿科",
      153:"妇科整形医院",
      154:"医疗美容诊所",
      155:"医疗美容地区医院",
      156:"医疗美容教学医院",
      157:"医疗美容区域医院",
      158:"医疗美容医学中心",
      167:"医疗美容医院",
      168:"医疗美容门诊部",
      170:"医疗美容诊所",
      181:"医疗美容机构",
      124: "其他"
    }

    return hospital_id[id] ||"其他"
  },

  doctorPosition(id){
    let position_id={
      15:  "院长",
      16:  "代表院长",
      17:  "执行院长",
      75:  "副院长",
      76:  "主任医师",
      77:  "副主任医师",
      78:  "医生",
      79:  "实习医生",
      86:  "外聘教授",
      142: "中心主任",
      143: "主诊医生",
      144: "研究员",
      145: "副研究员",
      81:  "整形外科医生",
      82:  "外科医师",
      83:  "医师"
    }

    return position_id[id] ||"其他"
  }

};
