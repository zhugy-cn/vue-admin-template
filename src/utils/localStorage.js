// 设置导航列表
export const setTagsInLocalStorage = list => {
    localStorage.tagNavList = JSON.stringify(list)
}
// 获取导航列表
export const getTagsFormLocalStorage = () => {
    return new Promise(resolve => {
        const list = localStorage.tagNavList
        list ? resolve(JSON.parse(list)) : resolve(false)
    })
}
// 设置导航状态
export const setSideStateLocal = state => {
    localStorage.sideState = state
}
// 获取导航状态
export const getSideStateLocal = () => {
    const sideState = localStorage.sideState
    return sideState === 'false' ? false : true
}