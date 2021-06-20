<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" :key="index"
        class="tab-control-item" :class="{active: index === currentIndex}" @click="itemclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabControl',
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }

        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        itemclick(index) {
            this.currentIndex = index,
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style scoped>
    .tab-control {
        text-align: center;
        display: flex;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
    }
    .tab-control-item {
        flex: 1;
        background-color: rgb(255, 255, 255);
    }
    .tab-control-item span {
        padding: 5px;
    }
    .active {
       color: var(--color-high-text)
    }
    .active span {
        border-bottom: 3px solid var(--color-high-text);
    }
</style>
