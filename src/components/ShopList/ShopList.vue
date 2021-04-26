<template>
  <div class="shop_container">
    <ul class="shop_list">
      <li class="shop_li border-1px" v-for="(shop,index) in info" :key="index" @click="$router.push('/shop')">
        <a>
          <div class="shop_left">
            <img class="shop_img" :src="info.avatar">
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{info.name}}</h4>
              <ul class="shop_detail_ul">
                <li class="supports">
                  {{info.category}}
                </li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <div class="rating_section">
                  {{info.serviceScore}}
                </div>
                <div class="order_section">
                  月售{{info.sellCount}}单
                </div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">{{info.description}}</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥{{info.minPrice}}起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥{{info.deliveryPrice}}</span>
              </p>
            </section>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      baseImgUrl: ''
    }
  },
  computed: {
    ...mapState(['info'])
  },
  mounted(){
    this.$store.dispatch('getShopInfo')
  }
};
</script>
<style scoped>
  .shop_container{
    width: 100%;
    float: left;
    margin-bottom: 50px;
  }
  .shop_list{
    width: 100%;
  }
  .shop_li{
    width: 100%;
  }
  .shop_container .shop_li a{
    float: left;
    padding: 15px 8px;
  }
  .shop_li .shop_left{
    float: left;
    width: 23%;
    height: 75px;
  }
  .shop_li .shop_left .shop_img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .shop_li .shop_right{
    float: right;
    width: 77%;
  }
  .shop_right .shop_detail_header{
    width: 100%;
  }
  .shop_detail_header .shop_title{
    float: left;
    width: 200px;
    color: #333;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
  }
  .shop_detail_header .shop_title::before{
    content: '品牌';
    display: inline-block;
    font-size: 11px;
    line-height: 11px;
    color: #333;
    background-color: #ffd930;
    padding: 2px 2px;
    border-radius: 2px;
    margin-right: 5px;
  }
  .shop_detail_header .shop_detail_ul{
    float: left;
    margin-top: 3px;
  }
  .shop_detail_header .shop_detail_ul .supports{
    float: left;
    font-size: 10px;
    color: #999;
    border: 1px solid #f1f1f1;
    padding: 0 2px;
    border-radius: 2px;
  }
  .shop_right .shop_rating_order{
    width: 100%;
    float: left;
    margin-top: 18px;
    margin-bottom: 8px;
  }
  .shop_right .shop_rating_order_left{
    float: left;
    color: #ff9a0d;
  }
  .shop_right .shop_rating_order_left .rating_section{
    float: left;
    font-size: 10px;
    color: #ff6000;
    margin-left: 4px;
  }
  .shop_right .shop_rating_order_left .order_section{
    float: left;
    font-size: 10px;
    color: #666;
    transform: scale(.8);
  }
  .shop_right .shop_rating_order_right{
    padding-right: 5px;
    float: right;
    font-size: 0;
  }
  .shop_right .shop_rating_order_right .delivery_style{
    transform-origin: 35px 0;
    transform: scale(.7);
    display: inline-block;
    font-size: 12px;
    padding: 1px;
    border-radius: 2px;
  }
  .shop_right .shop_rating_order_right .delivery_left{
    color: #fff;
    margin-right: -10px;
    background-color: #02a774;
    border: 1px solid #02a774;
  }
  .shop_right .shop_rating_order_right .delivery_right{
    color: #02a774;
    border: 1px solid #02a774;
  }
  .shop_distance{
    width: 100%;
    font-size: 12px;
  }
  .shop_distance .shop_delivery_msg{
    float: left;
    transform-origin: 0;
    transform: scale(.9);
    color: #666;
  }
  .shop_distance .segmentation{
    color: #ccc;
  }
</style>