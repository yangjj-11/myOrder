<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <!-- 使用replace的方式进行路由切换 （路由懒加载） -->
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <!-- 缓存路由组件对象 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
export default {
  mounted () {
    this.$store.dispatch('getShopInfo')
  },
  components: {
    ShopHeader
  }
};
</script>
<style scoped>
  .tab {
  height: 40px;
  line-height: 40px;
  background: #fff;
}
.tab .tab-item {
  float: left;
  width: 33.33333%;
  text-align: center;
  font-size: 14px;
  color: #4d555d;
}
.tab .tab-item a {
  display: block;
  position: relative;
  text-decoration: none;
  color: black;
}
.tab .tab-item a.router-link-active {
  color: #02a774;
}
.tab .tab-item a.router-link-active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 1px;
  width: 35px;
  height: 2px;
  transform: translateX(-50%);
  background: #02a774;
}
</style>