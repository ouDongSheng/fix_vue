<template>
  <div class="orderDetail">
    <div class="order-detail-top">
      <div id="m_common_header" class="m_item_header">
        <header class="jd-header">
          <div class="jd-header-new-bar" id="jd_header_new_bar">
            <div class="jd-header-icon-back">
              <span v-on:click="back"></span>
            </div>
          </div>
        </header>
      </div>
      <div class="order-detail-state" v-if="state==1">
        <div class="order-detail-state-img"><van-image fit="contain" :src="`${publicPath}img/pending-order.png`"/></div>
        <div class="order-detail-state-text">待处理</div>
      </div>
      <div class="order-detail-state" v-if="state==2">
        <div class="order-detail-state-img"><van-image fit="contain" :src="`${publicPath}img/personal-order-second.png`"/></div>
        <div class="order-detail-state-text">已发货</div>
      </div>
      <div class="order-detail-state" v-if="state==3">
        <div class="order-detail-state-img"><van-image fit="contain" :src="`${publicPath}img/completed-order.png`"/></div>
        <div class="order-detail-state-text">已完成</div>
      </div>
      <div class="my-address">
        <div class="my-address-img">
          <van-image fit="contain" src="img/sure-order-local.png"></van-image>
        </div>
        <div class="my-address-content">
          <div class="my-address-person">
            <span>{{detail.recUserName}}</span>
            <span>{{detail.recTelephone}}</span>
          </div>
          <div class="my-address-address">
            {{detail.recAddress}}
          </div>
        </div>
      </div>
    </div>
    <div class="order-detail-center" v-if="detail">
      <div class="order-detail-center-goods">
        <orderGoods :selectGoodsDetail="detail.list[0]"></orderGoods>
      </div>
      <div class="order-detail-center-coupon">
        <div>重复购买折扣优惠</div>
        <div>-￥{{detail.repeatBuyDiscountMoney?detail.repeatBuyDiscountMoney.toFixed(2):'0.00'}}</div>
      </div>
      <div class="order-detail-center-remark">
        <div>订单备注</div>
        <div>{{detail.list[0].remarks?detail.list[0].remarks:'无'}}</div>
      </div>
      <div class="order-detail-center-price">
        <span>共{{detail.list[0].count}}件</span>
        <span>
          <span>实付金额：</span>
          <span>￥{{detail.payable | formatPrice}}</span>
        </span>
      </div>
    </div>
    <div class="order-detail-bottom" v-if="detail">
      <div>订单编号：{{detail.groupId}}</div>
      <div>下单时间：{{detail.createTime}}</div>
      <div v-if="state==2||state==3">发货时间：{{detail.list[0].sendTime?detail.list[0].sendTime:''}}</div>
      <!-- <div v-if="state==3">完成时间：{{detail.list[0].receiveTime?detail.list[0].receiveTime:''}}</div> -->
    </div>

    <div class="fixed-btn" v-if="state != 1">
      <div class="btn">
        <van-button plain hairline size="small" type="info" @click="onLogistics">查看物流</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index.js'
export default {
  name: 'orderDetail',
  data(){
    return{
      publicPath: process.env.BASE_URL,
      groupId:'',
      detail:'',
      state: '', // 1待处理，2已发货，3已完成
    }
  },
  created() {
    this.groupId=this.$route.query.groupId;     
    this.state=this.$route.query.state;      
    this.orderInfo();
  },
  activated() {

  },
  methods: {
    orderInfo() {
      var that = this
      api.toOrderInfo({groupId:this.groupId}).then(res => {
        if(res.code == 200){
          that.detail = res.data
        }else{
          that.$toast(res.msg)
        }
      })
    },
    onLogistics() {
      // 查看物流
      this.$router.push({
        path: '/orderLogistics',
        query:{groupId:this.groupId}
      })

    },
    back(){
        this.$router.go(-1);//返回上一层
    }
  }
}
</script>
<style scoped>
.order-detail-top,.order-detail-center,.order-detail-bottom{
  background: #fff;
  border-radius: .5rem;
  margin: .3rem .75rem .75rem .75rem;
}
.order-detail-state{
  text-align: center;
  padding: 1.25rem 0;
  color: #199BFF;
  font-size: .94rem;
  border-bottom: .03rem solid rgba(221,221,221,.8);
}
.order-detail-state-img{
  width: 3rem;
  height: 3rem;
  margin: auto;
}
.order-detail-state-img .van-image{
  width: 3rem;
  height: 3rem;
}
/* 地址 start */
.my-address{
  display: flex;
  align-items: center;
  padding: .5rem .75rem;
}
.my-address-img{
  width: 1.13rem;
  height: 1.34rem;
  margin-right: 1rem;
  flex-shrink: 0;
}
.my-address-img .van-image{
  width: 1.13rem;
  height: 1.34rem;
}
.my-address-person{
  line-height: 2.5rem;
}
.my-address-person>span:nth-of-type(1){
  font-size: .88rem;
  font-weight: 500;
  margin-right: 2rem;
}
.my-address-person>span:nth-of-type(2){
  color: #666;
}
.my-address-address{
  line-height: 1.19rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding: .5rem 0;
}
/* 地址 end */
.order-detail-center-goods{
  padding: .75rem;
}

.order-detail-center-coupon{
  display: flex;
  justify-content: space-between;
  border-bottom: .03rem solid rgba(221,221,221,.8);
  padding: .75rem;
}
.order-detail-center-coupon>div:nth-of-type(1){
  font-weight: 500;
}

.order-detail-center-remark{
  border-bottom: .03rem solid rgba(221,221,221,.8);
  padding: .75rem;
}
.order-detail-center-remark>div:nth-of-type(1){
  font-weight: 500;
  margin-bottom: .75rem;
}

.order-detail-center-price{
  padding: 1rem .75rem;
  text-align: right;
}
.order-detail-center-price>span:nth-of-type(1){
  color: #666;
  font-size: .75rem;
  margin-right: 1rem;
}
.order-detail-center-price>span:nth-of-type(2)>span:nth-of-type(2){
  color: #ED1F1F;
  font-size: 1rem;
}

.order-detail-bottom>div{
  height: 2rem;
  line-height: 2rem;
  padding: .75rem;
}
.order-detail-bottom>div:not(:last-child){
  padding-bottom: 0;
}

.fixed-btn{
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
}
.btn{
  text-align: right;
  padding: .5rem 1rem;
}
.jd-header,
.jd-header a {
  font-family: PingHei, Lucida Grande, Lucida Sans Unicode, STHeiti, Helvetica,
    Arial, Verdana, "sans-serif";
  font-size: 16px;
  text-decoration: none;
  color: #252525;
}
.jd-header {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 40px;
  text-decoration: none;
  color: #252525;
}
.jd-header-new-bar {
  position: relative;
  /* border-bottom :0.0357rem solid rgba(221,221,221,.8); */
  min-height: 40px;
  background: #fff;
}
.jd-header-icon-back,
.jd-header-icon-logo {
  position: absolute;
  width: 40px;
  height: 40px;
}
.jd-header-icon-back span {
  display: block;
  margin: 12px 0 0 10px;
  width: 20px;
  height: 20px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRCQTEyN0IzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzRCQTEyN0MzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NEJBMTI3OTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NEJBMTI3QTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PulQWg8AAAF/SURBVHja7Ni9SsRAEAfwnd1wldiIlqK1td4LiL7CFQaFCHZWgmVqH+GK4FejryA+gPcA9vZ2YnVkd5yAcBLOYJKZ3UWyRbIchPsxSzb/HUBEFfPQKvIxAP89MGn7wPHpuTLOtXoGMdl1WF4rUBug9cX25tpdnufRVHBssXxGhTu0Y6yjs1P6bRTLEo9Lp56ohquLasKcbk5sifvgAMBRRc5oWoau4FIcfRJOaPoQ+i1uwt2H3mZYcdxAdhwnUATHBRTDcQBFcX2B4rg+QC+4rsA9X7gunzpQ1j7S3QuudQWz7HKFjjBbNXNR4QhaYcMCi+LqkwxvtbSX0SWNJVGjAZhQ1T4W8Qk11e2GpkexRP5ZotVBHUmXWwlk122mCZnGAPwV+b3caQxAL0iOsCCK5IpbYkjOwCqC5I787EiJQxMrUurY2YScxNI8Woq0qKZtUpR062NmQB/+RALgqM3/+mgevRhI9imMvVIcewdtqtbH/M8BdOhRD8DA40uAAQDL2thNJDxLvAAAAABJRU5ErkJggg==)
    no-repeat 50%;
  background-position: 0 0;
  background-size: contain;
}
</style>
