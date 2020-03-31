<template>
  <div v-if="songDetail" class="song-info" >
    <div class="info-left">
      <img :src="songDetail.coverImgUrl" alt="" @load="imgLoad">
    </div>
    <div class="info-right">
      <div class="info-name">{{songDetail.name}}</div>
      <div class="info-desc">{{songDetail.description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songDetail: {
      type: Object,
      default() {
        return {}
      }
    },
    bgImage: {
      type: String,
      default: ""
    }
  },
  methods: {
    imgLoad() {
      this.$emit('imgLoad')
    }
  }
}
</script>

<style scoped>
.song-info {
  position: relative;
  display: flex;
  height: 200px;
  padding: 0 10px;
  background-size: cover;
}

.info-left, .info-right {
  padding-top: 30px;
}
.info-left {
  /* width: 110px; */
  flex: 40%;
  height: 7.5rem /* 120/16 */;
  box-sizing: content-box;
  justify-content: space-evenly;
  flex: 20%;
}
.info-left>img {
  width: 6.875rem /* 110/16 */;
  height: 7.5rem /* 120/16 */;
  border-radius: 10%;
  overflow: hidden;
}

.info-right {
  padding-left: 15px;
  flex: 50%;
}
.info-name {
  font-size: 1rem /* 16/16 */;
  color: #fff;
  padding-bottom: 2.875rem /* 46/16 */;
}
.info-desc {
  font-size: .75rem /* 12/16 */;
  color: #eee;
  overflow: hidden;
  line-clamp: 2;
  box-orient: vertical;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>