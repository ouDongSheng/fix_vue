<template>
  <div class="index">
    <keep-alive :exclude="$store.state.pageList">
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如详情B页面-->
    </router-view>
    
    <van-tabbar v-model="active" active-color="#ff8244" inactive-color="#444444">
      <van-tabbar-item
        v-for="(item,index) in tabbars"
        :key="index"
        @click="tab(index,item.name)"
      >
        <span style="font-size: .63rem;" :class="currIndex == index ? active:''">{{item.title}}</span>  
        <template slot="icon" slot-scope="props"> 
          <img style="width: 2rem;height: 2rem;" :src="props.active ? item.active : item.normal">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import commonUtil from '@/assets/js/commonUtil.js';
export default {
  name: "index",
  data() {
    return {
      active: 0,
      currIndex: 0,
      tabbars: [
        {
          name: "home",
          title: "首页",
          active: process.env.BASE_URL + "img/ShouYeOrange.png",
          normal: process.env.BASE_URL + "img/ShouYe-o.png"
        },
        {
          name: "personal",
          title: "个人中心",
          active: process.env.BASE_URL + "img/MyOrange.png",
          normal: process.env.BASE_URL + "img/My-o.png"
        },
        {
          name: "aboutUs",
          title: "关于我们",
          active: process.env.BASE_URL + "img/aboutusTwo.png",
          normal: process.env.BASE_URL + "img/aboutusTwo-o.png"
        }
      ]
    };
  },
  created() {
    console.log(this.$route.path)
    var path = this.$route.name
    switch(path){
      case 'product':
        this.active = 0;
        break;
      case 'personal':
        this.active = 1;
        break;
      case 'aboutUs':
        this.active = 2;
        break;
    }
    
    
  },
  methods: {
    tab(index, val){
        this.currIndex = index
        this.$router.push(val)
    },
    /**
     * 初始化进入系统时,判断当前微信有没有授权过,如果授权过
     * 直接用微信登录
     * 如果没有,申请授权,进行登录,并进行绑定手机号码
     */
    getWxUserInfo() {

    }

  }
};
</script>

<style scoped>
.index{
  height: 100%;
}
</style>
