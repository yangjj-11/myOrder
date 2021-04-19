<template>
  <div class="shop_container">
    <ul class="shop_list">
      <li class="shop_li border-1px">
        <a>
          <div class="shop_left">
            <div>111</div>
          </div>
          <div class="shop_right">
            <div>222</div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  
</script>
<style scoped>
  .shop_list, .shop_li{
    width: 100%;
  }
  .shop_li a{
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 75px;
  }
  .shop_left{
    float: left;
    box-sizing: border-box;
    width: 23%;
    height: 75px;
  }
  .shop_right{
    float: right;
    width: 77%;
    height: 75px;
  }
</style>