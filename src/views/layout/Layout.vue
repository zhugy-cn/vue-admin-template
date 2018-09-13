<template>
    <el-container>
        <el-aside width="auto">
            <!-- <div class="logo-wrapper">
                <router-link class="logo-link" to="/">
                </router-link>
            </div> -->
            <side-menu />
        </el-aside>
        <el-container>
            <el-header height="100px">
                <header-bar />
                <tags-nav />
            </el-header>
            <el-main>
                <keep-alive :include="cachedRoutes">
                    <router-view />
                </keep-alive>
            </el-main>
            <el-footer height="50px">贵州格莱软件科技有限公司</el-footer>
        </el-container>
    </el-container>
</template>
<script>
import { SideMenu, HeaderBar, TagsNav } from './components';
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: '',
    components: {
        SideMenu,
        HeaderBar,
        TagsNav
    },
    computed: {
        ...mapGetters(['cachedRoutes'])
    }
};
</script>
<style lang='scss' scoped>
.el-container {
    height: 100%;
}
.el-header {
    padding: 0;
    z-index: 2;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}

.el-aside {
    background-color: rgb(84, 92, 100);
    .logo-wrapper {
        height: 50px;
        .logo-link {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
.el-main {
    color: #333;
    padding: 24px;
    background-color: #f5f7f9;
}
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 50px;
}
</style>