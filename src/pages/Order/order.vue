<template>
	<section class="order">
      <HeaderTop title="订单列表"></HeaderTop>
    </section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	export default {
	  name: "order",
	  components: {
	    HeaderTop
	  }
	};
</script>

<style scoped>
	.order{
		width: 100%;
	}
</style>