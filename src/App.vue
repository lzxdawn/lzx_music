<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <loading v-show="this.$store.state.isLoading"/>
    <main-tab-bar v-if="$route.meta.footShow"/>
    <Player/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
import Loading from 'components/common/loading/Loading'
import Player from 'components/content/player/Player'
export default {
  name: 'App',
  components: {
    MainTabBar,
    Loading,
    Player
  }
}
</script>

<style>
@import './assets/css/base.css';
</style>
