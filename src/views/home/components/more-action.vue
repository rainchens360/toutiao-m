<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    @open="isReport=false"
  >
    <van-cell-group v-if="!isReport">
      <van-cell @click="dislike" icon="closed-eye">不感兴趣</van-cell>
      <van-cell
        is-link
        @click="isReport=true"
      >反馈垃圾内容</van-cell>
      <van-cell icon="info-o">拉黑作者</van-cell>
    </van-cell-group>
    <!-- 反馈垃圾内容对应的反馈类型 -->
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
// 不感兴趣后台接口
import { disLikeById } from '@/api/article'
export default {
  props: {
    // 控制显示隐藏
    value: {
      type: Boolean,
      default: false
    },
    // 当前文章ID
    articleId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 是否显示上报垃圾内容
      isReport: false
    }
  },
  methods: {
    // 对文章不感兴趣
    async dislike () {
      try {
        // 后台不感兴趣
        await disLikeById(this.articleId)
        // 接口调用成功会往下执行
        this.$toast.success('操作成功')
        // 前端需要把不感兴趣的文章从列表删除
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
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
