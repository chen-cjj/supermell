<template>
    <div class="wrapper" ref="aaaa">
        <ul class="content">
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
        <li>2223</li>
    </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Category',
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.aaaa, {

      })
    }
}
</script>

<style scoped>
    .wrapper {
        height: 150px;
        background-color: red;
        overflow: hidden;
    }
</style>
