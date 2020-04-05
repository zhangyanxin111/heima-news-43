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

axios.defaults.baseURL = "http://127.0.0.1:3000";

Vue.use(Vant);
Vue.config.productionTip = false;
/// 添加路由的守卫
router.beforeEach((to, from, next) => {
  //需要验证的页面

  if (to.meta.authorization) {
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
//axios的响应拦截
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    // 如果请求返回的结果是错误的，会进入到错误的处理函数中
    // error是js原生的错误对象，我们可以用过error.response可以获取到详细的信息
    const { statusCode, message } = error.response.data;

    if (statusCode === 400) {
      Toast.fail(message);
    }

    return Promise.reject(error);
  }
);

// 创建一个根实例
// .$mount('#app') 相当于el配置，指定id为app的元素作为模板
new Vue({
  // 路由对象
  router,
  // 加载第一个子组件，最底层的组件，（写法是固定的）
  render: (h) => h(App),
}).$mount("#app");
