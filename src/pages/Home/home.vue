<template>
	<section class="home">
		<!-- 顶部横栏 -->
		<HeaderTop :title="address.name">
			<!-- 要使用slot="left"指定插入的插槽位置 -->
			<!-- router-link表示要跳转到对应的路由界面 -->
			<router-link class="header_search" slot="left" to="/search">
				<i class="iconfont icon-sousuo"></i>
			</router-link>
			<router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo': '/login'">
				<span class="header_login_text" v-if="!userInfo._id">
        		  登录 | 注册
        		</span>
        		<span class="header_login_text" v-else>
        		  <i class="iconfont icon-yonghuming"></i>
        		</span>
			</router-link>
		</HeaderTop>
		<nav class="home_nav">
		    <!-- swiper的容器div -->
		    <div class="swiper-container" v-if="categorys.length">
		        <!-- swiper的包裹层div -->
		        <div class="swiper-wrapper">
		          	<!-- swiper的轮播div -->
		          	<div class="swiper-slide" v-for="(pages,index) in categorysArr" :key="index"> 
		            	<!-- <div v-for="(categorie,index) in categorys" :key="index" class="top_categorie">{{categorie}}</div> -->
		            	<a href="javascript:" class="link_to_food" v-for="(data,index) in pages" :key="index">
            			  <div class="food_container">
            			    <img :src="baseImageUrl+data.image_url">
            			  </div>
            			  <span>{{data}}</span>
            			</a>
		          	</div>
		          	<!-- <div class="swiper-slide">
		            	<img src="">
		          	</div>
		          	<div class="swiper-slide">
		            	<img src="">
		          	</div> -->
		        </div>
		        <!-- swiper轮播图圆点 -->
		        <div class="swiper-pagination"></div>
		    </div>
		    <img src="./msite_back.svg" alt="back" v-else>
		</nav>
		<div class="msite_shop_list">
      		<div class="shop_header">
      		  <i class="iconfont icon-xuanxiang"></i>
      		  <span class="shop_header_title">附近商家</span>
      		</div>
      		<ShopList></ShopList>
    	</div>
	</section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import ShopList from '../../components/ShopList/ShopList.vue'
	import Swiper from 'swiper'
	// // 同时引入swiper的css文件
	import 'swiper/swiper-bundle.css'
	// 利用mapState语法糖去读取state对象
	import {mapState} from 'vuex'
	export default {
		name: "home",
		data(){
			return{
				// location:"beijing",
				baseImageUrl: "https://fuss10.elemecdn.com",
				// categorysArr:["1","2"]
				// categorys:["美食外卖", "甜品饮品", "商超便利", "水果", "送药上门", "星选好店", "下午茶", "签到", "跑腿代购", "买菜"]
			}
		},
		// 将组件映射成标签
		components:{
			HeaderTop,
			ShopList
		},
		mounted(){
			// 注意要在页面加载完成之后（mounted）再进行swiper的初始化
			// 忘记方法名时查看Action.js
		    this.$store.dispatch('getCategorys')
		    this.$store.dispatch('getShops')
			new Swiper('.swiper-container',{
				// 表示可以循环播放轮播图
				loop: true,
				// 轮播图的方向，也可以是vertical方向
				direction:'horizontal',
				// 自动播放时间
				autoplay:true,
				// 播放的速度
				// speed:2000,
				pagination:{
					el:'swiper-pagination'
				},
				// 这样，即使我们滑动之后， 定时器也不会被清除
				autoplayDisableOnInteraction : false,
			})
		},
		computed: {
			// mapState本是一个函数，在里面写一个数组，记得加...
		    ...mapState(['address', 'categorys', 'userInfo']),
		    /*
		    根据categorys一维数组生成一个2维数组
		    小数组中的元素个数最大是8
		    */
		    categorysArr () {
		      	const {categorys} = this
		      	const arr = []
		      	let minArr = []
		      	categorys.forEach(data => {
			        // 如果当前小数组(pages)已经满了, 创建一个新的
			        if (minArr.length === 8) {
			          	minArr = []
			        }
			        // 如果minArr是空的, 将小数组(pages)保存到大数组(categorysArr)中
			        if (minArr.length === 0) {
			          	arr.push(minArr)
			        }
			        // 将当前分类信息保存到小数组(pages)中
			        minArr.push(data)
		    	})
		      	return arr
		    }
		},
		watch: {
			// categorys数组中有数据了 但界面还没有异步更新
			categorys (){
				// 在修改数据之后立即使用它，然后等待 DOM 更新。
      			this.$nextTick(() => {
      			  // 一旦完成界面更新, 立即执行回调
      			  new Swiper('.swiper-container', {
      			    autoplay: true,
      			    pagination: {
      			      el: '.swiper-pagination',
      			      clickable: true
      			    }
      			  })
      			})
			}
		}
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
		width: 100%;
		height: 100%;
	}
	/*.swiper-container .swiper-wrapper .swiper-slide img{
		width: 100%;
		height: 100%;
	}*/
	.link_to_food{
		text-decoration: none;
	}
	.link_to_food .food_container{
		display: block;
        width: 100%;
        text-align: center;
        padding-bottom: 10px;
        font-size: 0;
	}
	.link_to_food .food_container img{
		display: inline-block;
        width: 50px;
        height: 50px;
	}
	.link_to_food span{
		display: block;
        width: 100%;
        text-align: center;
        font-size: 13px;
        color: #666;
	}
	.msite_shop_list{
		background: #fff;
	}
	.msite_shop_list .shop_header{
		padding: 10px 10px 0;
	}
	.msite_shop_list .shop_header .shop_header_title{
		color: #999;
        font-size: 14px;
        line-height: 20px;
	}
</style>