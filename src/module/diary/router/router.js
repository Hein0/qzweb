import Mydiary from "../Mydiary.vue";
import Indent from "../indent.vue";
import All from "../all.vue";
import createDiary from "../createDiary.vue";
import Logwriter from "../Logwriter.vue";
import Continue from "../Continue.vue";
import createDiaryNo from "../createDiaryNo.vue";
import Drafts from "../drafts.vue";//草稿箱
import Course from "../course.vue";//日志历程
import Likelist from "../likeList.vue";//喜爱
import Issue from "../issue.vue";//已发布
import NotPerfect from "../notPerfect.vue";//未完善
const routers = [
  {
    path: "/",
    redirect: '/Mydiary/:user_id'
  },

  // 我的日记列表
  {
    path: "/Mydiary/:user_id",
    name: "Mydiary",
    component: Mydiary,
    props: true
  },
  //
  {
    path: "/indent/",
    name: "indent",
    component: Indent,
    props: true
  },
  {
    path: "/all/:user_id/:order_status",
    name: "all",
    component: All,
    props: true
  },
  {
    path: "/all/:user_id/",
    name: "all",
    component: All,
    props: true
  },

  // 创建日记
  {
    path: "/createDiary",
    name: "createDiary",
    component: createDiary
  },

  {
    path: "/createDiaryNo",
    name: "createDiaryNo",
    component: createDiaryNo
  },

  // 写日记
  {
    path: "/Logwriter",
    name: "Logwriter",
    component: Logwriter
  },

  // 续写日记
  {
    path: "/Continue",
    name: "Continue",
    component: Continue
  },

  //草稿箱
  {
    path: "/drafts",
    name: "drafts",
    component: Drafts
  },

  //日志历程(填写)
  {
  	path: "/course",
  	name: "course",
  	component: Course
  },

  //我的喜爱
  {
  	path: "/likelist",
  	name: "likelist",
  	component: Likelist
  },

  //已发布
  {
  	path: "/issue",
  	name: "issue",
  	component: Issue
  },

  //未完善
  {
  	path: "/notPerfect",
  	name: "notPerfect",
  	component: NotPerfect
  }
];

export default routers;
