<template>
    <div class="header-bar">
        <div :class="['sider-trigger',{'active':isCollapse}]" @click="collapseChange">
            <svg-icon svg-name="sideTrigger" />
        </div>
        <el-breadcrumb>
            <template v-for="(item,index) in breadcrumbList">
                <el-breadcrumb-item v-if="item.redirect ||  index===breadcrumbList.length-1" :key="item.path">
                    <span :class="{'cur': index===breadcrumbList.length-1}">{{item.meta.title}}</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else :to="item.path" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
        <el-dropdown>
            <span class="el-dropdown-link">
                <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3303741086,3211617265&fm=27&gp=0.jpg" alt="">
                <i class='el-icon-caret-bottom'></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import User from '../user/User';
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'headerBar',
    components: {
        User
    },
    data() {
        return {
            breadcrumbList: []
        };
    },
    computed: {
        ...mapState({
            isCollapse: state => state.app.sideState
        })
    },
    created() {
        this.getBreadcrumb();
    },
    methods: {
        // ...mapMutations(['TOGGLE_SIDE']),
        collapseChange() {
            // this.TOGGLE_SIDE();
            this.$store.commit('TOGGLE_SIDE');
        },
        getBreadcrumb() {
            let matchedList = this.$route.matched;
            let firstRoute = matchedList[0];
            let homePage = [{ path: '/home', meta: { title: '首页' } }];
            if (firstRoute && firstRoute.path) {
                matchedList = homePage.concat(matchedList);
            } else {
                matchedList = homePage;
            }
            this.breadcrumbList = matchedList;
        }
    },
    watch: {
        $route(e) {
            this.getBreadcrumb();
        }
    }
};
</script>


<style>
.header-bar .el-breadcrumb__inner.is-link {
    font-weight: 400;
    color: #606266;
}
.header-bar .el-breadcrumb__inner.is-link:hover {
    color: #409eff;
}
</style>

<style lang='scss' scoped>
.header-bar {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 50px 0 20px;

    .cur {
        font-weight: 700;
        &:hover {
            color: #606266;
        }
    }
}
.sider-trigger {
    font-size: 24px;
    color: #333;
    margin-right: 20px;
    cursor: pointer;
    &.active svg {
        transform: rotate(90deg);
    }
    svg {
        transition: all 0.3s;
    }
}
.el-breadcrumb {
    flex: 1;
}
.el-dropdown {
    height: 100%;
    .el-dropdown-link {
        height: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        outline: none;
    }
    img {
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 6px;
    }
}
</style>