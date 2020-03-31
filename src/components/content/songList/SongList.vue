<template>
  <div id="song-list">
    <slot name="searchTitle"></slot>
    <div class="song-item" @click="selectItem(item, index)"  v-for="(item, index) in songList" :key="index">
      <div class="order">{{index + 1}}</div>
      <div class="song-info">
        <div class="song-name">{{item.name}}</div>
        <div class="singer">
          <span>{{item.singer+' - '+item.album}}</span>
        </div>
        <div class="mv" v-if="item.mv !== 0">
          <img src="~assets/image/l0.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSongUrl} from 'network/detail'
export default {
  props: {
    songList: {
      type: Array,
      default() {
        return []
      }
    },
    searchValue: {
      type: String,
      default: ""
    }
  },
  methods: {
    selectItem(item, index) {
      // getSongUrl(item.id).then(res => {
      //   let url = res.data.data[0].url
      //   this.$emit('select', item, index ,url)
      // })
      if (!item.url) {
        return
      }
      this.$emit('select', item, index)
    }
  }
}
</script>

<style scoped>
#song-list {
  height: 100%;
  background-color: #fff;
}
.song-item {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 50px;
}

.order {
  flex: 10%;
  font-size: 15px;
  color: #999999;
  text-align: center;
  line-height: 50px;
}

.song-info {
  position: relative;
  flex: 80%;
  /* border-bottom: 1px solid #eee; */
  padding-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.song-name {
  position: absolute;
   left: 0;
  top: 8px;
  font-size: 15px;
  font-weight: 500;
  width: 100%;
  padding-right: 36px;
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
}
.singer {
  position: absolute;
  left: 0;
  top: 32px;
  font-size: 10px;
  color: #999999; 
}
.song-info .mv {
  position: absolute;
  right: 10px; 
  bottom: 10px;
  height: 30px;
}
.song-info .mv img {
  width: 22px;
  height: 22px;
}

.search-content {
  line-height: 36px;
  font-size: 14px;
  color: skyblue;
  margin-left: 20px;
  border-bottom: 1px solid #eee;
}
</style>