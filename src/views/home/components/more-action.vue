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
      <van-cell v-for="item in reports" :key="item.value" @click="reportArticel(item.value)">{{item.label}}</van-cell>
    </van-cell-group>
  </van-popup>
</template>

<script>
// 不感兴趣后台接口
import { disLikeById, reportById } from '@/api/article'
// 导入举报类型数据
import { reports } from '@/utils/const'
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
      isReport: false,
      // 举报类型
      reports
    }
  },
  methods: {
    // 举报文章
    // type举报类型
    async reportArticel (type) {
      try {
        await reportById(this.articleId, type)
        this.$toast.success('举报成功')
        // 使用自定义事件:通知父组件删除举报的文章
        this.$emit('on-report')
        // 关闭弹出层:修改父组件控制显示隐藏数据
        this.$emit('input', false)// 固定写法 input:false
      } catch (error) {
        console.log(error)
        this.$toast.success('举报失败')
      }
    },
    // 对文章不感兴趣
    async dislike () {
      try {
        // 后台不感兴趣
        await disLikeById(this.articleId)
        // 接口调用成功会往下执行
        this.$toast.success('操作成功')
        // 前端需要把不感兴趣的文章从列表删除:需要通知父组件删除对应的文章
        // 使用自定义事件
        this.$emit('on-dislike')
        // 关闭弹出层:修改父组件控制显示隐藏数据
        this.$emit('input', false)// 固定写法 input:false
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
