<template>
  <div class="detail-nav">
    <nav-bar class="nav-bar">
      <div class="left" slot="left" @click="backto">
        <img src="~assets/image/back.png" alt="">
      </div>
      <div slot="center"  class="center">{{navtitle}}</div>
      <div slot="right" class="right">
        <img src="~assets/image/ph.png" alt="">
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  props: {
    navtitle: {
      type: String,
      default: "歌单"
    }
  },
  components: {
    NavBar
  },
  data() {
    return {
     
    }
  },
  methods:{
    backto() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.detail-nav {
  background: rgba(255, 255, 255, .1);
  height: 100%;
  
}

.nav-bar {
  padding: 0 12px;
}

.left {
  width: 22px;
  height: 22px;
  line-height: 50px;
}

.left img {
  width: 100%;
  height: 100%;
}
.center {
  position: relative;
  width: 150px;
  text-align: center;
  margin: auto;
  font-size: 16px;
  color: #fff;
  z-index: 999;
  overflow: hidden;
  white-space: nowrap;
}

.right {
  width: 22px;
  height: 22px;
  line-height: 50px;
}
.right img {
  width: 100%;
  height: 100%;
}
</style>