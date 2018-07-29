import { setTagsInLocalStorage } from '@/utils/localStorage'
export default {
    state: {
        homePageRoute: {},  // 首页
        tagsList: [],
        cachedRoutes: [],
    },
    mutations: {
        SET_HOME_PAGE_ROUTE: (state, homeRoute) => {
            state.homePageRoute = homeRoute
            state.tagsList = [homeRoute]
            if (!homeRoute.noCache) {
                state.cachedRoutes = [homeRoute.name]
            } else {
                state.cachedRoutes = []
            }
        },
        INIT_TAG(state, list) {
            state.tagsList = list
        },
        ADD_TAG: (state, route) => {
            if (!state.tagsList.some(v => v.path === route.path)) {
                state.tagsList.push({
                    title: route.meta.title,
                    path: route.path,
                    name: route.name
                })
            }
            if (!state.cachedRoutes.some(v => v === route.name)) {
                !route.meta.noCache && state.cachedRoutes.push(route.name)
            }
            setTagsInLocalStorage(state.tagsList)
        },
        DEL_CUR_TAG: (state, routeName) => {
            let tagIdx = state.tagsList.findIndex(v => v.name === routeName)
            let cacheIdx = state.cachedRoutes.findIndex(v => v === routeName)
            state.tagsList.splice(tagIdx, 1)
            cacheIdx !== -1 && state.cachedRoutes.splice(cacheIdx, 1)
            console.log(state.tagsList)
            setTagsInLocalStorage(state.tagsList)
        },
        DEL_OTHERS_TAG: (state, route) => {
            const { tagsList, homePageRoute } = state
            state.tagsList = tagsList.filter(item => item.name === homePageRoute.name || item.name === route.name)
            if (!homePageRoute.noCache) {
                state.cachedRoutes = [homePageRoute.name].concat(route.name)
            } else {
                state.cachedRoutes = [route.name]
            }
            setTagsInLocalStorage(state.tagsList)
        },
        DEL_ALL: (state, homePageRoute) => {
            state.tagsList = [homePageRoute]
            if (!homePageRoute.noCache) {
                state.cachedRoutes = [homePageRoute.name]
            } else {
                state.cachedRoutes = []
            }
            setTagsInLocalStorage(state.tagsList)
        }
    },
    actions: {
        delCurTagAct({ commit, state }, routeName) {
            return new Promise(resolve => {
                commit('DEL_CUR_TAG', routeName)
                resolve(state.tagsList[state.tagsList.length - 1].path)
            })
        },
        delOthersTagAct({ commit, state }, route) {
            const { homePageRoute } = state
            if (route.name === homePageRoute.name) {
                commit('DEL_ALL', homePageRoute)
            } else {
                commit('DEL_OTHERS_TAG', route)
            }
        },
        delAllAct({ commit, state }) {
            return new Promise(resolve => {
                commit('DEL_ALL', state.homePageRoute)
                resolve(state.tagsList[0].path)
            })
        }
    }
}