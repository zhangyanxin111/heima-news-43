import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//路由配置
const routes = [
  {
    //登录页
    path: "/login",

    component: () => import("@/views/Login")
  },
  {
    //注册页
    path: "/rgister",
    component: () => import("@/views/Register"),
    meta: {
      //代表这个页面授权
      authorization: true
    }
  },
  {
    //个人中心页
    path: "/personal",
    component: () => import("@/views/Personal"),
    meta: {
      //代表这个页面授权
      authorization: true
    }
  },
  {
    //编辑页
    path: "/edit-profile",
    component: () => import("@/views/EditProfile"),
    meta: {
      //代表这个页面授权
      authorization: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
