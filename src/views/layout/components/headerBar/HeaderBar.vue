<template>
    <div class="header-bar">
        <div :class="['sider-trigger',{'active':isCollapse}]" @click="collapseChange">
            <svg-icon svg-name="sideTrigger" />
        </div>
        <el-breadcrumb>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
import User from '../user/User';
export default {
    name: 'headerBar',
    components: {
        User
    },
    data() {
        return {
            isCollapse: false
        };
    },
    methods: {
        collapseChange() {
            this.isCollapse = !this.isCollapse;
        }
    }
};
</script>
<style lang='scss' scoped>
.header-bar {
    display: flex;
    align-items: center;
    height: 100%;
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