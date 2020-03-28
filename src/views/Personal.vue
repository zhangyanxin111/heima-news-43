<template>
  <div class="container">
      <div class="navigate-bar">
        <span claass="iconfont iconjiantou2" @click="$router.back()">
          <strong>个人中心</strong>
          <span class="iconfont iconshouye" @click="$router.push('/')"></span>
      </div>
  
  <div class="header">
    <!-- 头像 -->
    <div class="avatar">
   <img src="$axios.defaults.baseURL+userInfon.head_img" alt="">
    </div>
    <!-- 姓名 -->
    <div class="profile">
       <div>
      <span class="iconfont iconxingbienan" v-if="userInfo.gender===1"></span>
      <span class="iconfont iconxingbienv" v-if="userInfo.gender===0" ></span>
      {{userInfo.nickname}}
      </div>
       <p>{{moment(userInfo.create_date).format('YYY-MM-DD')}}</p>
    </div>
    <!-- 右侧的箭头图标 -->
    <span class="arrow iconfont iconjiantou1"></span>
  </div>
    	<Listbar v-for="(item, index) in rows" :key="index"
		:label="item.label" 
		:tips="item.tips"/>
    <Listbar @click.native="handleClick" aria-label="退出"/>
  </div>
</template>
<script>
import Listbar from "@/components/Listbar";
import moment from "moment";
export default {
  data(){
    return{
      rows:[
        { label:"我的关注",tips:"关注的用户"},
        { label:"我的跟帖",tips:"跟帖回复"},
        { label:"我的收藏",tips:"文章视频"}
       

      
      ],
      userInfo:{},
      moment,
    }
  },
  mounted(){
    const jsonStr=localStorage.getItem('userInfo');
    const userJson=JSON.parse(jsonStr);
    this.$axios({
      url:'/user/'+ userJson.usr.id,
      headers:{
        Authorization:userJson.token
      }
    }).then(res=>{
      const {data}=res.data;
      this.userInfo=data;
    })
  },
  methods:{
handleClick(){
  this.$dialog.confirm({
    title:'提示',
    message:'确定退出吗？'
  }).then(()=>{
    localStorage.removeItem("userInfo");
    this.$router.replace('/login')
  }).catch(()=>{
    //点击取消按钮触发的函数
   });
   }
  
  }
};
</script>
<style scoped lang='less'>
  .navigate-bar{
    line-height: 48/360*100vw;
    display:flex;
    
  }
</style>