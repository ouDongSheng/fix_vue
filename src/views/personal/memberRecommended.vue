<template>
    <div class="memberRecommended"> 
    <div class="member-Recommended-content">
      <div class="detail_row detail_cmt" id="mainCmt" style="">
            <div class="cmt_list_wrap">
                <ul class="cmt_list" id="evalDet_main"><li><div class="cmt_user" ptag="7001.3.7"><img src="//storage.360buyimg.com/i.imageUpload/616d6f7335323731343234383733333538343534_sma.jpg"><span class="user">n***n</span><span class="credit star-five"><span></span></span><span class="date">2019-12-31</span></div><div class="cmt_cnt" ptag="7001.3.7">首先颜值真的很高啊，浅灰色的 硅胶材质，手感真的一级棒，刷头也是硅胶的，洗锅的时候还是很方便的，手不需要沾水就能轻松洗干净，尤其是在洗热锅的时候真的太有用了，这家的家居用品设计得都挺好看的，又实用，已经买了很多宝贝了。</div><div class="cmt_att" ptag="7001.3.7"><span class="video" data-video="https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/451bc60f264503006274838529/v.f30.mp4?dockingId=90d852ba-e380-405b-877f-b71ff85735e7&amp;storageSource=3" style="overflow:hidden;"><video data-width="720" data-height="1280" width="100%" height="auto" src="https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/451bc60f264503006274838529/v.f30.mp4?dockingId=90d852ba-e380-405b-877f-b71ff85735e7&amp;storageSource=3" poster="//img.300hu.com/4c1f7a6atransbjngwcloud1oss/451bc60f264503006274838529/imageSampleSnapshot/1577798436_412594380.100_873.jpg" webkit-playsinline="true" playsinline="" preload="none" muted="muted">暂时不支持播放该视频</video><div class="button"></div></span><span class="img"><img ptag="7001.1.29" src="//img30.360buyimg.com/shaidan/s128x96_jfs/t1/102127/24/9234/251799/5e0b4c30E7f779429/60d057b1740f271e.jpg!cc_100x100!q70.dpg.webp" prview="//img30.360buyimg.com/shaidan/jfs/t1/102127/24/9234/251799/5e0b4c30E7f779429/60d057b1740f271e.jpg!q70.dpg.webp"></span><span class="img"><img ptag="7001.1.29" src="//img30.360buyimg.com/shaidan/s128x96_jfs/t1/103068/37/9069/234333/5e0b4c30Eaded0aeb/1cd799709a80357e.jpg!cc_100x100!q70.dpg.webp" prview="//img30.360buyimg.com/shaidan/jfs/t1/103068/37/9069/234333/5e0b4c30Eaded0aeb/1cd799709a80357e.jpg!q70.dpg.webp"></span></div></li><li><div class="cmt_user" ptag="7001.3.8"><img src="//img11.360buyimg.com/jdphoto/s40x40_jfs/t1/25255/18/10701/1678/5c89f892E78c04688/684d63c0d68e39b1.png"><span class="user">j***v</span><span class="credit star-five"><span></span></span><span class="date">2019-09-27</span></div><div class="cmt_cnt" ptag="7001.3.8">此用户未填写评价内容</div><div class="cmt_att" ptag="7001.3.8"><span class="img"><img ptag="7001.1.29" src="//img30.360buyimg.com/shaidan/s128x96_jfs/t1/51881/2/12133/532903/5d8decd7E1b02532f/1864b6b795e6708b.jpg!cc_100x100!q70.dpg.webp" prview="//img30.360buyimg.com/shaidan/jfs/t1/51881/2/12133/532903/5d8decd7E1b02532f/1864b6b795e6708b.jpg!q70.dpg.webp"></span></div></li></ul>
                <div id="summaryEnter3" class="cmt_more" style=""><a href="javascript:;" ptag="7001.1.28" class="cmt_more_lnk">查看全部评价<i class="icon_arrow"></i></a></div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import $ from "jquery";
import api from '../../api';
import wxapi from '@/assets/js/jweixin.js'
import config from '../../api/config.js'
import commonUtil from '@/assets/js/commonUtil.js';
export default {
  name: "memberRecommended",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      loginFlag: true,

      id: "", // 产品id
      detail: {
        id: '',
        name: '',
        price: '',
        marketPrice: '',
        total: '',
        smallPic: '',
        content: ''

      }, // 产品详情
      
      goodsList: [{
        id: '',
        price: '',
        propertyGoods:[{
          value: ''
        },{
          value: ''
        }]
      }], // 商品列表
      pIndex: "", // 选中第几个规格
      selectGoodsDetail: {
        goodsId: '',
        name: "",
        pic: process.env.BASE_URL+"img/productImg.png",
        property: "",
        price: "",
        count: "",
        freight: ""
      }, // 选择的商品详情

      show: false, // 规格弹出层
      ipAndPort: config.ipAndPort,
    };
  },
  created() {
    var token = localStorage.getItem('ende-ecology-toke')
    if(!token){
      this.loginFlag = false
    }
    this.$store.commit("onProductId", '');
    // this.id = this.$route.query.id;
    //获取产品详情,进行渲染
    // this.findProductInfo(this.id);
  },
  mounted() {
    wxapi.wxRegister(this.wxRegCallback)
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
      this.onPShow()
    },
    onPBuy() {
      if(this.selectGoodsDetail.property){
        this.selectGoodsDetail.productId = this.id
        this.$router.push({
          path: '/sureOrder',
          query: this.selectGoodsDetail
        })
      }else{
        this.$toast('请选择规格')
      }
    },
    findProductInfo(productId) {
      //查询商品详情
      api.findProductInfo({
        productId: productId
      }).then(res => {
        if(res.code == 200){
          //商品详情
          let productInfo = res.data;
          this.detail.id = productInfo.id;//产品id
          this.id = productInfo.id;//产品id
          this.selectGoodsDetail.name = productInfo.name
          this.detail.name = productInfo.name;//产品名称
          this.detail.price = productInfo.priceRange;//产品价格区间
          this.detail.marketPrice = productInfo.marketPriceRange;//产品市场价格区间
          this.detail.total = productInfo.salesVolume;//产品销量
          this.detail.content = productInfo.content;//商品详情
          //轮播图片,后台是以逗号分隔进行保存
          let smallPic = productInfo.smallPic;
          if(smallPic){
            this.detail.smallPic = smallPic.split(',');
          }
          //开始处理商品信息,将后台返回的商品good数组转化为需要的数据
          let goodVoList = productInfo.goodVoList;
          if(goodVoList){
            let goodsList = goodVoList.map(item => {
              //商品的规格信息
              let goodSpecVoList = item.goodSpecVoList;
              //将规格转化
              let propertyGoods = goodSpecVoList.map(goodSpecItem => {
                return {
                  value: goodSpecItem.specValue
                }
              });
              return {
                id: item.id,
                price: item.price,
                propertyGoods: propertyGoods
              }
            });
            this.goodsList = goodsList;

            if(this.goodsList.length == 1){
              this.pIndex = 0;
              var property = ''
              for(var i = 0;i<this.goodsList[0].propertyGoods.length;i++){
                property += this.goodsList[0].propertyGoods[i].value
                if(i != this.goodsList[0].propertyGoods.length-1){
                  property += '/'
                }
              }
              this.selectGoodsDetail.property = property
              this.selectGoodsDetail.goodsId = this.goodsList[this.pIndex].id;
              this.selectGoodsDetail.price = this.goodsList[this.pIndex].price;
              this.selectGoodsDetail.pic = this.detail.smallPic[0];
            }
          }

        }
      });
    },
    wxRegCallback () {
      // 用于微信JS-SDK回调
      this.onShare()
    },
    onShare(){
      // 微信自定义分享给朋友
      var userInfo = localStorage.getItem('ende-ecology-userinfo')
      userInfo = JSON.parse(userInfo)
      var shareUserId = userInfo.id
      let option = {
        title: this.detail.name, // 分享标题, 请自行替换
        desc: "售价：¥"+this.detail.price+"。家电清洗，质量保证，好物与你分享", // 分享描述, 请自行替换
        link: this.ipAndPort + '?shareUserId='+shareUserId+'#/productDetail?id='+this.id, // 分享链接，根据自身项目决定是否需要split
        imgUrl: this.detail.smallPic[0], // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option)
    },
    onLogin() {
      //登录
      var shareUserId = commonUtil.parseUrlParams('shareUserId')
      window.location.href = this.ipAndPort + '?shareUserId='+shareUserId+'&productId='+this.id+'#/login'
    }
  }
};
</script>

<style scoped>

.detail_row {
    min-height: 45px;
}
.detail_extra .detail_row {
    position: relative;
    border-bottom: 1px solid #ddd;
}
.detail_extra .detail_row.detail_row_cmt{
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
}

.detail_row_cmt p.good {
    left: 52px;
    color: #e4393c;
}

.detail_row_cmt p.count, .detail_row_cmt p.good {
    font-size: 12px;
    position: absolute;
    top: 1px;
    height: 44px;
    /* line-height: 44px; */
}
.detail_row_cmt p.count, .detail_row_cmt p.good {
    font-size: 12px;
    position: absolute;
    top: 1px;
    height: 44px;
    /* line-height: 44px; */
}
.detail_row_cmt p.count {
    right: 40px;
}
.detail_row .icon_promote{
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

.de_oline, .detail_cmt .cmt_user .user {
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
.detail_cmt .cmt_user .credit.star-five::after, .detail_cmt .cmt_user .credit.star-five::before, .detail_cmt .cmt_user .credit.star-five span, .detail_cmt .cmt_user .credit.star-five span::after, .detail_cmt .cmt_user .credit.star-five span::before {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTOk7PfE/P+w7Peo8Pv/Cwuk7Peo7PfVDQ+k7Peo7Peo7Puo7Pes8QOo8Puo+Puk7Pd05YTYAAAAQdFJOUwDxGEVwAeW8Cs6SVqtDfkqlA0EYAAAAgklEQVQY02WQWRIEIQhD0UZBe+P+px1xsFoxn69YkgCYElECr1Pk3GARKZ4d0nQ4SAppQQmlC+0X31gpiylTxZv1gVeBa4cXMHlGDBtV1uhytvDfQAwfC3Fxbstz7s/OyDOvj/7i/MhuprcHfJ4e9rXJ1kZAdYztDo4uc7WlWLN2+gOAXgycMCRyywAAAABJRU5ErkJggg==);
}
.detail_cmt .cmt_user .credit::after, .detail_cmt .cmt_user .credit::before, .detail_cmt .cmt_user .credit span::after, .detail_cmt .cmt_user .credit span::before {
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
.detail_cmt .cmt_att .img, .detail_cmt .cmt_att .video {
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
.detail_cmt .cmt_att .img, .detail_cmt .cmt_att .video {
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

a, div, header, span {
    -webkit-tap-highlight-color: rgba(255,255,255,0);
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
@media only screen and (-webkit-min-device-pixel-ratio: 2)
.cmt_more .cmt_more_lnk:before {
    -webkit-transform: scale(.5);
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
</style>