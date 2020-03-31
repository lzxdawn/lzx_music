<template>
  <div class="mv-list">
    <div class="mv-item" v-for="(item, index) in mvList">
      <div class="mv-img">
        <img :src="item.cover" alt="">
      </div>
      <div class="mv-info">
        <div class="mv-name">{{item.name}}</div>
        <div class="play-count">🔥{{item.playCount | million}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    million:function (value){//过万处理
        let num;
      if(value > 9999){//大于9999显示x.xx万
          num=(Math.floor(value/1000)/10) + '万';
      }else if( value < 9999 && value>-9999){
        num=value
      }else if(value<-9999){//小于-9999显示-x.xx万
          num = -(Math.floor(Math.abs(value)/1000)/10)+'万'
      }
      return num;
  }
  },
  props: {
    mvList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.mv-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.mv-item {
  /* width: 146px; */
  width: 49%;
  position: relative;
  margin-top: 10px;
}

.mv-img img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
}

.mv-info {
  font-size: 13px;
  overflow: hidden;
  line-clamp: 2;
  box-orient: vertical;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.mv-name {
  text-align: center;
  font-size: 12px;
}
.play-count {
  position: absolute;
  right: 10px;
  top: 0;
  padding: 5px 2px;
  text-align: right;
  font-size: 10px;
  color: #d0d0d0;
}
</style>