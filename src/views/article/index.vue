<template>
  <div class='container'>
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'articleDetail',
  created () {
    console.log('article组件被创建了！')
  }
}
</script>

<style scoped lang='less'></style>
