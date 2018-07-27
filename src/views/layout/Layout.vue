<template>
    <el-container>
        <el-aside width="200px">
            <side-menu />
        </el-aside>
        <el-container>
            <el-header height="50px">
                <header-bar />
            </el-header>
            <el-main>
                <router-view />
            </el-main>
            <el-footer height="50px">贵州格莱软件科技有限公司</el-footer>
        </el-container>
    </el-container>
</template>
<script>
import { SideMenu, HeaderBar, TagsNav } from './components';
export default {
    name: '',
    components: {
        SideMenu,
        HeaderBar,
        TagsNav
    },
    data() {
        return {};
    },
};
</script>
<style lang='scss' scoped>
.el-container {
    height: 100%;
}
.el-header {
}

.el-aside {
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 50px;
}
</style>