import hosdetails from '../hosdetails.vue'
import copyhosdetails from '../copyhosdetails.vue'
import mine from '../mine.vue'
import caseDetail from '../case.vue'
import copycaseDetail from '../copycase.vue'
import copymine from '../copymine.vue'
import sameStyle from '../sameStyle.vue'
import activity from '../activity.vue'
import userInfo from '../userInfo.vue'
import password from '../password.vue'
import resetpassword from '../resetpassword.vue'
import setuserinfo from '../setuserinfo.vue'
import minediary from '../minediary/minediary.vue'
import diaryorder from '../minediary/diaryorder.vue'
import creatdiary from '../minediary/creatdiary.vue'
import courseview from '../minediary/courseview.vue'
import authentry from '../authentry.vue'
import mapView from '../map.vue'
import projectDetails from '../projectDetails.vue'
import Detail from "./../../shop/Detail.vue"

const routers = [
  // {
  //   path: "/",
  //   component: Shop
  // },
  {
    path: '/hosdetails',
    name: "hosdetails",
    component: hosdetails,
    // props: true
  },
	
	{
		path: '/copyhosdetails',
		name: "copyhosdetails",
		component: copyhosdetails,
		// props: true
	},

  // 身份证录入
  {
    path: '/authentry',
    component: authentry,
    beforeEnter: (to, form, next) =>{
      let login_mes = JSON.parse(localStorage.getItem('personInfo'));
      if (login_mes.idCard) {
        location.href = `http://qianzidai.cn/app/bill/auth?idcard=${login_mes.idCard}&name=${login_mes.realname}`
      } else {
        next()
      }
    }
  },
	
	{
		path: "/detail/:id(\\d+)/:user_id",
		name: "detail",
		component: Detail,
		props: true
	},
	
  {
    path: '/mine',
    name: "mine",
    component: mine,
  },
  {
    path: '/caseDetail',
    name: "caseDetail",
    component: caseDetail,
  },
  {
    path: '/copycaseDetail',
    name: "copycaseDetail",
    component: copycaseDetail,
  },
  {
    path: '/copymine',
    name: "copymine",
    component: copymine,
  },
  {//医院主页
    path: '/sameStyle',
    name: "sameStyle",
    component: sameStyle,
  },
  {
    path: '/activity',
    name: "activity",
    component: activity,

  },
  {
    path: '/userinfo',
    name: "userInfo",
    component: userInfo,
    meta: {
      pageTitle: '主页',
      keepAlive: true
  }
  },
	{
    path: '/password',
    name: "password",
    component: password,

  },
  {
    path: '/resetpassword',
    name: "resetpassword",
    component: resetpassword,

  },
  {
    path: '/setuserinfo',
    name: "setuserinfo",
    component: setuserinfo,
  },

  // 我的日记
  {
    path: '/minediary',
    name: "minediary",
    component: minediary,

  },

  // 订单列表
  {
    path: '/diaryorder',
    name: "diaryorder",
    component: diaryorder,
  },

  // 创建日记
  {
    path: '/creatdiary',
    name: "creatdiary",
    component: creatdiary,
  },

  // 上传视频或图片
  {
    path: '/courseview',
    name: "courseview",
    component: courseview,
  },
	
	// 关键词主页项目详情
	{
		path: '/projectDetails',
		name: "projectDetails",
		component: projectDetails,
	},
	
  {// 高德地图
    path: '/map',
    name: "map",
    component: mapView,
  }

]
export default routers;
