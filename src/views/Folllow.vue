<template>
<div>
    <!-- 头部 -->
    <NavigateBar title="我的关注">
        <!-- 头像 -->
        <div class="user-item" v-for="(item,index) in follows" :key="index">
            <img :src="$axios.defaults.baseURL + item.head_img" >
           <div class="user-info">
               <div>{{item.nickname}}</div>
               <p>{{ moment(item.create_date).format("YYYY-MM-DD hh:mm:ss")}}</p>
           </div>
        </div>
        <span class='cancel' @click="handleCancel(item.id,index)">
            取消关注
        </span>
          </div>
</template>
<script>
import  NavigateBar from "@/components/NavigateBar"
import moment from "moment"
export default {
    data(){
        return{
            follows:[],
            moment,
            localUserJson:{}
        }
    }, 
    components:{
        NavigateBar
    },
    mounted(){
        const localUserJson=JSON.parse(localStorage.getItem('userInfo'));
        this.IocalUserJson=localUserJson;
        this.$axios({
            url:"/user_follows",
            headers:{
                Authorization:localUserJson.token
            }
        }).then(res=>{
            const {data}=res.data;
            this.follows=data;
        })
    },
    methods:{
        handleCancel(id,index){
            this.$dialog.confirm({
                title:'提示',
                message:'确定取消关注吗？'
            }).then(()=>{
                tjis.$axios({
                   url:'/user_unfollow/'+id, 
                   headers:{
                       Authorization:this.localUserJson.token
                   }
                })
            }).then(res=>{
                this.$toast.success('取消关注成功');
                this.follows.splice(index,1);
            });
        }
    }
};
</script>
<style  scoped lang="less">
.use-item{
    padding: 20/360*100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #eee solid;
    img{
        width:40/360*100vw;
        height: 40/360*100vw;
        display:block;
        margin-right: 20/360*100vw;
        border-radius:50%;
         object-fit: cover;
    }
    .user-info{
        flex:1;
        margin-right: 20/360*100vw;
       p{
           font-size:14px;
           color:#999;
       }
    }
    .cancel{
        padding:5px 15px;
        font-size:12px;
        background:#eee;
        border-radius:50px;
    }

}

</style>