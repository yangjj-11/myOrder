<template>
  <div>
    <div class="goods">
       <!-- better-scroll只处理父容器wrapper的第一个子元素content的滚动，其它的元素都会被忽略 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in goods" :class="{current: index===currentIndex}" @click="clickMenuItem(index)" :key="index">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- <ShopCart /> -->
    </div>
    <!-- <Food :food="food" ref="food"/> -->
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
// import CartControl from '../../../components/CartControl/CartControl.vue'
// import Food from '../../../components/Food/Food.vue'
// import ShopCart from '../../../components/ShopCart/ShopCart.vue'
export default {
  name:"ShopGoods",
  data () {
    return {
      // 右侧 Y 轴滑动的坐标(越往下数值越小)
      scrollY: 0,
      // 右侧各个分类小列表的top值
      tops: [], 
      // 显示的food
      food: {}
    }
  },
  // better-scroll需要获取DOM，在vue中使用ref获取到需要的DOM，一般在生命周期钩子的mounted函数中使用
  mounted () {
    // 获取请求数据是通过ajax异步获取数据的，而并非同步
    this.$store.dispatch('getShopGoods', () => { // 数据更新后执行
      this.$nextTick(() => { // 列表数据更新显示后执行(刷新)
        this._initScroll()
        this._initTops()
      })
    })
  },
  computed: {
    ...mapState(['goods']),
    // 计算得到当前分类的下标
    currentIndex () { // 初始和相关数据发生了变化
      // 得到条件数据
      const {scrollY, tops} = this
      // 根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        // scrollY>=当前top && scrollY<下一个top
        return scrollY >= top && scrollY < tops[index + 1]
      })
      // 返回结果scrollY值属于第几个li标签区间
      console.log("1111111")
      console.log(index)
      return index
    }
  },
  methods: {
    // 初始化滚动
    _initScroll () {
      // 列表显示之后创建
      // better-scroll 对外暴露了一个 BScroll 的类，我们初始化只需要 new 一个类的实例即可
      new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 2, // 因为惯性滑动不会触发
        click: true
      })
      // 给右侧列表绑定scroll监听
      this.foodsScroll.on('scroll', ({x, y}) => {
        console.log(x, y)
        this.scrollY = Math.abs(y)
      })
      // 给右侧列表绑定scroll结束的监听
      this.foodsScroll.on('scrollEnd', ({x, y}) => {
        console.log('scrollEnd', x, y)
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化tops
    _initTops () {
      // 1. 初始化tops
      const tops = []
      let top = 0
      // 第一个li的top为0
      tops.push(top)
      // console.log(tops)
      // 2. 收集foods列表下找到所有li的top值
      // this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      const lis = this.$refs.foodsUl.children
      // console.log(lis)
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      // 3. 更新数据
      this.tops = tops
      // console.log(tops)
    },
    clickMenuItem (index) {
      console.log(index)
      // 使用右侧列表滑动到对应的位置
      // 得到目标位置的scrollY
      const scrollY = this.tops[index]
      // console.log(scrollY)
      // 立即更新scrollY(让点击的分类项成为当前分类)
      this.scrollY = scrollY
      // 平滑滑动右侧列表 better-scroll里的方法
      this.foodsScroll.scrollTo(0, -scrollY, 1000)
    },
    // 显示点击的food
    showFood (food) {
      // 设置要传递给food组件的数据
      this.food = food
      // 显示food组件 (在父组件中调用子组件对象的方法)
      this.$refs.food.toggleShow()
    }
  },
  // components: {
  //   CartControl,
  //   Food,
  //   ShopCart
  // }
};
</script>
<style scoped>
.goods {
  display: flex;
  position: absolute;
  /*top: 194px;*/
  width: 100%;
  background: #fff;
  overflow: hidden;
  /*bottom: 46px;*/
}
.goods .menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  height: 390px;
  overflow: hidden;
  background: #f3f5f7;
}
.goods .menu-wrapper .menu-item {
  display: table;
  height: 54px;
  width: 56px;
  padding: 0 12px;
  font-size: 13px;
  line-height: 54px;
}
.goods .menu-wrapper .menu-item.current {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  background-color: green;
  font-weight: 700;
}
.goods .menu-wrapper .menu-item .icon {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.goods .menu-wrapper .menu-item .text {
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  font-size: 12px;
}
.goods .foods-wrapper {
  flex: 1;
  height: 390px;
}
.goods .foods-wrapper .title {
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: #93999f;
  background: #f3f5f7;
}
.goods .foods-wrapper .food-item {
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
}
.goods .foods-wrapper .food-item:last-child {
  margin-bottom: 0;
}
.goods .foods-wrapper .food-item .icon {
  flex: 0 0 57px;
  margin-right: 10px;
}
.goods .foods-wrapper .food-item .content {
  flex: 1;
}
.goods .foods-wrapper .food-item .content .name {
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: #07111b;
}
.goods .foods-wrapper .food-item .content .desc,
.goods .foods-wrapper .food-item .content .extra {
  line-height: 10px;
  font-size: 10px;
  color: #93999f;
}
.goods .foods-wrapper .food-item .content .desc {
  line-height: 12px;
  margin-bottom: 8px;
}
.goods .foods-wrapper .food-item .content .extra .count {
  margin-right: 12px;
}
.goods .foods-wrapper .food-item .content .price {
  font-weight: 700;
  line-height: 24px;
}
.goods .foods-wrapper .food-item .content .price .now {
  margin-right: 8px;
  font-size: 14px;
  color: #f01414;
}
.goods .foods-wrapper .food-item .content .price .old {
  text-decoration: line-through;
  font-size: 10px;
  color: #93999f;
}
.goods .foods-wrapper .food-item .content .cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 12px;
}
</style>