<template>
  <div class="typeProductDetail">
    <div class="product-detail-content">
      <!-- <div id="m_common_header" class="m_item_header">
        <header class="jd-header">
          <div class="jd-header-new-bar" id="jd_header_new_bar">
            <div class="jd-header-icon-back J_ping">
              <span v-on:click="back"></span>
            </div>
            <div class="jd-header-new-title" >
              <span id="summary_title" style>商品详情</span>
            </div>
          </div> 
        </header>
      </div>-->

      <div>
        <van-swipe :autoplay="3000" indicator-color="#199BFF" :height="320">
          <van-swipe-item v-for="(pic,picIndex) in detail.smallPic" :key="picIndex">
            <div class="jd-header-icon-back J_ping" v-on:click="back">
              <span></span>
            </div>
            <van-image fit="contain" :src="pic"></van-image>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-detail-text">
        <div>
          <div class="product-detail-title">
            <div class="product-detail-name">{{detail.name}}</div>
            <!-- <div class="product-detail-share" @click="onShare">
              <van-image fit="contain" :src="`${publicPath}img/product-detail-share.png`"></van-image>
              <div>分享</div>
            </div>-->
          </div>
          <div class="product-detail-price">
            <div>
              <div class="product-detail-p">
                <span>￥</span>
                <span>{{detail.price}}</span>
              </div>
              <div class="product-detail-del">￥{{detail.marketPrice|formatPrice}}</div>
            </div>
            <div class="product-detail-total">
              <span>销量：</span>
              <span>{{detail.total}}</span>
            </div>
          </div>
        </div>
        <div class="product-detail-serve">
          <div>
            <div>服务：</div>
            <div>
              <van-image fit="contain" :src="`${publicPath}img/product-detail-serve.png`"></van-image>
              <span>7天无理由退换</span>
            </div>
          </div>
        </div>
        <div class="product-detail-sku">
          <div>
            <div>规格：</div>
            <div>{{selectGoodsDetail.property ? selectGoodsDetail.property:'点击选择商品规格'}}</div>
          </div>
          <div @click="onPShow">
            <van-image fit="contain" :src="`${publicPath}img/product-detail-more.png`"></van-image>
          </div>
        </div>
      </div>

      <div class="detail_extra" style="margin-top: -0.7rem;">
        <div class="detail_row detail_row_cmt" id="summaryEnter" ptag="7001.1.27" style empty>
          <h3 class="tit" id="summaryTitle">评价</h3>
          <i class="icon_promote" id="summaryEnterIco"></i>
          <p class="good" id="evalRateP">
            好评
            <strong id="evalRate">100%</strong>
          </p>
          <p class="count">
            共
            <span class="num" id="evalNo2">300+</span> 条
          </p>
          <p class="cmt_none_tips" id="evalNone" style="display: none;">暂无评价，欢迎您购买之后留下宝贵的评价</p>
        </div>
      </div>

      <div class="detail_row detail_cmt" id="mainCmt" style>
        <div class="cmt_list_wrap">
          <ul class="cmt_list" id="evalDet_main">
            <li>
              <div class="cmt_user" ptag="7001.3.7">
                <img
                  src="//storage.360buyimg.com/i.imageUpload/616d6f7335323731343234383733333538343534_sma.jpg"
                />
                <span class="user">n***nfafsdaf</span>
                <span class="credit star-five">
                  <span></span>
                </span>
                <span class="date">2019-12-31</span>
              </div>
              <div
                class="cmt_cnt"
                ptag="7001.3.7"
              >首先颜值真的很高啊，浅灰色的 硅胶材质，手感真的一级棒，刷头也是硅胶的，洗锅的时候还是很方便的，手不需要沾水就能轻松洗干净，尤其是在洗热锅的时候真的太有用了，这家的家居用品设计得都挺好看的，又实用，已经买了很多宝贝了。</div>
              <div class="cmt_att" ptag="7001.3.7">
                <span
                  class="video"
                  data-video="https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/451bc60f264503006274838529/v.f30.mp4?dockingId=90d852ba-e380-405b-877f-b71ff85735e7&amp;storageSource=3"
                  style="overflow:hidden;"
                >
                  <video
                    data-width="720"
                    data-height="1280"
                    width="100%"
                    height="auto"
                    src="https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/451bc60f264503006274838529/v.f30.mp4?dockingId=90d852ba-e380-405b-877f-b71ff85735e7&amp;storageSource=3"
                    poster="//img.300hu.com/4c1f7a6atransbjngwcloud1oss/451bc60f264503006274838529/imageSampleSnapshot/1577798436_412594380.100_873.jpg"
                    webkit-playsinline="true"
                    playsinline
                    preload="none"
                    muted="muted"
                  >暂时不支持播放该视频</video>
                  <div class="button"></div>
                </span>
                <span class="img">
                  <img
                    ptag="7001.1.29"
                    src="//img30.360buyimg.com/shaidan/s128x96_jfs/t1/102127/24/9234/251799/5e0b4c30E7f779429/60d057b1740f271e.jpg!cc_100x100!q70.dpg.webp"
                    prview="//img30.360buyimg.com/shaidan/jfs/t1/102127/24/9234/251799/5e0b4c30E7f779429/60d057b1740f271e.jpg!q70.dpg.webp"
                  />
                </span>
                <span class="img">
                  <img
                    ptag="7001.1.29"
                    src="//img30.360buyimg.com/shaidan/s128x96_jfs/t1/103068/37/9069/234333/5e0b4c30Eaded0aeb/1cd799709a80357e.jpg!cc_100x100!q70.dpg.webp"
                    prview="//img30.360buyimg.com/shaidan/jfs/t1/103068/37/9069/234333/5e0b4c30Eaded0aeb/1cd799709a80357e.jpg!q70.dpg.webp"
                  />
                </span>
              </div>
            </li>
            <li>
              <div class="cmt_user" ptag="7001.3.8">
                <img
                  src="//img11.360buyimg.com/jdphoto/s40x40_jfs/t1/25255/18/10701/1678/5c89f892E78c04688/684d63c0d68e39b1.png"
                />
                <span class="user">j***v</span>
                <span class="credit star-five">
                  <span></span>
                </span>
                <span class="date">2019-09-27</span>
              </div>
              <div class="cmt_cnt" ptag="7001.3.8">此用户未填写评价内容</div>
              <div class="cmt_att" ptag="7001.3.8">
                <span class="img">
                  <img
                    ptag="7001.1.29"
                    src="//img30.360buyimg.com/shaidan/s128x96_jfs/t1/51881/2/12133/532903/5d8decd7E1b02532f/1864b6b795e6708b.jpg!cc_100x100!q70.dpg.webp"
                    prview="//img30.360buyimg.com/shaidan/jfs/t1/51881/2/12133/532903/5d8decd7E1b02532f/1864b6b795e6708b.jpg!q70.dpg.webp"
                  />
                </span>
              </div>
            </li>
          </ul>
          <div id="summaryEnter3" class="cmt_more" @click="onEvaluate()" style>
            <a href="javascript:;" ptag="7001.1.28" class="cmt_more_lnk">
              查看全部评价
              <i class="icon_arrow"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="product-detail-detail">
        <div class="product-detail-detail-title">商品详情</div>
        <div class="product-detail-detail-content" v-html="detail.content"></div>
      </div>
    </div>

    <van-popup v-model="show" position="bottom" :duration=".3" :style="{ height: '490px' }">
      <div class="sku-goods">
        <div class="sku-goods-div">
          <div class="sku-goods-img">
            <van-image fit="contain" :src="detail.smallPic[0]"></van-image>
          </div>
          <div class="sku-goods-label">
            <div>{{selectGoodsDetail.name}}</div>
            <div v-if="selectGoodsDetail.price">￥{{selectGoodsDetail.price}}</div>
            <div v-else>￥{{detail.price}}</div>
          </div>
        </div>
        <div class="sku-goods-sku">
          <div>规格</div>
          <div>
            <ul>
              <li
                :class="pIndex === indexl ? 'active':''"
                v-for="(goodsl,indexl) in goodsList"
                :key="goodsl.id"
                @click="onPSelect(indexl)"
              >
                <span v-for="(pgoods,pindex) in goodsl.propertyGoods">
                  {{pgoods.value}}
                  <span v-if="pindex<goodsl.propertyGoods.length-1">/</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="sku-good-num">
          <div>数量</div>
          <div>
            <van-stepper v-model="selectGoodsDetail.count" @change="onCount" />
          </div>
        </div>
        <div class="sku-goods-btn">
          <van-button type="info" block @click="onPBuy" v-if="loginFlag">立即购买</van-button>
          <van-button type="info" block @click="onLogin" v-else>登录</van-button>
        </div>
      </div>
    </van-popup>

    <div class="fixed-btn">
      <div class="btn">
        <van-button type="info" block @click="onBuy" v-if="loginFlag">立即购买</van-button>
        <van-button type="info" block @click="onLogin" v-else>登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import api from "../../api";
import wxapi from "@/assets/js/jweixin.js";
import config from "../../api/config.js";
import commonUtil from "@/assets/js/commonUtil.js";
export default {
  name: "productDetail",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      loginFlag: true,

      productType: "", // 商品类型
      detail: {
        id: "",
        name: "",
        price: "",
        marketPrice: "",
        total: "",
        smallPic: "",
        content: ""
      }, // 产品详情

      goodsList: [
        {
          id: "",
          price: "",
          propertyGoods: [
            {
              value: "",
              imageValue:""
            },
            {
              value: "",
              imageValue:""
            }
          ]
        }
      ], // 商品列表
      pIndex: "", // 选中第几个规格
      selectGoodsDetail: {
        goodsId: "",
        name: "",
        pic: process.env.BASE_URL + "img/productImg.png",
        property: "",
        price: "",
        count: "",
        freight: ""
      }, // 选择的商品详情

      show: false, // 规格弹出层
      ipAndPort: config.ipAndPort
    };
  },
  created() {
    var token = localStorage.getItem("ende-ecology-toke");
    if (!token) {
      this.loginFlag = false;
    }
    this.$store.commit("onProductId", "");
    this.productType = this.$route.query.productType;
    this.masterCategory = this.$route.query.masterCategory;
    //获取产品详情,进行渲染
    this.listByType(this.productType, this.masterCategory);
  },
  mounted() {
    wxapi.wxRegister(this.wxRegCallback);
  },
  methods: {
    onPShow() {
      // 弹出选择规格
      this.show = true;
    },
    onPClose() {
      // 关闭选择规格
      this.show = false;
    },
    onPSelect(num) {
      // 选择规格
      var list = this.goodsList;
      this.pIndex = num;
      this.selectGoodsDetail.property = $(".sku-goods-sku li")
        .eq(this.pIndex)
        .text();
      this.selectGoodsDetail.goodsId = list[this.pIndex].id;
      this.selectGoodsDetail.price = list[this.pIndex].price;
      this.selectGoodsDetail.pic = this.detail.smallPic[0];
    },
    onCount(value) {
      // 数量发生改变
      this.selectGoodsDetail.count = value;
    },
    onBuy() {
      // 立即购买
      this.onPShow();
    },
    onPBuy() {
      if (this.selectGoodsDetail.property) {
        this.selectGoodsDetail.productId = this.id;
        this.$router.push({
          path: "/sureOrder",
          query: this.selectGoodsDetail
        });
      } else {
        this.$toast("请选择规格");
      }
    },
    listByType(productType, masterCategory) {
      //查询商品详情
      api
        .listByType({
          productType: productType,
          masterCategory: masterCategory
        })
        .then(res => {
          if (res.code == 200) {
            //商品详情
            let productInfo = res.data;
            this.detail.id = productInfo.id; //产品id
            this.id = productInfo.id; //产品id
            this.selectGoodsDetail.name = productInfo.name;
            this.detail.name = productInfo.name; //产品名称
            this.detail.price = productInfo.priceRange; //产品价格区间
            this.detail.marketPrice = productInfo.marketPriceRange; //产品市场价格区间
            this.detail.total = productInfo.salesVolume; //产品销量
            this.detail.content = productInfo.content; //商品详情
            //轮播图片,后台是以逗号分隔进行保存
            let smallPic = productInfo.smallPic;
            if (smallPic) {
              this.detail.smallPic = smallPic.split(",");
            }
            //开始处理商品信息,将后台返回的商品good数组转化为需要的数据
            let goodVoList = productInfo.goodVoList;
            if (goodVoList) {
              let goodsList = goodVoList.map(item => {
                //商品的规格信息
                let goodSpecVoList = item.goodSpecVoList;
                //将规格转化
                let propertyGoods = goodSpecVoList.map(goodSpecItem => {
                  return {
                    value: goodSpecItem.specValue
                  };
                });
                return {
                  id: item.id,
                  price: item.price,
                  propertyGoods: propertyGoods
                };
              });
              this.goodsList = goodsList;

              if (this.goodsList.length == 1) {
                this.pIndex = 0;
                var property = "";
                for (
                  var i = 0;
                  i < this.goodsList[0].propertyGoods.length;
                  i++
                ) {
                  property += this.goodsList[0].propertyGoods[i].value;
                  if (i != this.goodsList[0].propertyGoods.length - 1) {
                    property += "/";
                  }
                }
                this.selectGoodsDetail.property = property;
                this.selectGoodsDetail.goodsId = this.goodsList[this.pIndex].id;
                this.selectGoodsDetail.price = this.goodsList[
                  this.pIndex
                ].price;
                this.selectGoodsDetail.pic = this.detail.smallPic[0];
              }
            }
          }
        });
    },
    wxRegCallback() {
      // 用于微信JS-SDK回调
      this.onShare();
    },
    onShare() {
      // 微信自定义分享给朋友
      var userInfo = localStorage.getItem("ende-ecology-userinfo");
      userInfo = JSON.parse(userInfo);
      var shareUserId = userInfo.id;
      let option = {
        title: this.detail.name, // 分享标题, 请自行替换
        desc:
          "售价：¥" + this.detail.price + "。家电清洗，质量保证，好物与你分享", // 分享描述, 请自行替换
        link:
          this.ipAndPort +
          "?shareUserId=" +
          shareUserId +
          "#/productDetail?id=" +
          this.id, // 分享链接，根据自身项目决定是否需要split
        imgUrl: this.detail.smallPic[0], // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        }
      };
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option);
    },
    onLogin() {
      //登录
      var shareUserId = commonUtil.parseUrlParams("shareUserId");
      window.location.href =
        this.ipAndPort +
        "?shareUserId=" +
        shareUserId +
        "&productId=" +
        this.id +
        "#/login";
    },
    onEvaluate() {
      this.$router.push({
        path: "/comment",
        query: {
          productId: this.id
        }
      });
    },
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style scoped>
.van-swipe,
.product-detail-text {
  background: #fff;
}
.van-swipe {
  background: #f8f8f8;
}
.van-swipe .van-image {
  z-index: -1;
  height: 320px;
}

.product-detail-text > div {
  margin-left: 1rem;
  border-bottom: 0.03rem solid rgba(221, 221, 221, 0.6);
}
.product-detail-title {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}
.product-detail-name {
  font-size: 0.88rem;
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.product-detail-share {
  display: flex;
  flex-direction: column;
  font-size: 0.69rem;
  color: #199bff;
  width: 3rem;
  flex-shrink: 0;
  align-content: center;
  align-items: center;
}
.product-detail-share .van-image {
  width: 1.09rem;
  height: 1.09rem;
  padding: 0.2rem 0;
}

.product-detail-price {
  display: flex;
  justify-content: space-between;
  padding: 0 0.8rem 0.8rem 0;
  align-items: baseline;
}
.product-detail-price > div {
  display: flex;
  align-items: baseline;
}
.product-detail-p {
  color: #ed1f1f;
  margin-right: 0.6rem;
  font-weight: 500;
}
.product-detail-p > span:nth-of-type(1) {
  font-size: 0.75rem;
}
.product-detail-p > span:nth-of-type(2) {
  font-size: 0.81rem;
}
.product-detail-del {
  color: #666666;
  font-size: 0.75rem;
  text-decoration: line-through;
}
.product-detail-total {
  font-size: 0.75rem;
  color: #999;
}
.product-detail-serve,
.product-detail-sku {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.8rem 1rem 0;
  font-size: 0.81rem;
}
.product-detail-serve > div,
.product-detail-sku > div {
  display: flex;
  align-items: center;
}
.product-detail-serve > div .van-image {
  width: 0.88rem;
  height: 0.88rem;
  padding: 0 0.3rem;
}
.product-detail-serve > div > div:nth-of-type(2) {
  display: flex;
  align-items: center;
}
.product-detail-sku > div .van-image {
  width: 1.69rem;
  height: 0.44rem;
}
.product-detail-sku > div > div:nth-of-type(2) {
  color: #666666;
}

.product-detail-detail {
  margin-top: 0.63rem;
}
.product-detail-detail-title {
  padding: 1rem;
  text-align: center;
  font-size: 0.81rem;
  font-weight: 500;
  background: #fff;
}

/* 规格 start */
.sku-goods {
  padding: 16px;
  background: #fff;
  position: relative;
}
.sku-goods-div {
  display: flex;
  align-items: center;
}
.sku-goods-img {
  width: 98.88px;
  height: 98.88px;
  margin-right: 1rem;
  background: #f8f8f8;
  flex-shrink: 0;
}
.sku-goods-img .van-image {
  width: 98.88px;
  height: 98.88px;
}
.sku-goods-label > div:nth-of-type(1) {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.25rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 1rem;
}
.sku-goods-label > div:nth-of-type(2) {
  color: #ed1f1f;
  font-size: 1rem;
}
.sku-goods-sku {
  margin-top: 16px;
  overflow: auto;
  height: 240px;
}
.sku-goods-sku > div:nth-of-type(1) {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.25rem;
}
.sku-goods-sku > div:nth-of-type(2) {
  overflow: hidden;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.sku-goods-sku > div:nth-of-type(2) li {
  float: left;
  margin-right: 16px;
  margin-bottom: 16px;
  padding: 0 0.5rem;
  height: 1.75rem;
  border: 1px solid #999999;
  border-radius: 0.3rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #666666;
  text-align: center;
  line-height: 2rem;
}
.sku-goods-sku > div:nth-of-type(2) li.active {
  background: rgba(25, 155, 255, 0.12);
  border-color: #199bff;
  color: #199bff;
}
.sku-good-num {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sku-good-num > div:nth-of-type(1) {
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.25rem;
}
.sku-good-num > div:nth-of-type(2) {
  overflow: hidden;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.sku-goods-btn {
  padding: 16px 16px 0 16px;
}
/* 规格 end */
.product-detail-detail-content {
  overflow: hidden;
  margin-bottom: 5rem;
}
.product-detail-detail-content >>> img {
  width: 100%;
  display: block;
}
.fixed-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
}
.btn {
  padding: 0.5rem 2rem;
}

.detail_row {
  min-height: 45px;
}
.detail_extra .detail_row {
  position: relative;
  border-bottom: 1px solid #ddd;
}
.detail_extra .detail_row.detail_row_cmt {
  border-bottom: 0;
  background: #fff;
}

.detail_row .tit {
  min-width: 40px;
  font-size: 12px;
  color: #999;
  font-weight: 400;
}
.detail_row_cmt h3.tit {
  font-size: 14px;
  padding: 0;
}
.detail_row h3.tit {
  font-size: 16px;
  color: #333;
  padding: 10px 0;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  margin-inline-end: 0px;
  margin-inline-end: 0px;
}

.detail_row_cmt p.good {
  left: 52px;
  color: #e4393c;
}

.detail_row_cmt p.count,
.detail_row_cmt p.good {
  font-size: 12px;
  position: absolute;
  top: 1px;
  height: 44px;
  /* line-height: 44px; */
}
.detail_row_cmt p.count,
.detail_row_cmt p.good {
  font-size: 12px;
  position: absolute;
  top: 1px;
  height: 44px;
  /* line-height: 44px; */
}
.detail_row_cmt p.count {
  right: 40px;
}
.detail_row .icon_promote {
  background-image: url(//wq.360buyimg.com/fd/base/img/detail/old/detail_v1_3.png?t=20141125);
  background-repeat: no-repeat;
  background-size: 100px auto;
}
.detail_row .icon_promote {
  width: 20px;
  height: 20px;
  background-position: -80px -35px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  right: 10px;
}

.detail_cmt .cmt_user img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  vertical-align: middle;
  border: 0 none;
}

.de_oline,
.detail_cmt .cmt_user .user {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.detail_cmt .cmt_user .user {
  margin-left: 10px;
  display: inline-block;
  color: #333;
  max-width: 8.2em;
  vertical-align: middle;
}

.detail_cmt .cmt_user .credit {
  position: relative;
  display: inline-block;
  width: 55px;
  height: 10px;
  margin: -2px 0 -2px 5px;
  vertical-align: middle;
}
.detail_cmt .cmt_user .credit::before {
  left: 0;
}
.detail_cmt .cmt_user .credit span::before {
  left: -11px;
}
.detail_cmt .cmt_user .credit span::after {
  right: -12px;
}
.detail_cmt .cmt_user .credit::after {
  right: 0;
}
.detail_cmt .cmt_user .credit.star-five::after,
.detail_cmt .cmt_user .credit.star-five::before,
.detail_cmt .cmt_user .credit.star-five span,
.detail_cmt .cmt_user .credit.star-five span::after,
.detail_cmt .cmt_user .credit.star-five span::before {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTOk7PfE/P+w7Peo8Pv/Cwuk7Peo7PfVDQ+k7Peo7Peo7Puo7Pes8QOo8Puo+Puk7Pd05YTYAAAAQdFJOUwDxGEVwAeW8Cs6SVqtDfkqlA0EYAAAAgklEQVQY02WQWRIEIQhD0UZBe+P+px1xsFoxn69YkgCYElECr1Pk3GARKZ4d0nQ4SAppQQmlC+0X31gpiylTxZv1gVeBa4cXMHlGDBtV1uhytvDfQAwfC3Fxbstz7s/OyDOvj/7i/MhuprcHfJ4e9rXJ1kZAdYztDo4uc7WlWLN2+gOAXgycMCRyywAAAABJRU5ErkJggg==);
}
.detail_cmt .cmt_user .credit::after,
.detail_cmt .cmt_user .credit::before,
.detail_cmt .cmt_user .credit span::after,
.detail_cmt .cmt_user .credit span::before {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTOrq6uXl5ebm5ubm5v///+bm5ubm5vDw8OXl5ebm5ubm5ufn5+Xl5ebm5ubm5uXl5cptC0AAAAAQdFJOUwAYxM9wAUS7CuvdklarfkpFaLaRAAAAgElEQVQY02WQWw7AIAgEUVGgtpX7n7ZqMPUxf07iAgtgRKIIO7fqfcigGnaXtJI2SU3SoiJqB20WJ8wkaghlTAyXHgR4TvkA0+6Ia6hfnec+yp8OwMnvxC2bW+B897/OYM4c/blZjszSHtf79uOKydqGYNsY6xo4upRsn1yW1ukHbcYMr6UpbM0AAAAASUVORK5CYII=);
  display: inline-block;
  content: "";
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  margin-right: 1px;
  background-size: cover;
}
.detail_cmt .cmt_user .credit span {
  width: 10px;
  height: 10px;
  margin-right: 1px;
  position: absolute;
  top: 0;
  left: 22px;
  background-size: cover;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBT…/OYM4c/blZjszSHtf79uOKydqGYNsY6xo4upRsn1yW1ukHbcYMr6UpbM0AAAAASUVORK5CYII=);
}
.detail_cmt .cmt_list {
  font-size: 12px;
  color: #333;
  margin-bottom: -1px;
}
.detail_cmt .cmt_user {
  line-height: 25px;
  margin-bottom: 8px;
  background: #fff;
}
.detail_cmt .cmt_user .date {
  float: right;
  color: #999;
  margin-left: -60px;
}
#evalDet_main .cmt_cnt {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  background: #fff;
}

.detail_cmt .cmt_cnt {
  position: relative;
  line-height: 1.5;
  font-size: 14px;
  margin: 5px 0;
  word-break: break-all;
  overflow: hidden;
  white-space: pre-line;
  max-height: 126px;
}
.detail_cmt .cmt_list {
  font-size: 12px;
  color: #333;
  margin-bottom: -1px;
}
.detail_cmt .cmt_att {
  margin-right: -10px;
  padding-bottom: 4px;
}
#evalDet_main .cmt_att {
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
  overflow-x: auto;
}
.detail_cmt .cmt_list {
  font-size: 12px;
  color: #333;
  margin-bottom: -1px;
}
#evalDet_main .cmt_att {
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
  overflow-x: auto;
  background: #fff;
}
.detail_cmt .cmt_att .img,
.detail_cmt .cmt_att .video {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 2px;
  overflow: hidden;
  text-align: center;
  background: #f3f3f3;
  vertical-align: middle;
}
.detail_cmt .cmt_att .video {
  position: relative;
  overflow: hidden;
}
.detail_row {
  position: relative;
  padding: 0 10px;
  display: block;
  font-size: 12px;
  background: #fff;
}
.detail_cmt .cmt_list {
  font-size: 12px;
  color: #333;
  margin-bottom: -1px;
}
#evalDet_main .cmt_att {
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
  overflow-x: auto;
}
.detail_cmt .cmt_att .img,
.detail_cmt .cmt_att .video {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 2px;
  overflow: hidden;
  text-align: center;
  background: #f3f3f3;
  vertical-align: middle;
}
.cmt_more {
  text-align: center;
  background-color: #fff;
}

a,
div,
header,
span {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

.cmt_more .cmt_more_lnk {
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  text-align: center;
  color: #333;
  padding: 0 5px 0 10px;
  margin: 10px 0;
  position: relative;
  display: inline-block;
}
.cmt_more .cmt_more_lnk:before {
  border-color: #ccc;
  border-radius: 40px;
  border-width: 2px;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) .cmt_more .cmt_more_lnk:before {
  -webkit-transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  bottom: -100%;
  right: -100%;
}
.cmt_more .cmt_more_lnk:before {
  content: "";
  display: block;
  border: 1px solid #ddd;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
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
  min-height: 44px;
  text-decoration: none;
  color: #252525;
}
.jd-header-new-bar {
  position: relative;
  border-bottom: 1px solid #e5e5e5;
  min-height: 44px;
  background: #fff;
}
.jd-header-icon-back,
.jd-header-icon-logo {
  position: absolute;
  margin: 7px 0 0 5px;
  width: 30px;
  height: 30px;
  background-color: #666;
  border-radius: 20px;
  z-index: 999;
}
.jd-header-new-title {
  background-color: #999999;
  height: 44px;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.jd-header-icon-new-shortcut {
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 44px;
}
.jd-header-icon-back span {
  display: block;
  margin: 5px 0 0 3px;
  width: 20px;
  height: 20px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUdwTP///////////////////////////////xb9HQ4AAAAIdFJOUwD6i0/UdjQCdVO0QgAAAEZJREFUKM9jYKAiKMAixiqSgCmo0eGAIcbUgUVQo6PRAItC4WGjkBWbQhYsCrELYtWO1SLsThoWSh2IS2DYkyJDQQE1kj4AQAEnj84DdFIAAAAASUVORK5CYII=)
    no-repeat 50%;
  background-position: 0 0;
  background-size: contain;
}
.jd-header-icon-back span,
.jd-header-icon-cancel span,
.jd-header-icon-search span,
.jd-header-icon-shortcut span {
  overflow: hidden;
  text-indent: -100px;
}
.jd-header-icon-back J_ping {
    background-color: #666;
    padding: 5px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin: 7px 0 0 5px;
}
</style>
