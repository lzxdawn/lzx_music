<template>
  <div id="home" >
    <!-- 顶部navbar -->
    <dc-nav-bar
      @searchFocus="searchFocus"
      @searchInput="searchInput"
      @searchOff="searchOff"
      :off="isShow"
      :inputValue="searchValue"
    />
    <!-- BSrcoll滚动区域 -->
    <scroll v-show="!isShow" :data="mvList" class="content" ref="scroll">
      <!-- 轮播图 -->
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide  v-for="index in 5">
          <img :src="require(`@/assets/image/banner${index}.jpg`)" />
        </swiper-slide>
        <!-- <swiper-slide v-for="(item, index) in banners" :key="index">
          <img class="dc-banner" :src="item" alt="">
        </swiper-slide> -->
        <div class="swiper-pagination home-pagination" slot="pagination"></div>
      </swiper>

      <!-- 推荐歌单区域 -->
      <top-title :titles="['推荐歌单', '歌单广场']" />
      <recommend @songlistClick="songlistClick" :songList="songList" />
      <!-- 精选mv区域 -->
      <top-title :titles="['MV精选', '更多MV']" />
      <mv-list :mvList="mvList" />
    </scroll>
    <!-- 搜索区域 -->
    <scroll :data="hotSearchList || newSearchList" ref="searchBox" v-show="isShow" class="content" :pullUpLoad="true" @scrollToEnd="scrollToEnd">
      <hot-search v-if="!searchValue"  :hotSearchList="hotSearchList" @hotSongSearch="hotSongSearch"/>
      <song-list @select="select" :songList="newSearchList" :searchValue="searchValue">
        <div v-show="searchValue" class="search-content" slot="searchTitle">
          搜索 “{{searchValue}}”
        </div>
      </song-list>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import TopTitle from "components/content/topTitle/TopTitle";
import SongList from "components/content/songList/SongList";
import HotSearch from "components/content/hotSearch/HotSearch";

import Recommend from "./childCpns/recommend/Recommend";
import MvList from "./childCpns/mvList/MvList";
import DcNavBar from "./childCpns/dcNavbar/DcNavBar";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getBanner, getSongList, getMvList, searchSong, getHotSearch } from "../../network/discover";
import {addSongUrl} from 'network/song'

import { debounce } from "common/js/utils";

import {createSearch} from '../../common/js/song'

import { mapActions } from 'vuex';


export default {
  name: "Discover",
  components: {
    DcNavBar,
    swiper,
    swiperSlide,
    Recommend,
    MvList,
    Scroll,
    TopTitle,
    SongList,
    HotSearch
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".home-pagination",
          type: 'bullets',
          clickable: true
        },
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
		    centeredSlides: true,
		    paginationClickable: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      //轮播图
      banners: [],
      //歌单列表
      songList: [],
      //mv列表
      mvList: [],
      //搜索列表
      searchList: [],
      //搜索列表是否显示
      isShow: false,
      //搜索框内容
      searchValue: "",
      hotSearchList: [],
      searchPage: 0,
      searchReady: false,
      searchIndex: 0
    };
  },
  computed: {
    newSearchList() {
      return this.searchValue !== "" ? this.searchList : []
    }
  },
  created() {
    this._getSongList();
    this._getMvList("内地");
    // this._getBanner(2)
  },
  mounted() {
    this.$refs.scroll.refresh();
  },
  methods: {
    //-------------事件监听事件---------------
    ...mapActions([
      'selectPlay'
     ]),
    select(item, index) {
      this.searchIndex = index
      this.selectPlay({
         list: this.searchList,
         index
      })
    },
    scrollToEnd() {
      if(!this.searchValue) {
        return
      }
      if (!this.searchReady) {
        return
      }
      let page = this.searchPage + 1
      this.searchPage = page
      this._searchSong(this.searchValue, page, 'more')
      this.$refs.searchBox.refresh()  
      this.searchReady = false
    },
    searchFocus() {
      this.isShow = true;
      this._getHotSearch()
    },
    searchInput(iptValue) {
      if(this.searchValue === iptValue.trim()) {
        return
      }
      this.searchValue = iptValue.trim();
      
      if (this.searchValue === "") {
        this.searchList = [];
        return;
      }
      debounce(this._searchSong(iptValue), 300);
    },
    searchOff() {
      this.isShow = false;
      this.searchValue = ""
      this.searchList = []
      let value = ""
      this.$bus.$emit('hotClick', value)
      this.$refs.searchBox.scrollTo(0,0,0)
      this.$refs.searchBox.refresh()
    },
    hotSongSearch(item) {   
      if(item) {
        this.searchPage = 1
        let value = item.searchWord
        this.searchValue = value 
        this._searchSong(value)   
        this.$bus.$emit('hotClick', value)
      }      
    },
    //等songurl添加完 执行回调push到搜索列表
    addMore(more) {
      this.searchList.push(...more)
    },
    //根据歌单id获取歌单详情
    songlistClick(id) {
      this.$router.push({
        path: `/detail/${id}`,
        query: {id}
      })
    },
    //-------------网络请求事件---------------
    // banner
    _getBanner(type) {
      getBanner(type).then(res => {
        const bannerList = res.data.banners
        bannerList.forEach(item => {        
          this.banners.push(item.pic)
        })
      })
    },
    // 请求推荐歌单列表
    _getSongList() {
      getSongList().then(res => {
        const data = res.data.result;
        this.songList = data;
      });
    },
    // 请求MV精选列表
    _getMvList(area) {
      getMvList(area).then(res => {
        this.mvList = res.data.data;
      });
    },
    // 搜索请求
    _searchSong(keywords,page, more) {
      searchSong(keywords, page).then(res => {
        let songData = res.data.result.songs
        if(!songData) {
          return
        }
        if(more) {   
          let morelist = []  
          songData.forEach(item => {
            morelist.push(createSearch(item))
          })
          addSongUrl(morelist, this.addMore(morelist))
             
        } else {
          this.searchList = []
          this.searchPage = 1
          let songlist = []
          songData.forEach(item => {
            songlist.push(createSearch(item))
          })   
          this.searchList = songlist
          this.$refs.searchBox.scrollTo(0,0,0) 
           //添加songURL
          addSongUrl(this.searchList)       
        }
        setTimeout(() => {
          this.$refs.searchBox.refresh()
          this.searchReady = true
        }, 100);
      });
    },
    //热门搜索
    _getHotSearch() {
      getHotSearch().then(res => {
        this.hotSearchList = res.data.data
      })
    },
    //歌单id获取歌单详情
    _getListDetail(id) {
      getListDetail(id).then(res => {
        this.songListDetail = res.data.playlist
      })
    }
  }
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}

.swiper img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
}

.zindex {
  position: relative;
  z-index: 999;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 10px;
}
</style>