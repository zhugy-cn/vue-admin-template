<template>
    <div class="tags-nav">
        <div class='tags-nav-list'>
            <router-link :class="['tags-nav-item',{'active':isActive(item)}]" :to="item.path" v-for="item in tagsList" :key="item.name">
                <span>{{item.title}}</span>
                <i class='el-icon-close' @click.prevent.stop='closeSelectedTag(item.name)'></i>
            </router-link>
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                <span>下拉菜单</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="closeSelectedTag">关闭当前</el-dropdown-item>
                <el-dropdown-item command="closeOthersTags">关闭其他</el-dropdown-item>
                <el-dropdown-item command="closeAllTags">关闭全部</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import { getTagsFormLocalStorage } from '@/utils/localStorage';
export default {
    name: 'tagsNav',
    data() {
        return {};
    },
    created() {
        this.getHomePage(this.$router.options.routes);
    },
    computed: {
        ...mapGetters(['tagsList'])
    },
    watch: {
        $route() {
            this.addTagsNav();
        }
    },
    methods: {
        ...mapMutations(['ADD_TAG', 'SET_HOME_PAGE_ROUTE', 'INIT_TAG']),
        ...mapActions(['delCurTagAct', 'delAllAct', 'delOthersTagAct']),
        addTagsNav() {
            this.ADD_TAG(this.$route);
        },
        isActive(route) {
            return route.path === this.$route.path;
        },
        // 获取首页,数据初始化
        getHomePage(routes) {
            routes.some(item => {
                if (item.homePage) {
                    this.SET_HOME_PAGE_ROUTE({
                        name: item.name,
                        path: item.path,
                        title: item.meta.title,
                        noCache: item.meta.noCache || false
                    });
                    getTagsFormLocalStorage().then(res => {
                        if (res) {
                            this.INIT_TAG(res);
                            this.addTagsNav();
                        } else {
                            this.addTagsNav();
                        }
                    });
                    return true;
                } else {
                    if (item.children) {
                        this.getHomePage(item.children);
                    }
                }
            });
        },
        handleCommand(command) {
            switch (command) {
                case 'closeSelectedTag':
                    this.closeSelectedTag();
                    break;
                case 'closeOthersTags':
                    this.delOthersTagAct(this.$route);
                    break;
                default:
                    this.delAllAct().then(route => this.$router.push(route));
            }
        },
        // 关闭当前
        closeSelectedTag(routeName) {
            if (routeName && this.routeIsHome(routeName)) return;
            if (!routeName && this.routeIsHome(this.$route.name)) return;
            if (routeName) {
                // 删除的是当前激活的路由，需要重新跳转到最后
                if (routeName === this.$route.name) {
                    this.delCurTagAct(routeName).then(lastRoutePath => {
                        this.$router.push(lastRoutePath);
                    });
                } else {
                    this.delCurTagAct(routeName);
                }
            } else {
                this.delCurTagAct(this.$route.name).then(lastRoutePath => {
                    this.$router.push(lastRoutePath);
                });
            }
        },
        routeIsHome(routeName) {
            return routeName === 'home';
        }
    }
};
</script>
<style lang='scss' scoped>
.tags-nav {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.tags-nav-list {
    display: flex;
}
.tags-nav-item {
    display: flex;
    align-items: center;
    height: 26px;
    line-height: 26px;
    color: #495060;
    font-size: 12px;
    margin-right: 12px;
    padding: 0 10px;
    border: 1px solid #d8dce5;
    .el-icon-close {
        font-size: 10px;
        margin-left: 8px;
    }
    &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
    }
}
</style>