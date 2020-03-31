<template>
  <div id="music-disk">
    <div class="player_con" :class="{playing: isPlaying}"> 
      <div class="bar-box">
        <img src="~assets/image/aag.png" class="play_bar"  alt="">
      </div>
      <img src="~assets/image/cd_wrapper.png" class="disc autoRotate" alt="">
      <img class="cover autoRotate" :src="imageUrl"  alt="">
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    imageUrl: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters({
      isPlaying: 'playing'
    })
  },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
@import '~assets/css/animate.css';
#music-disk {
  width: 100%;
  height: 100vh;
}

.player_con {
  position: relative;
  top: 0;
  width: 20.625rem /* 330/16 */;
  height: 18.75rem /* 300/16 */;
  left: 50%;
  margin-top: -36px;
  transform: translateX(-50%)
}
.bar-box {
  position: absolute;
  left: -3.9375rem /* 63/16 */;
  top: 50px;
  width: 90px;
  height: 140px;  
}

.disc {
    position: absolute;
    width: 17.5rem /* 280/16 */;
    height: 17.5rem /* 280/16 */;
    left: 26px /* 20/16 */;
    top: 7.5rem /* 120/16 */;
    z-index: 9;
}

.cover {
    position: absolute;
    left: 4.125rem /* 66/16 */;
    top: 10.5rem /* 168/16 */;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    z-index: 8;
}

@keyframes Rotate {
    from {
        transform: rotateZ(0);
    }
    to {
        transform: rotateZ(360deg);
    }
}


/* 旋转的类名 */

.autoRotate {
    animation-name: Rotate;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    animation-timing-function: linear;
    animation-duration: 10s;
}


/* 是否正在播放 */

.player_con.playing .disc,
.player_con.playing .cover {
  animation-play-state: running;
}

.play_bar {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 12.5rem /* 200/16 */;
    top: -.625rem /* 10/16 */;
    z-index: 10;
    transform: rotate(-25deg);
    transform-origin: .75rem /* 12/16 */ .75rem /* 12/16 */;
    transition: 1s;
}


/* 播放杆 转回去 */

.player_con.playing .play_bar {
    transform: rotate(0);
}

</style>