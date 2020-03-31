import { request } from './request'
import { getSongUrl } from './detail'

export function addSongUrl(list) {
    let songUrl = []
    let id = []
    list.forEach(s => {
        id.push(s.id)
    })
    getSongUrl(id).then(res => {
        songUrl = res.data.data
        if (!songUrl) {
            return
        }
        songUrl.forEach(item => {
            list.find(song => {
                if (song.id === item.id) {
                    song.url = item.url
                }
            })
        })
    })
}

export function getLyric(id) {
    return request({
        url: '/lyric',
        params: {
            id
        }
    })
}