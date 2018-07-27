<template>
    <div>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="2" :collapse="isCollapse" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="3-1">选项3-1</el-menu-item>
            <el-submenu :index="item.name" v-for="item in routes" :key="item.name">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item :index="val.name" v-for="val in item.children" :key="val.name">{{val.name}}</el-menu-item>
            </el-submenu>

            <!-- <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </template>
                <el-menu-item index="2-1">选项2-1</el-menu-item>
                <el-menu-item index="2-2">选项2-2</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航三</span>
                </template>
                <el-menu-item index="3-1">选项3-1</el-menu-item>
                <el-menu-item index="3-2">选项3-2</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航四</span>
                </template>
                <el-menu-item index="4-1">选项4-1</el-menu-item>
                <el-menu-item index="4-2">选项4-2</el-menu-item>
            </el-submenu> -->
        </el-menu>
        <!-- {{num}}
        <p>{{newNum}}</p>
        <p @click="add">添加</p> -->
    </div>
</template>
<script>
export default {
    name: 'sideMenu',
    data() {
        return {
            isCollapse: false,
            num: 22
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        filterRoutes1(routes) {
            let newRoutes = routes.filter(v => v.children);
            let tempRoutes = newRoutes.map(item => {
                if (item.children.length === 1) {
                    return item.children[0];
                } else {
                    return item;
                }
            });
            return tempRoutes;
        },
        filterRoutes(routes) {
            let newRoutes = routes.filter(v => v.children);
            newRoutes.forEach(item => {
                if (item.children.length === 1) {
                    item = item.children[0];
                }
            });
            return newRoutes;
        },
        add() {
            this.num++;
        },
        haha(num) {
            console.log(21321);
            return num + 'dasdas';
        }
    },
    mounted() {
        // this.filterRoutes1();
    },
    computed: {
        routes() {
            return this.filterRoutes1(this.$router.options.routes);
        },
        newNum() {
            return this.haha(this.num);
        }
    }
};
</script>
<style lang='scss' scoped>
.el-menu {
    border-right: none;
}
</style>