<template>
  <div id="player" v-show="playlist.length > 0">
    <transition name="normal">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.image" alt="">
      </div>
      <nav-bar class="nav-bar">
      <div class="back" slot="left" @click="backClick">
        <img src="~assets/image/back.png" alt="">
      </div>
      <div slot="center" class="song-info">
        <div class="song-name">{{currentSong.name}}</div>
        <div class="singer">{{currentSong.singer}}</div>
      </div>
      <div v-if="false" slot="right" class="song-info">
      </div>
      </nav-bar>
      <div class="middle"
       @touchstart="middleTouchStart"
       @touchmove="middleTouchMove"
       @touchend="middleTouchEnd">
        <div ref="middleL" class="middle-l">
          <Disc :imageUrl="currentSong.image" />
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">{{playingLyric}}</div>
          </div>
        </div>
          <scroll ref="lyricList" class="middle-r" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper"> 
              <div v-if="currentLyric">
                <p class="text"
                ref="lyricLine"
                :class="{'current': currentLineNum === index}"
                 v-for="(line, index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
      <div class="dot-wrapper">
         <span class="dot" :class="{'active':currentShow==='cd'}"></span>
         <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
      </div>
      <div class="progress-wrapper">
        <span class="time time-l">{{format(currentTime)}}</span>
        <div class="progress-bar-wrapper">
          <ProgressBar :percent="percent" @percentChange="onpercentChange"/>
        </div>
        <span class="time time-r">{{format(duration)}}</span>
      </div>
      <div class="operators top">
        <div class="icon">
          <img @click="changeMode" :src="require(`@/assets/image/${modeIcon}.png`)" />
        </div>
        <div class="icon">
          <img @click="prev" src="~assets/image/ajh.png" alt="">
        </div>
        <div class="icon">
          <img v-show="!playIcon" @click="togglePlaying" src="~assets/image/ajf.png" alt="">
          <img v-show="playIcon" @click="togglePlaying" src="~assets/image/ajd.png" alt="">
        </div>
        <div class="icon">
          <img @click="next" src="~assets/image/ajb.png" alt="">
        </div>
        <div class="icon">
          <img src="~assets/image/cm2_play_icn_love@2x.png" alt="">
        </div>
      </div>
    </div> 
    </transition>
    <audio ref="audio" @timeupdate="updateTime"
      @canplay="ready" @error="error" @ended="end"
       :src="currentSong.url"></audio>
  </div>
  
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import ProgressBar from 'components/common/progress-bar/progress-bar'
import Disc from 'components/content/disc/Disc'

import Scroll from 'components/common/scroll/Scroll'

import {mapGetters, mapMutations} from 'vuex'
import { playing } from '../../../store/getters'

import {playMode} from 'common/js/config'
import {prefixStyle} from 'common/js/dom'

import {shuffle} from 'common/js/utils.js'

import {getLyric} from 'network/song'

import Lyric from 'lyric-parser'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default {
  components: {
    NavBar,
    Disc,
    ProgressBar,
    Scroll
  },
  data() {
    return {
      songReady: false,
      currentTime: 0,
      duration: 0,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      playingLyric: ''
    }
  },
  created() {
    this.touch = {}
  },
  computed: {
    playIcon() {
      return this.playing
    },
    percent() {
      return this.currentTime / this.duration
    },
    modeIcon() {
      return this.mode === playMode.sequence ? 'cm2_icn_loop@2x'
       : this.mode === playMode.loop ? 'cm2_icn_one@2x'
       : 'cm2_icn_shuffle@2x'
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ])
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if(mode === playMode.random) { 
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
      this.duration = this.$refs.audio.duration
    },
    backClick() {
      this.setFullscreen(false)
    },
    togglePlaying() {
      if (!this.songReady) {
        return
      }
      this.setPlaying(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    ...mapMutations({
      setFullscreen: 'SET_FULL_SCREEN',
      setPlaying: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST'
    }),
    onpercentChange(percent) {
      const currentTime = this.$refs.audio.duration * percent
      this.$refs.audio.currentTime = currentTime
      if(!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    end() {
      if(this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop() {
      setTimeout(() => {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      }, 300);
    },
    next() {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
      } else{
         let index = this.currentIndex + 1
         if (index === this.playlist.length) {
           index = 0
         }
         this.setCurrentIndex(index)
         if(!this.playing) {
           this.togglePlaying()
         }
         if (!this.currentSong.url) {
           this.next()
         }
      }
      this.songReady = false
    },
    prev() {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
      } else{
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
         if(!this.playing) {
          this.togglePlaying()
        }
        if (!this.currentSong.url) {
          this.prev()
        }
      }
      this.songReady = false
    },
    ready() {
      this.songReady = true
    },
    error() {
      this.songReady = true
    },
    format(interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    _pad(num, n=2) {
      let len = num.toString().length
      while(len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    middleTouchStart(e) {
      this.touch.initiated = true
      this.touch.moved = false
      const touches = e.touches[0]
      this.touch.startX = touches.pageX
      this.touch.startY = touches.pageY
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true
      }
      const left = this.currentShow === "cd" ? 0 : -window.innerWidth
      const offsetWidth = Math.max(-window.innerWidth, left + deltaX)
      this.touch.percent = Math.abs(offsetWidth / -window.innerWidth)
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      this.$refs.lyricList.$el.style[transitionDuration] = 0
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style[transitionDuration] = 0
    },
    middleTouchEnd(e) {
      if (!this.touch.moved) {
        return
      }
      let offsetWidth = 0
      let opacity = 0
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          this.currentShow = 'lyric'
          opacity = 0
        } else {
            offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      const time = 300
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style[transitionDuration] = `${time}ms`
    },
    _getLyric(id) {
      getLyric(id).then(res => {
        let lyric = res.data.lrc.lyric
        this.currentLyric = new Lyric(lyric, this.handleLyric) 
         if (this.playing) {
           this.currentLyric.play()
         }
      })
    },
     handleLyric({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollToElement(0, 0, 1000)
      }
      this.playingLyric = txt
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
          return
      }
      if(newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(_ => {
        this.$refs.audio.play()
        this._getLyric(this.currentSong.id)
        this.$refs.lyricList.scrollTo(0, 0, 0)
      },1000)
      
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(_ => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style scoped>
#player> .normal-player {
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 1000;
 background: #666;
 overflow: hidden;
}

.background {
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   z-index: -1;
   opacity: 0.6;
   filter: blur(20px);
}
.nav-bar {
  padding: 0 12px;
}

.back {
  position: relative;
  z-index: 66;
  width: 20%;
  height: 60px;
  line-height: 60px;
}

.back img {
  width: 22px;
  height: 22px;
}
.center {
  width: 80%;
  text-align: center;
  margin: auto;
  font-size: 16px;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
}

.song-name, .singer {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-name {
  position: relative;
  font-size: 1rem /* 16/16 */;
  color: #fff;
}
.singer {
  position: absolute;
  top: 20px;
  left: 50%;
  right: 0;
  transform: translateX(-50%);
  font-size: .5rem /* 8/16 */;
  color: #d0d0d0;
  width: 60%;
  
}
.play-btn {
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 50%;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%);
}
.play-btn img {
  width: 100%;
  height: 100%;
}
.progress-wrapper {
  position: relative;
  bottom: -70%;
  color: #fff;
}

.operators {
  position: relative;
  bottom: -73%;
  display: flex; 
  flex-wrap: nowrap;
}
.operators .icon {
  flex: 20%;
  text-align: center;
}

.icon img {
  width: 36px;
  height: 36px;
}

.normal-enter-active, .normal-leave-active {
  transition: all 0.4s;      
}
.normal-enter-active, .normal-leave-active .top, .bottom {
  transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
}
        
.normal-enter, .normal-leave-to {
  opacity: 0;
   
}
.normal-enter, .normal-leave-to .top {
  transform: translate3d(0, -100px, 0)
}
    
.normal-enter, .normal-leave-to .bottom {
  transform: translate3d(0, 100px, 0)
}     

.progress-wrapper {
  display: flex;
  align-items: center;
  width: 88%;
  margin: 0px auto;
  padding-top: 3%;
 }
.time {
  color: #fff;
  font-size: 12px;
  flex: 0 0 30px;
  line-height: 30px;
  width: 30px;
}                   
.time-l {
  text-align: left;
}
.time-r {
  text-align: right;
}             
.progress-bar-wrapper {
   flex: 1;
}
           
.middle {
  position: fixed;
  width: 100%;
  top:8%;
  bottom: 170px;
  white-space: nowrap;
}

.middle-l {
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 100%;
  /* margin-top: -3%; */
}

.middle-r {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.lyric-wrapper {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
  
}
.lyric-wrapper .text {
  line-height: 32px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.lyric-wrapper .current {
  color: #fff;
}
.dot-wrapper {
  position: relative;
  bottom: -70%;
  text-align: center;
  font-size: 0;
}
.dot-wrapper .dot {
  display: inline-block;
  vertical-align: middle;
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}
.dot-wrapper .active {
  width: 20px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);
}

.playing-lyric-wrapper {
  position: absolute;
  left: 50%;
  right: 50%;
  top: 68%;
  transform: translateX(-50%);
  width: 80%;
  overflow: hidden;
  text-align: center;
}
.playing-lyric-wrapper .playing-lyric {
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}
</style>