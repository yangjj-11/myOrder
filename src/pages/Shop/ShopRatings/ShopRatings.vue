<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <!-- <Star :score="info.serviceScore" :size="36" /> -->
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <!-- <Star :score="info.foodScore" :size="36" /> -->
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" :class="{active: selectType===2}" @click="setSelectType(2)">
            全部<span class="count">{{ratings.length}}</span>
          </span>
          <span class="block positive" :class="{active: selectType===0}" @click="setSelectType(0)">
            满意<span class="count">{{positiveSize}}</span>
          </span>
          <span class="block negative" :class="{active: selectType===1}" @click="setSelectType(1)">
            不满意<span class="count">{{ratings.length-positiveSize}}</span>
          </span>
        </div>
        <!-- <div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
          <span class="iconfont icon-checkcircle"></span>
          <span class="text">只看有内容的评价</span>
        </div> -->
      </div>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating, index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType===0 ? 'icon-thumb_up' : 'icon-thumb_down'"></span>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState, mapGetters} from 'vuex'
// import Star from '../../../components/Star/Star.vue'
export default {
  name: "ShopRatings",
  data () {
    return {
      onlyShowText: true, // 是否只显示有文本的评价信息
      selectType: 2 // 选择的评价类型: 0满意, 1不满意, 2全部
    }
  },
  mounted () {
    this.$store.dispatch('getShopRatings', () => {
      this.$nextTick(() => {
        // 传入DOM元素
        new BScroll(this.$refs.ratings, {
          click: true
        })
      })
    })
  },
  // filters: {
  //   dateFormat: function (input) {
  //     var d = new Date(input)
  //     var year = d.getFullYear()
  //     var month = d.getMonth() + 1
  //     var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
  //     var hour = d.getHours()
  //     var minutes = d.getMinutes()
  //     var seconds = d.getSeconds()
  //     return `
  //     ${year}-${month}-${day} ${hour}:${minutes}:${seconds}
  //     `
  //   }
  // },
  // 在computed里获取info和ratings的State数据以及返回好评数量的Getters
  computed: {
    ...mapState(['info', 'ratings']),
    ...mapGetters(['positiveSize']),
    // 为要渲染的评价列表设置各种必要条件 使其按照用户选择进行渲染
    filterRatings () {
      // 得到相关的数据
      const {ratings, onlyShowText, selectType} = this
      // 产生一个过滤新数组
      return ratings.filter(rating => {
        const {rateType, text} = rating
        /*
          条件1:
              selectType: 0/1/2
              rateType: 0/1
              全部 || 满意、不满意中的一种
              selectType===2 || selectType===rateType
          条件2
              onlyShowText: true/false
              text: 有值/没值
              符合条件一的全部评价 || 符合条件一的有文字的评价
              !onlyShowText || text.length>0
          */
        // 返回一个布尔值
        return (selectType === 2 || selectType === rateType) && (!onlyShowText || text.length > 0)
      })
    }
  },
  methods: {
    setSelectType (selectType) {
      this.selectType = selectType
    },
    toggleOnlyShowText () {
      this.onlyShowText = !this.onlyShowText
    }
  },
  // components: {
  //   Star
  // }
};
</script>
<style scoped>
  .ratings {
  position: absolute;
  /*top: 195px;*/
  /*bottom: 0;*/
  /*left: 0;*/
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.ratings .overview {
  display: flex;
  padding: 18px 0;
}
.ratings .overview .overview-left {
  flex: 0 0 137px;
  padding: 6px 0;
  width: 137px;
  border-right: 1px solid rgba(7,17,27,0.1);
  text-align: center;
}
@media only screen and (max-width: 320px) {
  .ratings .overview .overview-left {
    flex: 0 0 120px;
    width: 120px;
  }
}
.ratings .overview .overview-left .score {
  margin-bottom: 6px;
  line-height: 28px;
  font-size: 24px;
  color: #f90;
}
.ratings .overview .overview-left .title {
  margin-bottom: 8px;
  line-height: 12px;
  font-size: 12px;
  color: #07111b;
}
.ratings .overview .overview-left .rank {
  line-height: 10px;
  font-size: 10px;
  color: #93999f;
}
.ratings .overview .overview-right {
  flex: 1;
  padding: 6px 0 6px 24px;
}
@media only screen and (max-width: 320px) {
  .ratings .overview .overview-right {
    padding-left: 6px;
  }
}
.ratings .overview .overview-right .score-wrapper {
  margin-bottom: 8px;
  font-size: 0;
}
.ratings .overview .overview-right .score-wrapper .title {
  display: inline-block;
  line-height: 18px;
  vertical-align: top;
  font-size: 12px;
  color: #07111b;
}
.ratings .overview .overview-right .score-wrapper .star {
  display: inline-block;
  margin: 0 12px;
  vertical-align: top;
}
.ratings .overview .overview-right .score-wrapper .score {
  display: inline-block;
  line-height: 18px;
  vertical-align: top;
  font-size: 12px;
  color: #f90;
}
.ratings .overview .overview-right .delivery-wrapper {
  font-size: 0;
}
.ratings .overview .overview-right .delivery-wrapper .title {
  line-height: 18px;
  font-size: 12px;
  color: #07111b;
}
.ratings .overview .overview-right .delivery-wrapper .delivery {
  margin-left: 12px;
  font-size: 12px;
  color: #93999f;
}
.ratings .split {
  width: 100%;
  height: 16px;
  border-top: 1px solid rgba(7,17,27,0.1);
  border-bottom: 1px solid rgba(7,17,27,0.1);
  background: #f3f5f7;
}
.ratings .ratingselect .rating-type {
  padding: 18px 0;
  margin: 0 18px;
}
.ratings .ratingselect .rating-type .block {
  display: inline-block;
  padding: 8px 12px;
  margin-right: 8px;
  line-height: 16px;
  border-radius: 1px;
  font-size: 12px;
  color: #4d555d;
  background: rgba(77,85,93,0.2);
}
.ratings .ratingselect .rating-type .block.active {
  background: green;
  color: #fff;
}
.ratings .ratingselect .rating-type .block .count {
  margin-left: 2px;
  font-size: 8px;
}
.ratings .ratingselect .switch {
  padding: 12px 18px;
  line-height: 24px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  color: #93999f;
  font-size: 0;
}
.ratings .ratingselect .switch.on .icon-checkcircle {
  color: green;
}
.ratings .ratingselect .switch .icon-checkcircle {
  display: inline-block;
  vertical-align: top;
  margin-right: 4px;
  font-size: 24px;
}
.ratings .ratingselect .switch .text {
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
}
.ratings .rating-wrapper {
  padding: 0 18px;
}
.ratings .rating-wrapper .rating-item {
  display: flex;
  padding: 18px 0;
}
.ratings .rating-wrapper .rating-item .avatar {
  flex: 0 0 28px;
  width: 28px;
  margin-right: 12px;
}
.ratings .rating-wrapper .rating-item .avatar img {
  border-radius: 50%;
}
.ratings .rating-wrapper .rating-item .content {
  position: relative;
  flex: 1;
}
.ratings .rating-wrapper .rating-item .content .name {
  margin-bottom: 4px;
  line-height: 12px;
  font-size: 10px;
  color: #07111b;
}
.ratings .rating-wrapper .rating-item .content .star-wrapper {
  margin-bottom: 6px;
  font-size: 0;
}
.ratings .rating-wrapper .rating-item .content .star-wrapper .star {
  display: inline-block;
  margin-right: 6px;
  vertical-align: top;
}
.ratings .rating-wrapper .rating-item .content .star-wrapper .delivery {
  display: inline-block;
  vertical-align: top;
  height: 12px;
  line-height: 12px;
  font-size: 10px;
  color: #93999f;
}
.ratings .rating-wrapper .rating-item .content .text {
  margin-bottom: 8px;
  line-height: 18px;
  color: #07111b;
  font-size: 12px;
}
.ratings .rating-wrapper .rating-item .content .recommend {
  line-height: 16px;
  font-size: 0;
}
.ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up,
.ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_down,
.ratings .rating-wrapper .rating-item .content .recommend .item {
  display: inline-block;
  margin: 0 8px 4px 0;
  font-size: 9px;
}
.ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up {
  color: yellow;
}
.ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_down {
  color: #93999f;
}
.ratings .rating-wrapper .rating-item .content .recommend .item {
  padding: 0 6px;
  border: 1px solid rgba(7,17,27,0.1);
  border-radius: 1px;
  color: #93999f;
  background: #fff;
}
.ratings .rating-wrapper .rating-item .content .time {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 12px;
  font-size: 10px;
  color: #93999f;
}
</style>