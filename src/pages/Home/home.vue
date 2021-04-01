<template>
	<section class="home">
		<!-- 顶部横栏 -->
		<HeaderTop :title="location">
			<!-- 要使用slot="left"指定插入的插槽位置 -->
			<!-- router-link表示要跳转到对应的路由界面 -->
			<router-link class="header_search" slot="left" to="/search">
				<i class="iconfont icon-sousuo"></i>
			</router-link>
			<router-link class="header_login" slot="right" to="/profile">
				登录
			</router-link>
		</HeaderTop>
		<nav class="home_nav">
		    <!-- swiper的容器div -->
		    <div class="swiper-container">
		        <!-- swiper的包裹层div -->
		        <div class="swiper-wrapper">
		          	<!-- swiper的轮播div -->
		          	<div class="swiper-slide" v-for="(pages,index) in categorysArr" :key="index">
		            	<a href="#">{{pages}}</a>
		          	</div>
		        </div>
		        <!-- swiper轮播图圆点 -->
		        <div class="swiper-pagination"></div>
		    </div>
		</nav>
		<ShopList></ShopList>
	</section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import ShopList from '../../components/ShopList/ShopList.vue'
	import Swiper from 'swiper'
	import 'swiper/swiper-bundle.css'
	// import ShopList from '../../components/ShopList/ShopList.vue'
	// 利用mapState语法糖去读取state对象
	// import {mapState} from 'vuex'
	export default {
		name: "home",
		data(){
			return{
				location:"beijing",
				baseImageUrl: "https://fuss10.elemecdn.com",
				categorysArr:["1","2","3"]
			}
		},
		// 将组件映射成标签
		components:{
			HeaderTop,
			ShopList
		},
		mounted(){
			new Swiper('.swiper-container',{
				// 表示可以循环播放轮播图
				loop: true,
				pagination:{
					el:'swiper-pagination'
				}
			})
		}
	// 	computed: {
	// 	    ...mapState(['address', 'categorys', 'userInfo']),
	// 	    /*
	// 	    根据categorys一维数组生成一个2维数组
	// 	    小数组中的元素个数最大是8
	// 	    */
	// 	    categorysArr () {
	// 	      	const {categorys} = this
	// 	      	const arr = []
	// 	      	let minArr = []
	// 	      	categorys.forEach(data => {
	// 		        // 如果当前小数组(pages)已经满了, 创建一个新的
	// 		        if (minArr.length === 8) {
	// 		          	minArr = []
	// 		        }
	// 		        // 如果minArr是空的, 将小数组(pages)保存到大数组(categorysArr)中
	// 		        if (minArr.length === 0) {
	// 		          	arr.push(minArr)
	// 		        }
	// 		        // 将当前分类信息保存到小数组(pages)中
	// 		        minArr.push(data)
	// 	    	})
	// 	      	return arr
	// 	    }
	// 	},
	// 	// 注意要在页面加载完成之后（mounted）再进行swiper的初始化
	// 	mounted () {
	// 	    // 忘记方法名时查看Action.js
	// 	    this.$store.dispatch('getCategorys')
	// 	    this.$store.dispatch('getShops')
	// 	}
	};
</script>

<style scoped>
	.home{
		width: 100%;
	}
	.icon-sousuo{
		float: left;
		text-decoration: none;
		font-size: 20px;
		fill: red;
	}
	.header_search{
	    position: absolute;
	    left: 15px;
	    top: 50%;
	    transform: translateY(-50%);
	    width: 10%;
	    height: 50%;
	}
	.header_login{
		text-decoration: none;
		float: right;
		margin: 10px 10px;
		color: #000000;
	}
	.home_nav{
		margin-top: 35px;
      	height: 200px;
      	background: #fff;
	}
	.swiper-container{
		width: 100%;
		height: 100%;
	}
	.swiper-container .swiper-wrapper{
		width: 100%;
		height: 100%;
	}
	.swiper-container .swiper-wrapper .swiper-slide{
		display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
	}
	.swiper-container .swiper-wrapper .swiper-slide .link_to_food{
		width: 25%;
	}
	.swiper-container .swiper-wrapper .swiper-slide .link_to_food .food_container{
		display: block;
        width: 100%;
        text-align: center;
        padding-bottom: 10px;
        font-size: 0;
	}
	.swiper-container .swiper-wrapper .swiper-slide .link_to_food .food_container img{
		display: inline-block;
        width: 50px;
        height: 50px;
	}
	.swiper-container .swiper-wrapper .swiper-slide .link_to_food span{
		display: block;
        width: 100%;
        text-align: center;
        font-size: 13px;
        color: #666;
	}
</style>