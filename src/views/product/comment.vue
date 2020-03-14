<template>
  <div class="comment">
    <div class="comment-content">
      <div id="m_common_header" class="m_item_header">
        <header class="jd-header">
          <div class="jd-header-new-bar" id="jd_header_new_bar">
            <div class="jd-header-icon-back J_ping">
              <span v-on:click="back"></span>
            </div>
            <div class="jd-header-new-title">
              <span id="summary_title" style="margin-right: 5rem;">商品评价</span>
              <!-- <span id="evalRateP2">
                好评度
                <i id="evalRate2">100%</i>
              </span> -->
            </div>
          </div>
        </header>
      </div>

      <div class="detail_row detail_cmt" id="mainCmt" style>
        <div class="cmt_list_wrap">
          <div class="cmt_tag_container">
            <div class="cmt_tag cmt_tag_new threeLine" id="evalTag2" style>
              <span
                @click="onEvaluate(item.name)"
                no="3"
                ptag="7001.1.30"
                v-for="item in commentCountList"
                :key="item.name"
                :class="{selected : active == item.name}"
              >{{item.name}}({{item.count}})</span>
            </div>
          </div>
          <ul class="cmt_list" id="evalDet_main">
            <li v-for="comment in commentList" :key="comment.id">
              <div v-for="commentInfo in comment.commentInfoListVo" :key="commentInfo.id">
              <div class="cmt_user" ptag="7001.3.7">
                <img
                  :src="commentInfo.headImage"
                />
                <span class="user">{{commentInfo.account}}</span>
                <span class="credit star-five">
                  <span
                    v-for="gradleIndex in comment.grade"
                    :class="generateClassName(gradleIndex)"
                    :key="gradleIndex"
                  ></span>
                </span>
                <span class="date">{{comment.time}}</span>
              </div>
              <div
                class="cmt_cnt"
                ptag="7001.3.7"
              >{{commentInfo.content}}</div>
              <div class="cmt_att" ptag="7001.3.7">
                <span >
                  <img v-image-preview class="img" v-bind:src="commentInfo.images" />
                </span>
              </div>
              <div class="cmt_sku">
                <div class="reply">
                  <!-- <a
                    href="javascript:void(0);"
                    productid="100004549239"
                    orderid="103714916702"
                    guid="eddc7483-aa85-486b-b5e5-fb5694292701"
                    class="reply_btn btn"
                  >回复</a>-->
                  <!-- <a href="javascript:void(0);" class="reply_btn btn">回复</a> -->
                </div>
              </div>
              </div>
            </li>

            <!-- <li>
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
              <div class="cmt_sku">
                <div class="reply">
                  <a
                    href="javascript:void(0);"
                    class="reply_btn btn"
                  >回复</a>
                </div>
              </div>
            </li>-->
          </ul>
        </div>
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
  name: "comment",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      loginFlag: true,
      commentCountList: [
        {
          name: "",
          count: ""
        }
      ],
      active: "",
      allCount: "",
      goodCountL: "",
      badCount: "",
      mediumCount: "",
      imageCount: "",
      commentList: {
        id: "", // 评论id
        orderId: "",
        productId: "",
        grade: "",
        time: "",
        commentInfoListVo: {
          id: "",
          userId: "",
          content: "",
          images: "",
          commentId: "",
          parentId: "",
          account:"",
          headImage:""
        }
      },

      show: false, // 规格弹出层
      ipAndPort: config.ipAndPort
    };
  },
  created() {
    var token = localStorage.getItem("ende-ecology-toke");
    if (!token) {
      this.loginFlag = false;
    }
    this.active = "全部";
    // this.$store.commit("onProductId", "");
    this.productId = this.$route.query.productId;
    //获取产品详情,进行渲染
    this.listAllComment(this.productId);
    this.listCountComment(this.productId);
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
    back(){
        this.$router.go(-1);//返回上一层
    }
,
    listAllComment(productId) {
      api
        .listAllComment({
          productId: productId
        })
        .then(res => {
          if (res.code == 200) {
            //商品详情
            let commentInfo = res.data;
            var _this = this;
            _this.commentList = commentInfo;
            _this.allCount = commentInfo.length;
            //讲后台时间戳转成yyyy-MM-dd格式
            for (var i in _this.commentList) {
              var date = new Date(_this.commentList[i].time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + "-";
              var M =
                (date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1) + "-";
              var D = date.getDate() + " ";
              _this.commentList[i].time = Y + M + D;

              //隐藏用户昵称
              for (var j = 0; j < _this.commentList[i].commentInfoListVo.length; j++) {
                var str = _this.commentList[i].commentInfoListVo[j].account;
                var len = str.length-2;
                var xing = '';
                for (var k=0;k<len;k++) {
                xing+='*';
                }
                _this.commentList[i].commentInfoListVo[j].account = str.substring(0,1)+xing+str.substring(str.length-1);
              }
            }
          }
        });
    },
    listGoodComment(productId) {
      api
        .listGoodComment({
          productId: productId
        })
        .then(res => {
          if (res.code == 200) {
            //商品详情
            let commentInfo = res.data;
            var _this = this;
            _this.commentList = commentInfo;
            //讲后台时间戳转成yyyy-MM-dd格式
            for (var i in _this.commentList) {
              var date = new Date(_this.commentList[i].time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + "-";
              var M =
                (date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1) + "-";
              var D = date.getDate() + " ";
              _this.commentList[i].time = Y + M + D;
                            
              //隐藏用户昵称
              for (var j = 0; j < _this.commentList[i].commentInfoListVo.length; j++) {
                var str = _this.commentList[i].commentInfoListVo[j].account;
                var len = str.length-2;
                var xing = '';
                for (var k=0;k<len;k++) {
                xing+='*';
                }
                _this.commentList[i].commentInfoListVo[j].account = str.substring(0,1)+xing+str.substring(str.length-1);
              }
            }
          }
        });
    },
    listMediumComment(productId) {
      api
        .listMediumComment({
          productId: productId
        })
        .then(res => {
          if (res.code == 200) {
            //商品详情
            let commentInfo = res.data;
            var _this = this;
            _this.commentList = commentInfo;
            //讲后台时间戳转成yyyy-MM-dd格式
            for (var i in _this.commentList) {
              var date = new Date(_this.commentList[i].time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + "-";
              var M =
                (date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1) + "-";
              var D = date.getDate() + " ";
              _this.commentList[i].time = Y + M + D;
                            
              //隐藏用户昵称
              for (var j = 0; j < _this.commentList[i].commentInfoListVo.length; j++) {
                var str = _this.commentList[i].commentInfoListVo[j].account;
                var len = str.length-2;
                var xing = '';
                for (var k=0;k<len;k++) {
                xing+='*';
                }
                _this.commentList[i].commentInfoListVo[j].account = str.substring(0,1)+xing+str.substring(str.length-1);
              }
            }
          }
        });
    },
    listBadComment(productId) {
      api
        .listBadComment({
          productId: productId
        })
        .then(res => {
          if (res.code == 200) {
            //商品详情
            let commentInfo = res.data;
            var _this = this;
            _this.commentList = commentInfo;
            //讲后台时间戳转成yyyy-MM-dd格式
            for (var i in _this.commentList) {
              var date = new Date(_this.commentList[i].time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + "-";
              var M =
                (date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1) + "-";
              var D = date.getDate() + " ";
              _this.commentList[i].time = Y + M + D;
                            
              //隐藏用户昵称
              for (var j = 0; j < _this.commentList[i].commentInfoListVo.length; j++) {
                var str = _this.commentList[i].commentInfoListVo[j].account;
                var len = str.length-2;
                var xing = '';
                for (var k=0;k<len;k++) {
                xing+='*';
                }
                _this.commentList[i].commentInfoListVo[j].account = str.substring(0,1)+xing+str.substring(str.length-1);
              }
            }
          }
        });
    },
    listImageComment(productId) {
      api
        .listImageComment({
          productId: productId
        })
        .then(res => {
          if (res.code == 200) {
            //商品详情
            let commentInfo = res.data;
            var _this = this;
            _this.commentList = commentInfo;
            //讲后台时间戳转成yyyy-MM-dd格式
            for (var i in _this.commentList) {
              var date = new Date(_this.commentList[i].time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + "-";
              var M =
                (date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1) + "-";
              var D = date.getDate() + " ";
              _this.commentList[i].time = Y + M + D;
                            
              //隐藏用户昵称
              for (var j = 0; j < _this.commentList[i].commentInfoListVo.length; j++) {
                var str = _this.commentList[i].commentInfoListVo[j].account;
                var len = str.length-2;
                var xing = '';
                for (var k=0;k<len;k++) {
                xing+='*';
                }
                _this.commentList[i].commentInfoListVo[j].account = str.substring(0,1)+xing+str.substring(str.length-1);
              }
            }
          }
        });
    },
    listCountComment(productId) {
      api
        .listCountComment({
          productId: productId
        })
        .then(res => {
          if (res.code == 200) {
            //商品详情
            let count = res.data;
            var _this = this;
            _this.commentCountList = count;
            for (var i in _this.commentCountList) {
              var number = parseInt(_this.commentCountList[i].count);
              //评论人数大于10为10+
               if(number >= 10){
                  number = parseInt(number / 10) *10;
                  if(number>1000) number = parseInt(number / 100) *100;
                   _this.commentCountList[i].count = number + "+";
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
    onEvaluate(name) {
      this.active = name;

      this.$router.push({
        path: "/comment",
        query: {
          productId: this.id
        }
      });

      var _this = this;
      if ("全部" == name) {
        this.listAllComment(_this.productId);
      } else if ("好评" == name) {
        this.listGoodComment(_this.productId);
      } else if ("中评" == name) {
        this.listMediumComment(_this.productId);
      } else if ("差评" == name) {
        this.listBadComment(_this.productId);
      } else if ("有图" == name) {
        this.listImageComment(_this.productId);
      }
    },
    generateClassName(index) {
      // 调用方法，动态生成index
      return `game_item-${index}`;
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
.game_item-1 {
  left: 0 !important;
}
.game_item-2 {
  left: 11px !important;
}
.game_item-4 {
  left: 33px !important;
}
.game_item-5 {
  left: 44px !important;
}
.detail_cmt .cmt_user .credit span {
  width: 10px;
  height: 10px;
  margin-right: 1px;
  position: absolute;
  top: 0;
  left: 22px;
  background-size: cover;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTOk7PfE/P+w7Peo8Pv/Cwuk7Peo7PfVDQ+k7Peo7Peo7Puo7Pes8QOo8Puo+Puk7Pd05YTYAAAAQdFJOUwDxGEVwAeW8Cs6SVqtDfkqlA0EYAAAAgklEQVQY02WQWRIEIQhD0UZBe+P+px1xsFoxn69YkgCYElECr1Pk3GARKZ4d0nQ4SAppQQmlC+0X31gpiylTxZv1gVeBa4cXMHlGDBtV1uhytvDfQAwfC3Fxbstz7s/OyDOvj/7i/MhuprcHfJ4e9rXJ1kZAdYztDo4uc7WlWLN2+gOAXgycMCRyywAAAABJRU5ErkJggg==);
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
  max-width: 100%;
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
.cmt_tag.cmt_tag_new.threeLine {
  max-height: 105px;
}

.cmt_tag.cmt_tag_new {
  position: relative;
  padding: 14px 3px 0 0;
  max-height: 63px;
  margin: 0;
}
.cmt_tag {
  overflow: hidden;
  margin: 15px 0 2px;
  max-height: 55px;
  font-size: 0;
  font-family: Helvetica;
}
.detail_cmt .cmt_tag_container::after {
  display: block;
  content: "";
  height: 15px;
  background: #f7f7f7;
  margin: 0 -10px;
}
.cmt_tag.cmt_tag_new span.selected {
  color: #fff;
  background: #e93b3d;
}

.cmt_tag.cmt_tag_new span {
  margin: 0 10px 10px 0;
  background: #fdf0f0;
}
.cmt_tag span {
  display: inline-block;
  margin: 0 5px 5px 0;
  padding: 0 10px;
  height: 25px;
  border-radius: 3px;
  line-height: 25px;
  font-size: 10px;
  font-family: -apple-system, Helvetica, sans-serif;
  color: #666;
  background: #f2f2f7;
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
.jd-header-new-title {
  margin: 0 10px 0 70px;
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
.jd-header-icon-back,
.jd-header-icon-logo {
  position: absolute;
  width: 40px;
  height: 44px;
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
.jd-header-icon-back span,
.jd-header-icon-cancel span,
.jd-header-icon-search span,
.jd-header-icon-shortcut span {
  overflow: hidden;
  text-indent: -100px;
}
.cmt_header {
  background: #fff;
  padding: 0 10px;
}
.cmt_header .cmt_cur {
  position: relative;
  margin: 0 -10px;
  padding: 0 10px;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  color: #333;
}
.cmt_header .cmt_cur .checkbox {
  position: absolute;
  left: 20px;
  top: 12px;
}
.cmt_header .cmt_cur .checkbox input {
  visibility: hidden;
}
.cmt_header .cmt_cur .checkbox .info_label {
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
}
.cmt_header .cmt_cur .checkbox .info_label:after {
  content: "";
  width: 9px;
  height: 5px;
  position: absolute;
  top: 4px;
  left: 4px;
  border: 2px solid #fcfff4;
  border-top: none;
  border-right: none;
  background: transparent;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  opacity: 0;
}
.cmt_header .cmt_cur .cmt_cur_label {
  display: block;
  padding-left: 40px;
}
.cmt_header .cmt_cur:after,
.detail_cmt .cmt_fold_btn::after,
.detail_cmt .cmt_list li:after,
.detail_cmt .cmt_tab:after,
.detail_comment .detail_comment_item::after,
.detail_extra .detail_row:after,
.detail_row_cmt:after {
  content: "";
  height: 0;
  display: block;
  border-bottom: 1px solid #ddd;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.cmt_header .cmt_cur .cmt_cur_label span {
  float: right;
  font-size: 12px;
  color: #999;
}
em,
i {
  font-style: normal;
}
.detail_cmt .cmt_sku {
  color: #999;
}
.detail_cmt .cmt_sku .reply {
  float: right;
  color: #3985ff;
  padding-left: 17px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWBAMAAAAoU0G7AAAAHlBMV…GSwgpMhkDKDSTNZGikLKwAU6wsbGgEZkCkgBJwoDkJTAEAqDoMayuyWa4AAAAASUVORK5CYII=)
    no-repeat left 3px;
  background-size: 12px;
}
.detail_cmt .cmt_att:after,
.detail_cmt .cmt_sku:after {
  clear: both;
  content: "\20";
  display: block;
}
.detail_cmt .cmt_sku .reply a {
  display: inline-block;
  color: #3985ff;
}
#evalRateP2 {
  float: right;
  font-size: 12px;
  color: #999;
}
</style>