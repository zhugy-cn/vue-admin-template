import request from '@/utils/request'

export const loginApi = (username, password) => {
    return request({
        url: 'user/getToken',
        method: 'post',
        params: {
            username,
            password
        }
    })
}

export const getInfoApi = token => {
    return request({
        url: 'user/getInfo',
        method: 'get',
        params: { token }
    })
}

export const logoutApi = () => {
    return request({
        url: 'user/logout',
        method: 'post'
    })
}