<template>
  <div class="song-list">
    <div @click="songClick(index)" class="song-item" v-for="(item, index) in songList" :key="index">
      <img class="song-img" v-lazy="item.picUrl" alt="">
      <div class="song-name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songList: {
      type: Array,
      defalut() {
        return []
      }
    }
  },
  methods: {
    songClick(index) {
      const id = this.songList[index].id 
      this.$emit('songlistClick', id)
    }
  }
}
</script>

<style scoped>
.song-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.song-item {
  flex: 33%;
  padding: 0 2px;
  padding-bottom: 10px;
}
.song-item .song-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
}
.song-item .song-name {
  font-size: 12px;
  overflow: hidden;
  line-clamp: 2;
  box-orient: vertical;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>