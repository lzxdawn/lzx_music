<template>
  <div id="hot-search">
    <div class="hot-title">热搜榜</div>
    <div class="hot-item" @click="hotClick(item)" v-for="(item, index) in hotSearchList" :key="index">
      <div class="order" :class="active(index)" >{{index + 1}}</div>
      <div class="hot-info">     
        <div class="hot-name">
          {{item.searchWord}}  
          <img :src="item.iconUrl ? item.iconUrl : ''" alt="">
        </div>
        <div class="hot-content">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotSearchList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    active(index) {
      return function(index) {
        return index < 4 ? 'active' : ''
      }
    }
  },
  methods: {
    hotClick(item) {
      this.$emit('hotSongSearch', item)
    }
  }
}
</script>

<style scoped>
#hot-search {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100%;
}
.hot-item {
  flex: 46%;
  display: flex;
  height: 60px;
  padding: 8px 5px;
  overflow: hidden;
}
.hot-item>.order {
  width: 30px;
  font-size: 15px;
  text-align: center;
  line-height: 60px;
}
.hot-item>.hot-info {
  position: relative;
  flex: 1;
  line-height: 30px;
}
.hot-name {
  font-size: 13px;
}
.hot-name img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-bottom: 5px;
}
.hot-content {
  font-size: 10px;
  color: #999;
}
.hot-title {
  width: 100%;
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 600;
}

.active {
  color: #E76736;
}
</style>