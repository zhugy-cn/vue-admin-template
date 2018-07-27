import { loginApi, getInfoApi, logoutApi } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    },

    mutations: {
        SET_TOKEN: (state, token) => state.token = token,
        SET_NAME: (state, name) => state.name = name,
        SET_AVATAR: (state, avatar) => state.avatar = avatar,
        SET_ROLES: (state, roles) => state.roles = roles
    },

    actions: {
        // 登陆
        loginAct({ commit }, userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password.trim()
            return new Promise((resolve, reject) => {
                loginApi(username, password)
                    .then(result => {
                        const data = result.data
                        setToken(data.token)
                        commit('SET_TOKEN', data.token)
                        resolve(data.token)
                    })
                    .catch(err => reject(err))

            })
        },

        // 获取用户信息
        getInfoAct({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfoApi(state.token)
                    .then(result => {
                        const data = result.data
                        if (data.roles && data.roles.length > 0) {
                            commit('SET_ROLES', data.roles)
                        } else {
                            reject('用户路由权限为空')
                        }
                        commit('SET_NAME', data.name)
                        commit('SET_AVATAR', data.avatar)
                        resolve()
                    })
                    .catch(err => reject(err))
            })
        },

        // 登出
        logoutAct({ commit, state }) {
            return new Promise((resolve, reject) => {
                logoutApi(state.token)
                    .then(() => {
                        commit('SET_TOKEN', '')
                        commit('SET_ROLES', [])
                        removeToken()
                        resolve()
                    })
                    .catch(err => reject(err))
                // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
                // commit('SET_TOKEN', '')
                // commit('SET_ROLES', [])
                // removeToken()
            })
        },

    }
}