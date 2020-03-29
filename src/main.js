//vue 构造函数
import Vue from "vue";
//App组件 (以.vue结尾的文件都是组件)
import App from "./App.vue";
//路由对象
import router from "./router";

import Vant from "vant";
// 导入axios
import axios from "axios";

Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000";

Vue.use(Vant);
Vue.config.productionTip = false
/// 添加路由的守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/personal") {
    const userJson = JSON.parse(localStorage.getItem("userInfo")) || {};
    if (userJson.token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

//创建一个根目录;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
