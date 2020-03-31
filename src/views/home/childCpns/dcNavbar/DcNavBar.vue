<template>
  <div class="dc-navbar">
    <nav-bar class="nav-bar">
        <div slot="left" class="left">
          <img src="~assets/image/huatong.png" alt="">
        </div>
        <div slot="center">
          <input v-model="iptValue" @focus="iptFocus" @input="iptInput" ref="ipt1" class="ipt" type="text" placeholder="搜索歌曲、歌手、专辑">
        </div>
        <div slot="right" class="right">
          <img v-show="!off" :src="require(`@/assets/image/${isPlaying}`)" alt="">
          <div @click.stop="offClick" class="off" v-show="off">取消</div>
        </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
export default {
  props: {
    off: {
      type: Boolean,
      default: false
    },
    hotValue: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters([
      'playing'
    ]),
    isPlaying() {
      return this.playing ? 'playing.gif' : 'ph.png'
    }
  },
  components: {
    NavBar
  },
  data() {
    return {
      iptValue: ""
    }
  },
  mounted() {
    this.$bus.$on('hotClick', (value) => {
      this.iptValue = value
    })
  },
  methods: {
    iptFocus() {
      // console.log('okk')
      this.$emit('searchFocus')
    },
    iptInput() {
      this.$emit('searchInput', this.iptValue)
    },
    offClick() {
      this.$emit('searchOff')
    }
  }
}
</script>

<style scoped>
.nav-bar {
  background: #212121;
}

.ipt {
  width: 100%;
  outline: none;
  border: none;
  border: solid 1px #eee;
  border-radius: 15px;
  padding: 3px;
  background-color: #EBECEC;
  text-align: center;
  font-size: 14px;
}
input::-webkit-input-placeholder {
    color: #D3CCC9;
    font-size: 13px;
}
.left {
  line-height: 65px;
}
.left img {
  width: 30px;
  height: 30px;
}

.right {
  line-height: 55px;
}

.right img {
  width: 22px;
  height: 22px;
}

.off {
  font-size: 15px;
  color: #fff;
  line-height: 44px;
}
</style>