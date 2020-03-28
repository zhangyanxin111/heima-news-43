<template>
  <div class="container">
    <!-- 返回上一页按钮  关闭-->
    <div class="back-btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="form.username"
        name="手机号码"
        placeholder="手机号码"
        :rules="[{
                required:true,message:'请填写手机号码'
            }]"
      />
      <!-- 呢称 -->
      <van-field
        v-model="form.nickname"
        name="呢称"
        placeholder="请输入呢称"
        :rules="[{
            required:true,message:'请填写呢称'
    }]"
      />
      <!-- 密码输入框 -->
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{
            required:true,message:'请填写密码'
    }]"
      />
      <div>
        <van-button round block typw="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <router-link to="/login">
      <van-button round block class="link-register">登录</van-button>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        nickname: "", //呢称
        password: ""
      }
    };
  },
  methods: {
    //提交表单时候触发的事件，该事件通过效验才会触发
    onSumit(values) {
      //调用axios发起异步请求，类似$.ajax(类似不代表一样)
      this.$axios({
        //接口地址
        url: "/register",
        method: "POST",
        data: this.from
      }).then(res => {
        const { message } = res.data;
        this.$toast.success(message);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  padding: 20 / 360 * 100vw;
}
.back-btn span {
  font-size: 27/360 * 100vw;
  line-height: 1;
}
.logo {
  text-align: center;
  margin-top: 20/360 * 100vw;
}
.logo span {
  font-size: 126/360 * 100vw;
  color: #cc3300;
}
.form {
  .van-cell {
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 20/360 * 100vw;
  }
  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #333;
    left: 0;
  }
  .van-button--info {
    margin-top: 50/360 * 100vw;
    background-color: #cc3300;
    border: 1px solid #cc3300;
  }
}
.link-register {
  margin-top: 20/360 * 100vw;
}
</style>