<template>
  <div>
    <NavigateBar title="编辑资料" />
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + userInfo.head_img" />
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <!-- 按钮列表 -->
    <Listbar label="昵称" :tips="userInfo.nickname" @click.native="show = true" />
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="handleChangeNickname">
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>

    <Listbar label="密码" tips="******" @click.native="showPassword = true" />

    <van-dialog
      v-model="showPassword"
      title="修改密码"
      show-cancel-button
      @confirm="handleChangePassword"
    >
      <van-field v-model="password" placeholder="请输入密码" type="password" />
    </van-dialog>

    <Listbar label="性别" :tips="['女', '男'][userInfo.gender]" @click.native="showGender = true" />
    <van-action-sheet
      v-model="showGender"
      close-on-click-action
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>
<script>
import NavigateBar from "@/components/NavigateBar";
import Listbar from "@/components/Listbar";

export default {
  data() {
    return {
      userInfo: {},
      userJson: {},
      show: false,
      showPassword: false,
      showGender: false,
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ],
      nickname: "",
      password: ""
    };
  },
  components: {
    NavigateBar,
    Listbar
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJson;
    this.$axios({
      url: "/user/" + userJson.user.id,
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      const { data } = res.data;
      this.userInfo = data;
      this.nickname = data.nickname;
    });
  },
  methods: {
    afterRead(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      this.$axios({
        url: "/upload",
        method: "POST",
        headers: {
          Authorization: this.userJson.token
        },
        data: formData
      }).then(res => {
        const { url } = res.data.data;
        this.userInfo.heas_img = url;
        this.handleEdit({
          heade_img: url
        });
      });
    },
    handleEdit(data) {
      this.$axios({
        url: "/user_update" + this.userInfo.id,
        method: "POST",
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        this.$toast.success("修改成功");
      });
    },
    handleChangeNickname() {
      this.handleEdit({ nickname: this.nickname });
      this.userInfo.nickname = this.nickname;
    },
    handleChangePassword() {
      this.handleEdit({ password: this.password });
    },
    onSelect(item) {
      this.handleEdit({ gender: item.value });
      this.userInfo.gender = item.value;
    }
  }
};
</script>
<style scoped lang="less">
.avatar {
  display: flex;
  padding: 20 / 360 * 100vw;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }

  .uploader {
    position: absolute;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    left: 50%;
    top: 50%;
    transform: translateX(-50 / 360 * 100vw) translateY(-50 / 360 * 100vw);
    opacity: 0;
  }
}
</style>
