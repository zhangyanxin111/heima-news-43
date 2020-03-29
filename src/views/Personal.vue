<template>
  <div class="container">
    <NavigateBar title="个人中心" :showHome="true" />
    <!-- 头部 -->
    <router-link to="/edit-profile">
      <div class="header">
        <!-- 头像 -->
        <div class="avatar">
          <img :src="$axios.defaults.baseURL + userInfo.head_img">
        </div>
        <!-- 姓名 -->
        <div class="profile">
          <div>
            <!-- 性别男的图标 -->
            <span class="iconfont iconxingbienan" v-if="userInfo.gender === 1"></span>
            <!-- 性别女的图标 -->
            <span class="iconfont iconxingbienv" v-if="userInfo.gender === 0"></span>
            {{ userInfo.nickname }}
          </div>
          <p>{{ moment(userInfo.create_date).format("YYY-MM-DD") }}</p>
        </div>
        <!-- 右侧的箭头图标 -->
        <span class="arrow iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <Listbar v-for="(item, index) in rows" :key="index" :label="item.label" :tips="item.tips" />
    <Listbar @click.native="handleClick" aria-label="退出" />
  </div>
</template>
<script>
import Listbar from "@/components/Listbar";
import NavigateBar from "@/components/NavigateBar";
import moment from "moment";
export default {
  data() {
    return {
      rows: [
        { label: "我的关注", tips: "关注的用户" },
        { label: "我的跟帖", tips: "跟帖回复" },
        { label: "我的收藏", tips: "文章视频" },
        { label: "设置", tips: "" }
      ],
      userInfo: {},
      moment
    };
  },
  components: {
    Listbar,
    NavigateBar
  },
  mounted() {
    const jsonStr = localStorage.getItem("userInfo");
    const userJson = JSON.parse(jsonStr);
    this.$axios({
      url: "/user/" + userJson.user.id,
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      const { data } = res.data;
      this.userInfo = data;
    });
  },
  methods: {
    handleClick() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定退出吗？"
        })
        .then(() => {
          localStorage.removeItem("userInfo");
          this.$router.replace("/login");
        })
        .catch(() => {
          //点击取消按钮触发的函数
        });
    }
  }
};
</script>
<style scoped lang="less">
.header {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #eee solid;
  .avatar {
    img {
      display: block;
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      //填充容积
      object-fit: cover;
    }
  }
  .profile {
    flex: 1;
    padding-left: 20/360 * 100vw;
    line-height: 1.5;
    p {
      color: #999;
    }
    .iconxingbienan {
      color: blue;
    }
    .iconxingbienv {
      color: palevioletred;
    }
  }
}
</style>
