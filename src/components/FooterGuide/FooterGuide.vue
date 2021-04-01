<template>
  	<div class="footer_guide">
		<!--    javascript:;表示什么也不执行-->
	    <a href="javascript:;" class="guide_item" :class="{on:'/home'===$route.path}" @click="goTo('/home')">
	    	<span class="item_icon">
	    		<i class="iconfont icon-waimai"></i>
	    	</span>
	      	<span>外卖</span>
	    </a>
	    <a href="javascript:;" class="guide_item" :class="{on:'/search'===$route.path}" @click="goTo('/search')">
	    	<span class="item_icon">
	        	<i class="iconfont icon-sousuo"></i>
	      	</span>
	      	<span>搜索</span>
	    </a>
	    <a href="javascript:;" class="guide_item" :class="{on:'/order'===$route.path}" @click="goTo('/order')">
	    	<span class="item_icon">
	        	<i class="iconfont icon-dingdan"></i>
	      	</span>
	      	<span>订单</span>
	    </a>
	    <a href="javascript:;" class="guide_item" :class="{on:'/profile'===$route.path}" @click="goTo('/profile')">
	    	<span class="item_icon">
	        	<i class="iconfont icon-wode"></i>
	      	</span>
	      	<span>我的</span>
	    </a>
  	</div>
</template>

<script>
	export default {
	  	name: "FooterGuide",
	  	methods:{
	  		goTo(path){
	  			this.$router.replace(path)
	  		}
	  	}
	};
</script>

<style scoped>
	.footer_guide{
		position: fixed;
		z-index: 100;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background-color: #fff;
		width: 100%;
		height: 50px;
		display: flex;
	}
	.guide_item{
		width: 25%;
		float: left;
		text-decoration: none;
		color: #000000;
		text-align: center;
		line-height: 50px;
	}
	.on{
		color: red;
	}
</style>