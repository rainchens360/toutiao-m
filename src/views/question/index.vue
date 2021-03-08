<template>
  <div class='container'>
    <van-skeleton
      title
      :row="3"
    />
    <van-skeleton
      title
      :row="3"
    />
    <van-skeleton
      title
      :row="3"
    />
  </div>
</template>

<script>
export default {
  name: 'question-index',
  created () {
    console.log('question-index组件被创建了')
  }
}
</script>

<style scoped lang='less'>
.van-skeleton {
  margin-top: 10px;
}
</style>
