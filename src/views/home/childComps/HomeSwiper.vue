<template>
    <swiper>
        <swiper-item v-for="(item,index) in banners.list" :key="index" >
            <a :href="item.link">
                <img :src="item.image" alt="" @load="ImgLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name: "HomeSwiper",
    components: {
        Swiper,
        SwiperItem
    },
    props: {   //接收父组件传来的值
        banners: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            isLoad: false
        }
    },
    methods: {
        ImgLoad() {
            if(!this.isLoad) {
                this.$emit('swiperImgLoad')
                this.isLoad = true
            }
        }
    }
}
</script>

<style scoped>
</style>
