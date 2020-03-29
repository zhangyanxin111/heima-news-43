<template>
  <div class="navigate-bar">
    <span class="iconfont iconjiantou2" @click="$router.back()"></span>
    <strong>{{ title }}</strong>
    <span class="iconfont iconshouye" @click="router.push('/')" v-if="showHome">
    </span>
    <span v-else class="iconfont iconshouye" style="opacity:0"></span>
  </div>
</template>
<script>
export default {
  props: ["title", "showHome"]
};
</script>
<style scoped lang="less">
.navigate-bar {
  line-height: 48 / 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20 / 360 * 100vw;
  border-bottom: 1px #eee solid;

  .iconshouye {
    font-size: 20px;
  }
}
</style>
