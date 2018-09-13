<template>
    <div class="tags-nav">
        <div class="left-btn">
            <i class='el-icon-arrow-left'></i>
        </div>
        <div class='scroll-outer'>
            <div class="scroll-body">
                <router-link :class="['tags-nav-item',{'active':isActive(item)}]" :to="item.path" v-for="item in tagsList" :key="item.name">
                    <span class="tag-sot"></span>
                    <span>{{item.title}}</span>
                    <div class="icon-close">
                        <i class='el-icon-close' @click.prevent.stop='closeSelectedTag(item.name)'></i>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="right-btn">
            <i class='el-icon-arrow-right'></i>
        </div>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <i class='el-icon-circle-close-outline'></i>
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
    height: 40px;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
}
.left-btn,
.right-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
        color: #2d8cf0;
    }
}
.el-dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #f0f0f0;
    width: 32px;
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    .el-dropdown-link {
        outline: none;
    }
}
.scroll-outer {
    flex: 1;
    padding: 0 6px;
    background-color: #f0f0f0;
    box-shadow: inset 0 0 3px 2px rgba(99, 99, 99, 0.1);
    .scroll-body {
        display: flex;
        align-items: center;
        height: 100%;
        .tags-nav-item {
            display: flex;
            align-items: center;
            height: 32px;
            line-height: 1;
            color: #515a6e;
            font-size: 12px;
            margin-right: 4px;
            padding: 0 12px;
            background-color: #fff;
            border-radius: 3px;
            border: 1px solid #e8eaec;
            .tag-sot {
                display: inline-block;
                width: 12px;
                height: 12px;
                margin-right: 10px;
                border-radius: 50%;
                background: #e8eaec;
                transition: background 0.2s;
            }
            .icon-close {
                font-size: 10px;
                margin-left: 12px;
                border-radius: 50%;
                padding: 2px;
                transition: background 0.2s;
                &:hover {
                    color: #333;
                    background-color: #e8eaec;
                }
            }

            &.active .tag-sot {
                background: #2d8cf0;
            }
            &:hover {
                opacity: 0.85;
            }
        }
    }
}
</style>