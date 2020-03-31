<template>
  <div class="loading">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loading {
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  background: url('~assets/image/loading.gif') no-repeat;
  background-size: contain;
  transform: translate(-50%,-50%); 
  z-index: 999;
  width: 26px;
  height: 26px;
}
</style>