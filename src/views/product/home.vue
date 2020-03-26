
<template>
  <div class="home">
    <div class="top">
      <div class="splider">
        <van-swipe :autoplay="3000" indicator-color="#199BFF">
          <van-swipe-item>
            <van-image fit="contain" :src="`${publicPath}img/shouye2.png`" />
          </van-swipe-item>
          <van-swipe-item>
            <van-image fit="contain" :src="`${publicPath}img/shouye4.png`" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="cate_goods_images">
        <ul>
          <a @click="onDetailByType(1,1)">
            <van-image
              class="good_image"
              fit="contain"
              :src="`${publicPath}img/20190905180731_69473.png`"
            ></van-image>
          </a>
          <a @click="onDetailByType(2,1)">
            <van-image
              class="good_image"
              fit="contain"
              :src="`${publicPath}img/20190905180800_50139.png`"
            ></van-image>
          </a>
          <a @click="onDetailByType(3,1)">
            <van-image
              class="good_image"
              fit="contain"
              :src="`${publicPath}img/20190905180819_62319.png`"
            ></van-image>
          </a>
          <a @click="onDetailByType(4,1)">
            <van-image
              class="good_image"
              fit="contain"
              :src="`${publicPath}img/20190905180853_79703.png`"
            ></van-image>
          </a>
          <a @click="onDetailByType(5,1)">
            <van-image
              class="good_image"
              fit="contain"
              :src="`${publicPath}img/20190905180918_83148.png`"
            ></van-image>
          </a>
          <a @click="onDetailByType(6,1)">
            <van-image
              class="good_image"
              fit="contain"
              :src="`${publicPath}img/20190905181141_86536.png`"
            ></van-image>
          </a>
          <a @click="onDetailByType(7,1)">
            <van-image
              class="good_image"
              fit="contain"
              :src="`${publicPath}img/20190905181154_55504.png`"
            ></van-image>
          </a>
          <a @click="onDetailByType(8,0)">
            <van-image
              class="good_image"
              fit="contain"
              :src="`${publicPath}img/20190905181210_52080.png`"
            ></van-image>
          </a>
        </ul>
      </div>
      <div class="recommand">人气推荐</div>
      <div class="tab">
        <a
          @click="cur=0,masterCategory=1,pageIndex=1,list=null,getList()"
          class="tilte_tab_a"
          :class="{selected:cur==0}"
        >
          <span>清洗单品</span>
        </a>
        <a
          @click="cur=1,masterCategory=0,pageIndex=1,list=null,getList()"
          class="tilte_tab_b"
          :class="{selected:cur==1}"
        >
          <span>优惠套餐</span>
        </a>
      </div>
    </div>

    <div>
      <waterfall
        v-if="list"
        :col="col"
        :width="itemWidth"
        :gutterWidth="gutterWidth"
        :data="list"
        @loadmore="onLoad"
      >
        <template>
          <div class="show" v-if="cur==0">
            <div
              class="goods-div topnav-show"
              v-for="(goods, index) in list"
              :key="goods.id"
              @click="onDetail(goods.id)"
            >
              <div class="goods-img">
                <van-image fit="contain" :src="goods.smallPic"></van-image>
              </div>
              <div class="good-label">
                <div class="goods-title">{{goods.name}}</div>
                <div class="goods-text">
                  <div class="goods-price">
                    <span>￥</span>
                    <span>{{goods.priceRange|formatNum}}</span>
                  </div>
                  <div class="goods-sales">
                    <span>销量：</span>
                    <span>{{goods.salesVolume|formatNum}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="show" v-if="cur==1">
            <div
              class="goods-div topnav-show"
              v-for="(goods, index) in list"
              :key="goods.id"
              @click="onDetail(goods.id)"
            >
              <div class="goods-img">
                <van-image fit="contain" :src="goods.smallPic"></van-image>
              </div>
              <div class="good-label">
                <div class="goods-title">{{goods.name}}</div>
                <div class="goods-text">
                  <div class="goods-price">
                    <span>￥</span>
                    <span>{{goods.priceRange|formatNum}}</span>
                  </div>
                  <div class="goods-sales">
                    <span>销量：</span>
                    <span>{{goods.salesVolume|formatNum}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div style=";position: absolute;bottom: 2rem;width: 100%;"> 
          <a style="text-align: center; display: inherit;color: #999999" rel="nofollow" href="http://www.beian.miit.gov.cn" target="_blank" >粤ICP备20012989号</a>
         </div>
        </template>    
      </waterfall>
    </div>
  </div>
</template>

<script>
import api from "../../api";
import constConfig from "../../api/config.js";
import commonUtil from "@/assets/js/commonUtil.js";

export default {
  props: {
    initialSpeed: {
      type: Number,
      default: 30
    },
    initialInterval: {
      type: Number,
      default: 3
    }
  },
  name: "home",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      loading: false,
      finished: false,
      totalPage: 0, // 所有页数
      pageIndex: 1, // 第几页
      pageSize: 10,
      list: "",
      col: 2,
      cur: 0,
      masterCategory: 1
    };
  },
  created() {
    this.$store.commit("onPageList", "");
    if (this.$store.state.productId) {
      this.$router.push({
        path: "/productDetail",
        query: {
          id: this.$store.state.productId
        }
      });
    }
  },
  activated() {
    this.onLoad();
  },
  computed: {
    itemWidth() {
      var width = document.body.clientWidth;
      return width;
    },
    gutterWidth() {
      return 10;
    }
  },
  methods: {
    onLoad() {
      // 分页加载
      if (this.finished) {
        return;
      }
      if (this.pageIndex === 1) {
        this.getList();
      } else if (this.totalPage > (this.pageIndex - 1) * this.pageSize) {
        this.getList();
      }
    },
    getList() {
      let _this = this;
      _this.loading = true;
      api
        .listProduct({
          page: this.pageIndex,
          limit: this.pageSize,
          masterCategory: this.masterCategory
        })
        .then(res => {
          if (res.code === 200) {
            if (res.data && res.data.list.length > 0) {
              let resList = res.data.list;
              for (let i = 0; i < resList.length; i++) {
                let good = resList[i];
                let smallPic = good.smallPic;
                if (smallPic) {
                  //重新复制产品图片,后台存储的是用逗号隔开的路劲,这里只取第一个
                  good.smallPic = smallPic.split(",")[0];
                }
              }
              if (_this.list) {
                var list = _this.list.concat(res.data.list);
                _this.list = list;
              } else {
                _this.list = res.data.list;
              }
              _this.totalPage = res.data.total;
              // 加载状态结束
              _this.loading = false;
              if (_this.totalPage <= _this.pageIndex * _this.pageSize) {
                // 数据全部加载完成
                _this.finished = true;
              }
              _this.pageIndex += 1;
            } else {
              _this.loading = false;
              _this.finished = true;
            }
          } else {
            _this.$toast(res.msg);
          }
        });
    },
    onDetail(id) {
      this.$router.push({
        path: "/productDetail",
        query: {
          id: id
        }
      });
    },
    onDetailByType(productType, masterCategory) {
      this.$router.push({
        path: "/typeproductDetail",
        query: {
          productType: productType,
          masterCategory: masterCategory
        }
      });
    }
  }
};
</script>
<style scoped>
.home > div {
  padding-bottom: 0.2rem;
  padding-top: 0.3rem;
}
/* productlist start */
.home >>> .vue-waterfall-column {
  margin-left: 10px;
}
.show {
  width: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  margin-bottom: 3rem; 
  flex-wrap: wrap;
}
.goods-div {
  background: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 10px;
}
.topnav-show {
  width: 50%;
}
.goods-img {
  background: #f8f8f8;
  width: 100%;
}
.goods-img .van-image {
  width: 100%;
}
.goods-img >>> .van-image__error {
  height: 10.69rem;
  position: unset;
}
.good-label {
  padding: 0 0.7rem;
}
.goods-title {
  font-size: 0.88rem;
  font-weight: 400;
  line-height: 1.25rem;
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.goods-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.7rem 0;
}
.goods-price {
  width: 50%;
  font-size: 0.88rem;
  font-weight: 400;
  color: #ed1f1f;
}
.goods-price > span:nth-of-type(2) {
  font-size: 1rem;
}
.goods-sales {
  width: 50%;
  font-size: 0.75rem;
  font-weight: 500;
  color: #999999;
  text-align: right;
}

.recommand {
  font-size: 1.4rem;
  font-weight: 650;
  font-style: inherit;
  background: #fff;
  margin: 0.73rem 0 0.78rem 1rem;
}
.cate_goods_images {
  display: -webkit-flex;
  display: flex;
}
.good_image {
  width: 25%;
  height: 20vw;
}
.tab {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  margin-bottom: 0.4rem;
}
.tilte_tab_a {
  color: #666;
  font-weight: 600;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 1.2rem;
  text-align: center;
}
.tilte_tab_b {
  color: #666;
  font-weight: 600;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 1.2rem;
  text-align: center;
}
a.selected, .tilte_tab_a:hover {
  color: #ee3142;
  font-weight: 650;
  border-bottom: 2px solid #ee3142;
  padding-bottom: 0.25rem;
}
.tilte_tab_b:hover {
  color: #ee3142;
  font-weight: 650;
  border-bottom: 2px solid #ee3142;
  padding-bottom: 0.25rem;
}
.top {
  background: #fff;
}
.splider {
  padding: 0.6rem 0.8rem 0.8rem 0.8rem;
}
/* productlist end */
</style>

