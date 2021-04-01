<template>
  <header class="header">
    <!-- 插槽是父组件与子组件的通讯方式，子组件中的slot显示父组件传递给子组件的内容，
    左右两边不一定有元素，所以使用插槽占位 -->
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
  export default {
    // 外部组件传递给此组件的属性
    props: {
      title: String
    }
  };
</script>

<style scoped>
  .header{
    background-color: pink;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 35px;
  }
  .header_title{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    color: red;
    text-align: center;
  }
  .header_title_text{
    font-size: 20px;
    color: red;
  }
</style>