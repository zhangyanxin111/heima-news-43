<template>
  <div class="listbar">
    <router-link to="#">
      <div>{{ lable }}</div>
      <div class="tips">
        {{ tips }}
        <span class="iconfont iconjiantou1"> </span>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["lable", "tips"]
};
</script>
<style scoped lang="less">
.listbar {
  padding-left: 20/360 * 100vw;
  height: 48/360 * 100vw;
  line-height: 48/360 * 100vw;
  a {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #eee solid;
    align-items: center;
    padding-right: 20/360 * 100vw;
  }
  .tips {
    color: #999;
    span {
      margin-left: 5px;
    }
  }
}
</style>
