import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
Vue.use(Router)



const router = new Router({
	routes,
})
const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
	const token = store.getters.token
	const roles = store.getters.roles
	NProgress.start()
	if (token) {
		console.log(1)
		if (to.name === 'login') {
			// router在hash模式下 手动改变hash 重定向回来不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
			NProgress.done()
			return next({ path: '/' })
		}
		if (roles.length) {
			next();
		} else {
			store.dispatch('getInfoAct')
				.then(() => next())
				.catch(err => {
					console.log('获取用户信息失败', err)
				})
		}
	} else {
		if (to.name === 'login') {
			next()
		} else {
			NProgress.done()
			next('/login')
		}
	}
})



router.afterEach(() => {
	console.log('进入路由之后')
	NProgress.done()
})




export default router