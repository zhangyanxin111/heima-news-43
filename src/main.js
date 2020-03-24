//vue 构造函数
import Vue from "vue";
//App组件 (以.vue结尾的文件都是组件)
import App from "./App.vue";
//路由对象
import router from "./router";

Vue.config.productionTip = false;
//创建一个根目录
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
