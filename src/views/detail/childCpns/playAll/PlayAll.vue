<template>
  <div id="play-all">
    <div class="play-btn">
      <img src="~assets/image/start.png" alt="">
      <span class="play-title" @click="playAll">随机播放全部
        <span class="song-length">(共{{songlength}}首)</span>
      </span>
    </div>
    <div class="collect">
      +收藏({{subscribedCount}})
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subscribedCount: {
      type: Number,
      default: 0
    },
    songlength: {
      type: Number,
      default: 0
    }
  },
  methods: {
    playAll() {
      this.$emit('random')
    }
  }
}
</script>

<style scoped>
#play-all {
  height: 50px;
  display: flex;
  background: #fff;
  line-height: 50px;
  padding: 5px 15px;
  border-radius: 30px 30px 0 0;
  overflow: hidden;
}
.play-btn {
  flex: 1;
}

.play-btn img {
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.play-title { 
  font-size: 14px;
  font-weight: 600;
  vertical-align: middle;
  margin-left: 20px;
}
.collect {
  margin-top: 5px;
  height: 32px;
  padding: 8px 10px;
  font-size: 11px;
  background: #EB5948;
  line-height: 18px;
  color: #FFFFFF;
  border-radius: 30px;
  overflow: hidden;
  text-align: center;
}
.song-length {
  font-size: 10px;
  color: #999;
}
</style>