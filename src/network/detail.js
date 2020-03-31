import { request } from './request'

export function getListDetail(id) {
    return request({
        url: '/playlist/detail',
        params: {
            id
        }
    })
}

export function getSongUrl(id) {
    return request({
        url: '/song/url',
        params: {
            id
        }
    })
}