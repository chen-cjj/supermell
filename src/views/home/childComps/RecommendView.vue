<template>
    <div class="recommend">
        <div v-for="(item,index) in recommends.list" :key="index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecommendView",
    props: {
        recommends: {
            type: Object,
            default() {
            return {}
            }
        }
        
    }
}
</script>

<style scoped>
    .recommend {
        width: 100%;
        display: flex;
        text-align: center;
        font-size: 12px;
        padding: 10px 0 20px;
        border-bottom: 8px solid #eee;
    }
    .recommend-item {
        flex: 1;
    }
    .recommend-item img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
</style>
