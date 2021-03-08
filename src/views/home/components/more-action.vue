<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    @open="isReport=false"
  >
    <van-cell-group v-if="!isReport">
      <van-cell icon="closed-eye">不感兴趣</van-cell>
      <van-cell
        is-link
        @click="isReport=true"
      >反馈垃圾内容</van-cell>
      <van-cell icon="info-o">拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell
        icon="arrow-left"
        @click="isReport=false"
      >返回</van-cell>
      <van-cell>侵权</van-cell>
      <van-cell>色情</van-cell>
      <van-cell>暴力</van-cell>
      <van-cell>低俗</van-cell>
      <van-cell>不适</van-cell>
      <van-cell>错误</van-cell>
      <van-cell>其他</van-cell>
    </van-cell-group>
  </van-popup>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 是否显示上报垃圾内容
      isReport: false
    }
  }
}
</script>

<style scoped lang='less'>
.van-popup {
  width: 80%;
  border-radius: 4px;
}
</style>
