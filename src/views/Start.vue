<template>
    <div>
        <!-- 头部组件 -->
        <NavigateBar title="我的收藏"/>
        <div v-for="(item,index) in stars" :key="index">
            <div class="imgText" v-if="item.cove.length <3 && item.cover.length >0">
                <div class="imgText-left">
                    <h4>{{item.title}}</h4>
                    <p>{{item.user.nickname}} {{item.comments.length}}</p>
              </div>
                <img :src="$axios.defaults.baseURL+ item.cover[0].url">

            </div>
    </div>
</template>
<script>
import NavigateBar from "@/components/NavigateBar"
export default {
     data(){
         return{
             starts:[]
         }
     },
     components:{
         NavigateBar
     },
     mounted(){
         const localUserJson=JSON.parse(localStorage.getItem("userInfo"));
          this.$axios({
              url:"/user_star",
              headers:{
                  Authorization:localUserJson.token
              }
          }).then(res =>{
              const {data}=res.data;
              this.stars=data;
          })
     }
}
</script>
<style scoped lang="less">
        .imgText{
            padding: 20/360*100vw;
            display:flex;
            justify-content:space-between;
            align-items:center;
            border-bottom:1px #eee solid;
            .imgText-left{
                h4{

                    //文字超过俩行出现省略号
                    display:-webkit-box;
                    -webkit-line-clamp:2;
                    overflow:hidden;
                    font-weight: normal;
                }
                p{
                    color:#999;
                    margin-top: 5px;
                }
            }
            img{
                width: 110/360*100vw;
                height: 75/360*100vw;
                display: block;
                object-fit: cover;
                margin-left:10/360*100vw;
                flex-shrink: 0;//防止图片在flex布局被挤压
            }
        }
        .imgLisr{
            padding: 20/360*100vw;
            border-bottom:1px #eee solid;
            h4{
                display: -webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-weight: normal;

            }
            .images{
                margin:10/360*100vw 0;
                display: flex;
                justify-content: space-between;
                .img{
                    width: 33%;
                   height: 75/360*100vw;
                   object-fit: cover;
                
                }
            }
            p{
                color:#999;
                margin-top:5px;
            }
        }
</style>