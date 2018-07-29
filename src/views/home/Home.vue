<template>
    <div class="home">
        我是首页
    </div>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {};
    },
    created() {
        console.log('home');
    },
    mounted() {
        console.log('home');
    }
};
</script>
<style lang='scss' scoped>
.home {
    height: 1000px;
}
</style>