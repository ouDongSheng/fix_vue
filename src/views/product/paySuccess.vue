<template>
  <div class="paySuccess">
    <div class="pay-success">
      <div class="pay-success-img">
        <van-image fit="contain" :src="`${publicPath}img/pay-success.png`"></van-image>
      </div>
      <div class="pay-success-label">支付成功!</div>
    </div>
     <div class="btn">
      <van-button type="info" block @click="onOrderDetail">查看订单</van-button>
    </div>
    <div class="btn">
        <van-button type="info" block  @click="onBackHome">返回首页</van-button>
    </div>
    <div class="btn">
      <a href="tel://15054054500" class="aside_btn_cart" style="bottom: 8.188rem;" id="gotoCart">
        <van-button type="info" block>提醒商家接单</van-button>
      </a>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'paySuccess',
  data(){
    return{
      publicPath: process.env.BASE_URL,
      groupId: ''
    }
  },
  created() {
    this.groupId = this.$route.query.groupId
  },
  activated() {

  },
  methods: {
    onOrderDetail() {
      // 查看订单
      var _this = this
      this.$router.push({
        path: '/orderDetail',
        query:{
          groupId: _this.groupId,
          state:1
        }
      })
    },
    onBackHome() {
      this.$router.push({path:'/'})
    }
  }
}
</script>
<style scoped>
.paySuccess{
  height: 100%;
  background: #fff;
  overflow: hidden;
}
.pay-success{
  margin-top: 10rem;
}
.pay-success-img{
  width: 4.7rem;
  height: 4rem;
  margin: auto;
  background: #f8f8f8;
}
.pay-success-img .van-image{
  width: 4.7rem;
  height: 4rem;
}
.pay-success-label{
  text-align: center;
  font-size: .88rem;
}
.btn{
  padding: 1rem 0rem;  
  width: 11rem;
  margin:0 auto
}
</style>
