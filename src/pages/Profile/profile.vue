<template>
	<section class="profile">
	  	<HeaderTop title="我的"></HeaderTop>
	  	<section class="profile-number">
      		<!-- 利用router-link实现到Login组件的跳转 -->
        	<router-link :to="userInfo._id ? '/userinfo': '/login'" class="profile-link">
        	  	<div class="profile_image">
        	    	<i class="iconfont icon-yonghuming"></i>
        	  	</div>
        	  	<div class="user-info">
        	    	<p class="user-info-top" v-if="!userInfo.phone" >{{userInfo.name || '登录/注册'}}</p>
        	    	<p>
	        	      	<span class="user-icon">
	        	        	<i class="iconfont icon-mobile"></i>
	        	      	</span>
	        	      	<span class="icon-mobile-number">{{userInfo.phone || '暂无绑定手机号'}}</span>
        	    	</p>
        	  	</div>
        	  	<span class="arrow">
        	    	<i class="iconfont icon-previewright"></i>
        	  	</span>
        	</router-link>
      	</section>
      	<section class="profile_info_data border-1px">
	        <ul class="info_data_list">
	          <a href="javascript:" class="info_data_link">
	            <span class="info_data_top"><span>0.00</span>元</span>
	            <span class="info_data_bottom">我的余额</span>
	          </a>
	          <a href="javascript:" class="info_data_link">
	            <span class="info_data_top"><span>0</span>个</span>
	            <span class="info_data_bottom">我的优惠</span>
	          </a>
	          <a href="javascript:" class="info_data_link">
	            <span class="info_data_top"><span>0</span>分</span>
	            <span class="info_data_bottom">我的积分</span>
	          </a>
	        </ul>
      	</section>
	      <section class="profile_my_order border-1px">
	        <!-- 我的订单 -->
	        <a href='javascript:' class="my_order">
	          <span>
	            <i class="iconfont icon-dingdan"></i>
	          </span>
	          <div class="my_order_div">
	            <span>我的订单</span>
	            <span class="my_order_icon">
	              <i class="iconfont icon-previewright"></i>
	            </span>
	          </div>
	        </a>
	        <!-- 积分商城 -->
	        <a href='javascript:' class="my_order">
	          <span>
	            <i class="iconfont icon-gifts"></i>
	          </span>
	          <div class="my_order_div">
	            <span>积分商城</span>
	            <span class="my_order_icon">
	              <i class="iconfont icon-previewright"></i>
	            </span>
	          </div>
	        </a>
	        <!-- Mint外卖会员卡 -->
	        <a href="javascript:" class="my_order">
	          <span>
	            <i class="iconfont icon-VIP"></i>
	          </span>
	          <div class="my_order_div">
	            <span>Mint外卖会员卡</span>
	            <span class="my_order_icon">
	              <i class="iconfont icon-previewright"></i>
	            </span>
	          </div>
	        </a>
	      </section>
	      <section class="profile_my_order border-1px">
	        <!-- 服务中心 -->
	        <a href="javascript:" class="my_order">
	          <span>
	            <i class="iconfont icon-tubiao-"></i>
	          </span>
	          <div class="my_order_div">
	            <span>服务中心</span>
	            <span class="my_order_icon">
	              <i class="iconfont icon-previewright"></i>
	            </span>
	          </div>
	        </a>
	      </section>
	      <section class="profile_my_order border-1px">
	        <mt-button type="danger" style="width: 100%" v-if="userInfo._id" @click="logout">退出登录</mt-button>
	      </section>
	</section>
</template>

<script>
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import {mapState} from 'vuex'
	// import { MessageBox, Toast } from 'mint-ui'
	export default {
	  	name: "profile",
	  	computed: {
  		  	...mapState(['userInfo'])
  		},
  		// methods: {
		  //   logout () {
		  //     MessageBox.confirm('确认退出吗?').then(
		  //       action => {
		  //         // 请求退出
		  //         this.$store.dispatch('logout')
		  //         Toast('退出成功')
		  //       },
		  //       action => {
		  //         console.log('取消登录')
		  //       }
		  //     )
		  //   }
  		// },
	  	components: {
	    	HeaderTop
	  	}
	};
</script>

<style scoped>
	.profile {
	  width: 100%;
	  overflow: hidden;
	}
	.profile .profile-number {
	  margin-top: 35.5px;
	}
	.profile .profile-number .profile-link {
	  /*position: relative;*/
	  display: block;
	  background: #02a774;
	  padding: 20px 10px;
	  height: 60px;
	}
	.profile .profile-number .profile-link .profile_image {
	  float: left;
	  width: 62px;
	  height: 62px;
	  border-radius: 50%;
	  overflow: hidden;
	  vertical-align: top;
	}
	.profile .profile-number .profile-link .profile_image .icon-yonghuming {
	  background: #e4e4e4;
	  font-size: 62px;
	}
	.profile .profile-number .profile-link .user-info {
	  float: left;
	  margin-top: 8px;
	  margin-left: 15px;
	}
	.profile .profile-number .profile-link .user-info p {
	  font-weight: 700;
	  font-size: 18px;
	  color: #fff;
	}
	.profile .profile-number .profile-link .user-info p.user-info-top {
	  padding-bottom: 8px;
	}
	.profile .profile-number .profile-link .user-info p .user-icon {
	  display: inline-block;
	  margin-left: 2px;
	  margin-right: 5px;
	  width: 20px;
	  height: 20px;
	}
	.profile .profile-number .profile-link .user-info p .user-icon .icon-mobile {
	  font-size: 20px;
	  vertical-align: text-top;
	}
	.profile .profile-number .profile-link .arrow {
	  width: 12px;
	  height: 12px;
	  position: absolute;
	  right: 30px;
	  top: 70px;
	}
	.profile .profile-number .profile-link .arrow .icon-previewright {
	  color: #ffffff;
	  font-size: 30px;
	}
	.profile .profile_info_data {
	  width: 100%;
	  background: #fff;
	  overflow: hidden;
	}
	.profile .profile_info_data .info_data_list .info_data_link {
	  float: left;
	  width: 33%;
	  text-align: center;
	  border-right: 1px solid #f1f1f1;
	  text-decoration: none;
	}
	.info_data_link .info_data_top {
	  display: block;
	  font-size: 14px;
	  color: #333;
	  padding: 15px 5px;
	}
	.info_data_link .info_data_top span {
	  display: inline-block;
	  font-size: 30px;
	  color: #f90;
	  font-weight: 700;
	  line-height: 30px;
	}
	.info_data_link .info_data_bottom {
	  display: inline-block;
	  font-size: 14px;
	  color: #666;
	  font-weight: 400;
	  padding-bottom: 10px;
	}
	.info_data_link:nth-of-type(2) .info_data_top 	span {
	  color: #ff5f3e;
	}
	.info_data_link:nth-of-type(3) {
	  border: 0;
	}
	.info_data_link:nth-of-type(3) .info_data_top 	span {
	  color: #6ac20b;
	}
	.profile .profile_my_order {
	  margin-top: 10px;
	  background: #fff;
	}
	.profile .profile_my_order .my_order {
	  display: flex;
	  align-items: center;
	  padding-left: 15px;
	  text-decoration: none;
	}
	.profile .profile_my_order .my_order >span {
	  display: flex;
	  align-items: center;
	  width: 20px;
	  height: 20px;
	}
	.profile .profile_my_order .my_order >span >.iconfont {
	  margin-left: -10px;
	  font-size: 30px;
	}
	.profile .profile_my_order .my_order >span .icon-dingdan {
	  color: #02a774;
	}
	.profile .profile_my_order .my_order >span .icon-gifts {
	  color: #ff5f3e;
	}
	.profile .profile_my_order .my_order >span .icon-VIP {
	  color: #f90;
	}
	.profile .profile_my_order .my_order >span .icon-tubiao- {
	  color: #02a774;
	}
	.profile .profile_my_order .my_order .my_order_div {
	  width: 100%;
	  border-bottom: 1px solid #f1f1f1;
	  padding: 18px 10px 18px 0;
	  font-size: 16px;
	  color: #333;
	  display: flex;
	  justify-content: space-between;
	}
	.profile .profile_my_order .my_order .my_order_div span {
	  display: block;
	}
	.my_order_icon {
	  width: 10px;
	  height: 10px;
	}
	.my_order_icon .icon-previewright {
	  color: #bbb;
	  font-size: 10px;
	}
</style>