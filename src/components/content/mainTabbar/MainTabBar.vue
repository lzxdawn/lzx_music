<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/image/cm2_btm_icn_discovery.png" alt="">
      <img slot="item-icon-active" src="~assets/image/cm2_btm_icn_discovery_prs.png" alt="">
      <div slot="item-text">发现音乐</div>
    </tab-bar-item>
    <tab-bar-item path="/video">
      <img slot="item-icon" src="~assets/image/cm2_btm_icn_radio.png" alt="">
      <img slot="item-icon-active" src="~assets/image/cm2_btm_icn_radio_prs.png" alt="">
      <div slot="item-text">视频</div>
    </tab-bar-item>
    <tab-bar-item path="/my-music">
      <img slot="item-icon" src="~assets/image/cm2_btm_icn_music.png" alt="">
      <img slot="item-icon-active" src="~assets/image/cm2_btm_icn_music_prs.png" alt="">
      <div slot="item-text">我的音乐</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/image/cm2_btm_icn_account.png" alt="">
      <img slot="item-icon-active" src="~assets/image/cm2_btm_icn_account_prs.png" alt="">
      <div slot="item-text">账号</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
