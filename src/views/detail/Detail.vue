<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>

    <scroll class="content" ref="scroll" :probeType='3' @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info ref="goods" :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>

    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="topclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'

  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend
  } from 'network/detail'
  import {
    itemListenerMixin,
    backTopMixin
  } from "common/mixin"

  import { mapActions } from 'vuex' 

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex : 0,
      }
    },
    mixins: [itemListenerMixin,backTopMixin],

    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.发起请求获取数据
      getDetail(this.iid).then(res => {
          // 1.获取顶部轮播图数据
          const data = res.result
          this.topImages = data.itemInfo.topImages

          // 2.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          // 3.获取商家信息
          this.shop = new Shop(data.shopInfo)

          // 4.获取图片信息
          this.detailInfo = data.detailInfo;

          // 5.获取商品信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          // 6.去出评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }
        }),

        // 3.请求推荐数据
      getRecommend().then(res => {
          this.recommends = res.data.list
        })

    },
    methods: {
      ...mapActions(['addCart']),

      imageLoad() {
        this.refresh()
                //nextTick等待dom元素渲染完成后调用回调函数    
          this.$nextTick(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
      })    
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200)
      },
      contentScroll(position) {
        // 1.获取y值
        const positonY = -position.y + 44

        // 2. positionY和主题中值进行对比(promise 和 mapActions)
        let length = this.themeTopYs.length
        for(let i=0;i<length-1;i++) {
          if(i<length-1 
          && positonY>=this.themeTopYs[i] 
          && positonY<this.themeTopYs[i+1]
          )
            {
             if(this.currentIndex !== i) {
               this.currentIndex = i
               this.$refs.nav.currentIndex = this.currentIndex
             }
           }
        }
        // 3.是否显示回到顶部
        this.listenShowBackTop(position)
      },
      addToCart() {
        // 1.获取购物车商品数据
        const product = {}
        product.image = this.topImages[0],
        product.title = this.goods.title,
        product.desc = this.goods.desc,
        product.price = this.goods.realPrice,
        product.iid = this.iid

        // 2.将商品添加到购物车  mapActions
        this.addCart(product).then(res => {
         this.$toast.show(res, 2000)
         console.log(this.$toast);
        })
      }
    },

    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListenner)
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>