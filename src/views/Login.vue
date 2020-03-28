<template>
  <div class="container">
    <!-- 返回上一页按钮 -->
    <div class="back-btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 使用vant的表单 -->

    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="form.username"
        name="手机号码"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div>
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <router-link to="/register">
      <van-button round block class="link-register">注册</van-button>
    </router-link>
  </div>
</template>

<
<script>
export default {
    data(){
        return {
           
            form: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
      
        onSubmit(values) {
           
            this.$axios({
                url: "/login",
               method: "POST",
                data: this.form
                }).then(res => {
               
                const {message, data} = res.data;
              
                this.$toast.success(message);
               
                localStorage.setItem("userInfo", JSON.stringify(data));
                
                this.$router.push("/personal");
            })
        },
    }
};
</script>

<style lang="less" scoped>
// scoped属性表示样式只针对当前的组件有效
.container {
  padding: 20 / 360 * 100vw;
}
// 样式会被iconfont覆盖的，所以要选中span
.back-btn span {
  font-size: 27 / 360 * 100vw;
  line-height: 1;
}
.logo {
  text-align: center;
  margin-top: 20 / 360 * 100vw;
}
.logo span {
  font-size: 126 / 360 * 100vw;
  color: #cc3300;
}
.form {
  .van-cell {
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 20 / 360 * 100vw;
  }
  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #333;
    left: 0;
  }
  .van-button--info {
    margin-top: 50 / 360 * 100vw;
    background-color: #cc3300;
    border: 1px solid #cc3300;
  }
}
.link-register {
  margin-top: 20 / 360 * 100vw;
}
</style>