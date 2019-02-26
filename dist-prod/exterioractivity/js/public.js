/*
* 环境 配置
// * */

let baseUrl = "https://apiqz.bqjr.cn:8081/qzd/app";//uat
//图片地址
let imgPath = "https://qz.bqjr.cn/";//uat


/**
 * 用户浏览器相关信息工具类
 * @type {{getUA: UAUtil.getUA, getAgent: UAUtil.getAgent}}
 */
var UAUtil = {
    /**
     * 获取用户的客户端UserAgent
     * @returns 客户端 UA
     */
    getUA: function () {//获取客户端UA信息
        return navigator.userAgent.toLowerCase();
    },
    /**
     * 当前的手机类型
     * @returns android | iphone | other
     */
    getAgent: function () {//获取客户端类型
        var agent = UAUtil.getUA();
        if (/android/.test(agent)) {
            return 'android';
        } else if (/iphone/.test(agent)) {
            return 'iphone';
        } else {
            return 'other';
        }
    }
};

/**
 * 客户端版本
 * @type {{getVersion: VersionUtil.getVersion}}
 */
var VersionUtil = {
    /**
     * 得到客户端的版本信息
     * @returns android@x.x | iphone_c@x.x
     */
    getVersion: function () {
        var v = null;
        var ua = UAUtil.getUA();
        var agent = UAUtil.getAgent();
        if (agent == 'android') {
            v = ua.match('unicom\\{version:([A-Za-z_]*@+[0-9]+.+[0-9]+),desmobile:[0-9]*\\}');
        } else if (agent == 'iphone') {
            v = ua.match('unicom\\{version:([A-Za-z_]*@+[0-9]+.+[0-9]+)\\}');
        }
        return v != null ? v[1] : '';
    }
};
