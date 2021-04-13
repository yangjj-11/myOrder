<template>
	<div>
	  	<HeaderTop title="我的"></HeaderTop>
	  	<section class="profile-number">
	      <!-- 利用router-link实现到Login组件的跳转 -->
	        <router-link to="/login" class="profile-link">
	          	<a href="#">11111</a>
	        </router-link>
	    </section>
	</div>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	export default {
	  name: "profile",
	  components: {
	    HeaderTop
	  }
	};
</script>

<style scoped>
	a{
		display: block;
		margin-top: 35px;
	}
</style>