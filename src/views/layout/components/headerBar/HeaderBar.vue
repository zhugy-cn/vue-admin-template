<template>
    <div class="header-bar">
        <div :class="['sider-trigger',{'active':isCollapse}]" @click="collapseChange">
            <svg-icon svg-name="sideTrigger" />
        </div>
        <el-breadcrumb>
            <template v-for="item in breadcrumbList">
                <el-breadcrumb-item v-if="item.redirect" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
                <el-breadcrumb-item v-else :to="item.path" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
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
<style lang='scss' scoped>
.header-bar {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #e6e6e6;
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
</style>