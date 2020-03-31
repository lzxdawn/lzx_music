<template>
  <div class="tab-control">
    <div v-for="(item,index) in tabTitles" class="tab-item" :key="index">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  props:{
    tabTitles: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>