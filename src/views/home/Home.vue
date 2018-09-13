<template>
    <div class="home">
        <el-row :gutter="20">
            <el-col :span="4" v-for="(item,index) in cardList" :key="index">
                <div class="card-panel">
                    <div class="left-area">
                        <i :class="'el-icon-'+item.icon"></i>
                    </div>
                    <div class="right-area">
                        <div class="right-area-num">{{item.num}}</div>
                        <div class="right-area-text">{{item.text}}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <section class="row"></section>
        <section class="row"></section>
    </div>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {
            cardList: [
                {
                    icon: 'view',
                    num: 1200,
                    text: '访问量'
                },
                {
                    icon: 'tickets',
                    num: 390,
                    text: '文章数量'
                },
                {
                    icon: 'rank',
                    num: 888,
                    text: '累计点击'
                },
                {
                    icon: 'share',
                    num: 56,
                    text: '分享统计'
                },
                {
                    icon: 'date',
                    num: 250,
                    text: '登录次数'
                }
            ]
        };
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
    .el-col-4 {
        width: 20%;
        &:nth-child(1) .left-area {
            background-color: rgb(45, 140, 240);
        }
        &:nth-child(2) .left-area {
            background-color: rgb(25, 190, 107);
        }
        &:nth-child(3) .left-area {
            background-color: rgb(255, 153, 0);
        }
        &:nth-child(4) .left-area {
            background-color: rgb(237, 63, 20);
        }
        &:nth-child(5) .left-area {
            background-color: rgb(228, 108, 187);
        }
    }
}

.card-panel {
    display: flex;
    height: 120px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 4px;
    transition: box-shadow 0.3s;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .left-area {
        width: 36%;
        text-align: center;
        line-height: 120px;
        i {
            color: #fff;
            font-size: 36px;
        }
    }
    .right-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #515a6e;
        .right-area-num {
            font-size: 50px;
        }
        .right-area-text {
            font-size: 14px;
        }
    }
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>