<template>
    <div class="login-page">
        <canvas ref="canvas"></canvas>
        <div class="login-container">
            <div class="login-title">登 陆</div>
            <el-form :model="formData" :rules="rules" ref="ruleForm">
                <div class="input-row">
                    <el-form-item prop="username">
                        <el-input placeholder="请输入用户名" clearable prefix-icon="el-icon-z-people" v-model="formData.username" />
                    </el-form-item>
                </div>
                <div class="input-row login-pass">
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码" :type="inputType" prefix-icon="el-icon-z-lock" v-model="formData.password">
                            <i slot="suffix" @click="changInputType" class="el-input__icon el-icon-view"></i>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="submit-btn">
                    <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">登陆</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { randomNum, randomColor } from '@/utils/public';
import { mapActions } from 'vuex';
export default {
    name: 'login',
    data() {
        return {
            formData: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 12,
                        message: '长度在 6 到 12 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 12,
                        message: '长度在 6 到 12 个字符',
                        trigger: 'blur'
                    }
                ]
            },
            btnLoading: false,
            inputType: 'password',
            canvas: null,
            ctx: null,
            maxNum: 200,
            // 连线距离
            lineDis: 100,
            // 记录鼠标位置
            mousePosition: {
                x: null,
                y: null,
                max: 20000
            },
            mouseTimer: null,
            balls: [],
            createBassTimer: null
        };
    },
    mounted() {
        this._initCanvas();
    },
    methods: {
        ...mapActions(['loginAct', 'getInfoAct']),
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const loading = this.$loading({
                        text: '登陆中'
                    });
                    this.btnLoading = true;
                    this.loginAct(this.formData)
                        .then(token => this.getInfoAct(token))
                        .then(() => {
                            loading.close();
                            this.$router.push({ path: '/' });
                        })
                        .catch(err => {
                            err && this.$message.error(err);
                            this.btnLoading = false;
                            loading.close();
                        });
                }
            });
        },
        changInputType() {
            this.inputType == 'password'
                ? (this.inputType = 'text')
                : (this.inputType = 'password');
        },
        _initCanvas() {
            this._resize();
            window.onresize = this._resize;
            window.onmousemove = this._windowMouseMove;
            window.onmouseout = this._windowMouseOut;
            this._createBall();
            this._drawBall();
        },
        _resize() {
            let canvas = this.$refs.canvas;
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            canvas.width =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            canvas.height =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight;
        },
        _windowMouseMove(e) {
            clearTimeout(this.mouseTimer);
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            this.mouseTimer = setTimeout(() => {
                this.mousePosition.x = null;
                this.mousePosition.y = null;
            }, 500);
        },
        _windowMouseOut() {
            this.mousePosition.x = null;
            this.mousePosition.y = null;
        },
        _createBall() {
            this.createBassTimer = setInterval(() => {
                if (this.balls.length >= this.maxNum) {
                    clearInterval(this.createBassTimer);
                    return;
                }
                let ball = {
                    x: randomNum(100, this.canvas.width - 100),
                    y: randomNum(100, this.canvas.height - 100),
                    r: randomNum(1, 3),
                    color: randomColor(),
                    // color: '#000',
                    speedX: randomNum(-4, 3) * 0.4,
                    speedY: randomNum(-4, 3) * 0.4,
                    max: 6000
                };
                if (ball.speedX != 0 || ball.speedY != 0) {
                    this.balls.push(ball);
                }
            }, 1000 / 20);
        },
        _drawBall() {
            let ctx = this.ctx;
            let canvas = this.canvas;
            let balls = this.balls;
            let mousePosition = this.mousePosition;
            let newBalls = [mousePosition].concat(balls);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach(ball => {
                if (ball.x <= ball.r || ball.x >= canvas.width - ball.r) {
                    ball.speedX *= -1;
                }
                if (ball.y <= ball.r || ball.y >= canvas.height - ball.r) {
                    ball.speedY *= -1;
                }
                ball.x += ball.speedX;
                ball.y += ball.speedY;
                ctx.beginPath();
                ctx.fillStyle = ball.color;
                ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
                ctx.fill();
                // 循环比对粒子间的距离
                for (let i = 0; i < newBalls.length; i++) {
                    let item = newBalls[i];
                    if (ball === item || item.x === null || item.y === null)
                        continue;
                    let xc = ball.x - item.x;
                    let yc = ball.y - item.y;
                    // 两个粒子之间的距离
                    let dis = xc * xc + yc * yc;
                    // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
                    if (dis < item.max) {
                        // 如果是鼠标，则让粒子向鼠标的位置移动
                        if (item === mousePosition && dis > item.max / 2) {
                            ball.x -= xc * 0.03;
                            ball.y -= yc * 0.03;
                        }
                        // 计算距离比
                        let ratio = (item.max - dis) / item.max;
                        // 画线
                        ctx.beginPath();
                        ctx.lineWidth = ratio / 3;
                        ctx.strokeStyle = ball.color;
                        ctx.moveTo(ball.x, ball.y);
                        ctx.lineTo(item.x, item.y);
                        ctx.stroke();
                    }
                }
                newBalls.splice(newBalls.indexOf(ball), 1);
            });
            window.requestAnimationFrame(this._drawBall);
        }
    }
};
</script>

<style lang="scss">
.login-pass .el-input__suffix:hover {
    cursor: pointer;
}
</style>

<style lang="scss" scoped>
.login-page {
    position: relative;
    height: 100%;
    background: #f1f1f1;
}
canvas {
    display: block;
}
.login-container {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 60px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    transition: 0.3s all linear;
    transform: translate(-50%, -50%);
    &:hover {
        box-shadow: 0px 8px 24px rgba(7, 17, 27, 0.2);
    }
    .login-title {
        font-size: 34px;
        margin-bottom: 80px;
        text-align: center;
    }
    .input-row {
        margin-bottom: 30px;
    }
    .submit-btn .el-button {
        width: 100%;
        margin-top: 40px;
    }
}
</style>