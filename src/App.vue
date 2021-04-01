<template>
  <div id="app">
    <!-- 路由组件的视图位置 -->
    <router-view/>
    <!-- 底部组件 -->
    <FooterGuide></FooterGuide>
  </div>
</template>
<script>
  import FooterGuide from "./components/FooterGuide/FooterGuide.vue"
  export default {
    components: {
      FooterGuide
    }
  };
</script>
<style lang="css" rel="stylesheet/css">
  #app{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    position: relative;
  }
</style>