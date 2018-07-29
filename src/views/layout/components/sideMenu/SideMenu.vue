<template>
    <div>
        <el-menu class="el-menu-vertical-demo" :collapse="sideState" :default-active="this.$route.path" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <keep-alive>
                <side-menu-item :routes="routes" />
            </keep-alive>
        </el-menu>
    </div>
</template>
<script>
import SideMenuItem from './SideMenuItem';
import { mapMutations, mapGetters } from 'vuex';
export default {
    name: 'sideMenu',
    components: {
        SideMenuItem
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['sideState']),
        routes() {
            return this.$router.options.routes;
        }
    },
    methods: {
        ...mapMutations(['TOGGLE_SIDE'])
    }
};
</script>
<style>
.el-menu--collapse
    > .menu-wrapper
    > .el-submenu
    > .el-submenu__title
    > .el-submenu__icon-arrow.el-icon-arrow-right {
    display: none !important;
}
.el-menu--collapse > .menu-wrapper > .el-submenu > .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}
</style>
<style lang='scss' scoped>
.el-menu {
    border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>