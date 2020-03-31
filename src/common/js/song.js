export default class Song {
    constructor({ id, mid, singer, name, album, image, mv }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.image = image
        this.mv = mv
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.id,
        mid: musicData.al.id,
        singer: filterSinger(musicData.ar),
        name: musicData.name,
        album: musicData.al.name,
        image: musicData.al.picUrl,
        mv: musicData.mv
    })
}

export function createSearch(musicData) {
    return new Song({
        id: musicData.id,
        mid: musicData.album.id,
        singer: filterSinger(musicData.artists),
        name: musicData.name,
        album: musicData.album.name,
        image: `https://v1.itooi.cn/netease/pic?id=${musicData.id}`,
        mv: musicData.mvid
    })
}



function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach(item => {
        ret.push(item.name)
    })
    return ret.join('/')
}