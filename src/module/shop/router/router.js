// import Shop from "./../../shopIndex/Shop.vue";
import Detail from "./../Detail.vue";
import Shoppingcart from "./../Shoppingcart.vue";
import ConfirmOrder from "./../ConfirmOrder.vue";
import Payment from "./../Payment.vue";
import PaySuccess from "./../PaySuccess.vue";
import DoctorDetail from "./../DoctorDetail.vue";
import copyDoctorDetail from "./../copyDoctorDetail.vue";
import DoctorInfo from "./../DoctorInfo.vue";
import HospitalDetail from "./../HospitalDetail.vue";
import FirstOrder from "./../FirstOrder.vue";
import StarStyle from "./../StarStyle.vue";
import BaiFuMei from "./../BaiFuMei.vue";
import DoctorAndHospital from "./../DoctorAndHospital.vue";
import searchGoods from "./../searchGoods.vue";
//import Location from "./../Location.vue";
import quickScreening from "./../quickScreening.vue";
import quickScreenTwo from "./../quickScreenTwo.vue";
import newRedpacket from "./../newRedpacket.vue";
import RedPacket from '../RedPacket.vue';
//import caseDetail from './../../hosdetails/case.vue';
import redpacketTips from '../redpacketTips.vue';
import starStyleDetail from '../starStyleDetail.vue'; 
import starStyleDetailNew from '../starStyleDetailNew.vue'; 

const routers = [
  // {
  //   path: "/",
  //   component: Shop
  // },
  // {
  //     path: '/:user_id',
  //     component: Shop,
  //     props: true
  // },
  // {
  //   path: "/shop/:user_id",
  //   name: "shop",
  //   component: Shop,
  //   props: true
  // },

  // {
  //   path: "/caseDetail",
  //   name: "caseDetail",
  //   component: caseDetail,
  //   props: true
  // },
  {
    path: "/newRedpacket",
    name: "newRedpacket",
    component: newRedpacket,
    props: true
  },

  /*{
    path: "/location",
    name: "location",
    component: Location,
    props: true
  },*/
  {
    path: "/searchGoods",
    name: "searchGoods",
    component: searchGoods,
    props: true
  },
  {
    path: "/firstOrder",
    name: "firstOrder",
    component: FirstOrder,
    props: true
  },
  {
    path: "/StarStyle",
    name: "StarStyle",
    component: StarStyle,
    props: true
  },
  {
    path: "/starStyleDetail",
    name: "starStyleDetail",
    component: starStyleDetail,
    props: true
  },
  {
    path: "/starStyleDetailNew",
    name: "starStyleDetailNew",
    component: starStyleDetailNew,
    props: true
  },
  {
    path: "/BaiFuMei",
    name: "BaiFuMei",
    component: BaiFuMei,
    props: true
  },
  {
    path: "/DoctorAndHospital",
    name: "DoctorAndHospital",
    component: DoctorAndHospital,
    props: true
  },

  {
    path: "/redpacketTips",
    name: "redpacketTips",
    component: redpacketTips,
    props: true
  },
  {
    path: "/quickScreening",
    name: "quickScreening",
    component: quickScreening,
    props: true
  },
	{
		path: "/quickScreenTwo",
		name: "quickScreenTwo",
		component: quickScreenTwo,
		props: true
	},
  {
    path: "/detail/:id(\\d+)/:user_id",
    name: "detail",
    component: Detail,
    props: true
  },
  {
    path: "/detail/:id(\\d+)/:user_id/:toTarget",
    name: "detail",
    component: Detail,
    props: true
  },
  {
    path: "/shoppingcart/:user_id",
    name: "shoppingcart",
    component: Shoppingcart,
    props: true
  },
  {
    path: "/confirmorder",
    name: "confirmorder",
    component: ConfirmOrder
  },
  {
    path: "/payment",
    name: "payment",
    component: Payment
  },
  {
    path: "/paysuccess/",
    name: "paysuccess",
    component: PaySuccess
  },
  {
    path: "/doctordetail/",
    name: "doctordetail",
    component: DoctorDetail
  },
	
  {
    path: "/copyDoctorDetail/",
    name: "copyDoctorDetail",
    component: copyDoctorDetail
  },
  {
    path: "/hospitaldetail/",
    name: "hospitaldetail",
    component: HospitalDetail
  },

  // 我的红包
  {
    path: '/redPacket',
    name: 'RedPacket',
    component: RedPacket
  }
];

export default routers;
