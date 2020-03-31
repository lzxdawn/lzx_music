<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right" @click="playmusic"><slot name="right"></slot></div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
  export default {
    name: "NavBar",
    methods: {
      playmusic() {
        this.setFullscreen(true)
      },
      ...mapMutations({
        setFullscreen: 'SET_FULL_SCREEN'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    position: relative;
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
    z-index: 666;
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>
