<template>
  <div id="list-detail" v-if="backgroundImage" :style="`background-image: url(${backgroundImage})`">
    <div class="bg-mask" ></div>
    <div class="content">
      <detai-nav ref="detaiNav" :navtitle="songtitle" />
      <play-all
        class="tab-playall"
        :songlength="songlength"
        v-if="isShowPlayAll"
        @random="random"
        :subscribedCount="songListDetail.subscribedCount"
      />
      <scroll :data="songs" class="detail-scroll" ref="songlist" :probeType="3" @scroll="distance">
        <song-info :songDetail="songListDetail" @imgLoad="getAllTop" />
        <play-all
          v-if="songListDetail"
          :songlength="songlength"
          ref="playAll"
          @random="random"
          :subscribedCount="songListDetail.subscribedCount"
        />
        <song-list @select="select" :songList="songs" />
      </scroll>
    </div>
  </div>
</template>

<script>
import DetaiNav from "./childCpns/detailNav/DetailNav";
import PlayAll from "./childCpns/playAll/PlayAll";

import { getListDetail, getSongUrl } from "../../network/detail";
import {addSongUrl} from 'network/song'

import SongInfo from "components/content/songInfo/SongInfo";
import Scroll from "components/common/scroll/Scroll";
import SongList from "components/content/songList/SongList";

import {createSong} from 'common/js/song'

import {mapActions} from 'vuex'

let interval = null;
export default {
  name: "detail",
  components: {
    DetaiNav,
    SongInfo,
    SongList,
    PlayAll,
    Scroll
  },
  data() {
    return {
      //歌单详情
      songListDetail: {},
      songs: [],
      songtitle: "歌单",
      songlength: 0,
      //songinfo背景图片
      backgroundImage: "",
      //playAll距离顶部的距离
      playAllTop: 0,
      isShowPlayAll: false,
      isScroll: false
    };
  },
  created() {
    const id = this.$route.query.id;
    this._getListDetail(id);
  },
  methods: {
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ]),
    //--------事件监听----------
    select(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    random() {
      this.randomPlay({
        list: this.songs
      })
    },
    distance(position) {
      // console.log(-position.y)
      this.isShowPlayAll = -position.y > this.playAllTop;
      if (!this.isScroll === -position.y > 150) {
        this.songtitle = this.songListDetail.name;
        this.isScroll = true;

        if (interval) clearInterval(interval)         
        interval = setInterval(() => {
          let star = this.songtitle.slice(0,1)
          let end = this.songtitle.slice(1)
          this.songtitle = end +star
        }, 500);
      }
      if (-position.y < 150) {
        this.songtitle = "歌单"
        this.isScroll = false;
        clearInterval(interval)
      }
    },
    getAllTop() {
      //获取playAll距离顶部的距离
      this.playAllTop = this.$refs.playAll.$el.offsetTop;
    },
    //--------网络请求----------
    _getListDetail(id) {
      getListDetail(id).then(res => {
        let data = res.data
        this.songListDetail = data.playlist;
        this.backgroundImage = data.playlist.coverImgUrl;
        this.songs = this._normalizeSongs(data.playlist.tracks)
        this.songlength = this.songs.length
        //添加songURL
        addSongUrl(this.songs)
      });     
    },
    
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        if(item.id && item.al.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
  }
};
</script>

<style scoped>
#list-detail {
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: contain;
}
.bg-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(100, 100, 100, 0.3);
}
.tab-playall {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  border-radius: 0 !important;
}
.detail-scroll {
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>