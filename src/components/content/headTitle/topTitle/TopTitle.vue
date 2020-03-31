<template>
  <div class="song-title">
    <span>{{titles[0]}}</span>
    <btn class="btn">{{titles[1]}}</btn>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.song-title {
  padding: 15px 0;
}

.song-title span {
  font-weight: 700;
}
.song-title .btn {
  float: right;
  outline: none;
  border: 1px solid #666;
  padding: 3px 7px;
  font-size: 10px;
  border-radius: 10px;
  color: #666;
  background-color: #fff;
}
</style>