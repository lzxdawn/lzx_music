import { request } from './request'

export function getBanner(type) {
    return request({
        url: '/banner',
        params: {
            type
        }
    })
}


export function getSongList() {
    return request({
        url: '/personalized'
    })
}

export function getMvList(area) {
    return request({
        url: '/mv/all',
        params: {
            area
        }
    })
}

export function searchSong(keywords, page = 1) {
    return request({
        url: '/search',
        params: {
            keywords,
            offset: (page - 1) * 30
        }
    })
}



export function getHotSearch() {
    return request({
        url: '/search/hot/detail'
    })
}