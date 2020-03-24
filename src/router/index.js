import Vue from "vue";
//导入路由
import VueRouter from "vue-router";


//注册路由的插件，把路由关系到
Vue.use(VueRouter);
//路由配置
const routes = [
  {
    path: "/login",
   
    component:()=>{

    }
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
