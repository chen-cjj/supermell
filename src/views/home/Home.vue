<template>
  <div id="home">
    <!-- 头部 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrol1" v-show="isTabFixed"
      class="tab-control" />
    <!-- 滑动区域 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load='true'
      @pullingUp='loadMore'>
      <home-swiper :banners="banners" @swiperImgLoad='swiperImgLoad' /> <!-- 轮播图 -->
      <recommend-view :recommends="recommends" /> <!-- 推荐栏 -->
      <feature-view /> <!-- 本周流行 -->
      <!-- 导航栏 -->
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrol2" />
      <goods-list :goods="showGoods" /> <!-- 商品列表 -->
    </scroll>

    <back-top @click.native="topclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  /* 公共组件 */
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  /* home特有的组件 */
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {
    getHomeMultdata,
    getHomeGoods
  } from 'network/home'
  import {
    debounce
  } from 'common/utils'
  import {
    backTopMixin
  } from "common/mixin"



  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    data() {
      return {
        banners: {},
        recommends: {},
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentType: 'pop',
        scroll: null,
        isShowBackTop: false,
        taboffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },
    mixins: [backTopMixin],
    created() {
      // 1.请求多个数据
      this.getHomeMultdata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    // 3.监听item中的图 片加载完成
    mounted() {
      let refresh = debounce(this.$refs.scroll.refresh) //执行防抖动函数
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('ItemImgLoad', this.itemImgListener)
    }, 
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 2.取消全局事件的监听
      this.$bus.$off('itemImgLoad' ,this.itemImgListener)
    },
    methods: {
      /**
       *  事件监听
       */

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabcontrol1.currentIndex = index //将最新点击的index赋值过去
        this.$refs.tabcontrol2.currentIndex = index //将最新点击的index赋值过去
      },
      contentScroll(position) {
        // 1.监听返回顶部按钮的显示与隐藏
        this.listenShowBackTop(position)

        // 2.监听tabcontrol吸顶
        this.isTabFixed = (-position.y > this.taboffsetTop)
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad() {
        this.taboffsetTop = this.$refs.tabcontrol2.$el.offsetTop
      },
      /**
       *  网络请求
       */
      getHomeMultdata() {
        getHomeMultdata().then(res => {
          this.banners = res.data.banner;
          this.recommends = res.data.recommend;
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    color: #fff;
    background-color: var(--color-tint);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>