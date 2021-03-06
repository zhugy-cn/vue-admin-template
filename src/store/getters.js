export default {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    sideState: state => state.app.sideState,
    tagsList: state => state.tagsNav.tagsList,
    cachedRoutes: state => state.tagsNav.cachedRoutes,
}