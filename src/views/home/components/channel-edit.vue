<template>
  <!-- @closed="editing=false" 关闭屉式菜单  重置编辑状态为不编辑 -->
  <van-action-sheet
    :value="value"
    @closed="editing=false"
    @input="$emit('input', $event)"
    title="编辑频道"
  >
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
        <!-- 我的频道 -->
        <van-grid-item v-for="(item,i) in myChannels" :key="item.id">
          <!-- 显示删除的叉号：推荐不能删除 -->
          <span class="f12" :class="{red: activeIndex === i}" >{{item.name}}</span>
          <van-icon v-show="editing && i!==0" class="btn" name="cross"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <!-- 可选频道 -->
        <van-grid-item v-for="index in 8" :key="index">
          <span class="f12">频道{{index}}</span>
          <van-icon class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </van-action-sheet>
</template>
<script>
// 获取所有频道数据
import { getAllChannels } from '@/api/channel'
export default {
  props: {
    // 打开/关闭的状态
    value: {
      type: Boolean,
      default: false
    },
    myChannels: {
      type: Array,
      // 默认值如果是对象、数组等复杂数据类型时,需要包一个函数，通过函数返回这个默认值;简单类型不需要
      default: () => []
    },
    // 当前选中的频道索引
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 编辑状态
      editing: false,
      // 所有频道数据
      allChannels: []
    }
  },
  computed: {
    // 可选频道数据：我的频道选剩下的数据
    // 可选频道数据 = 所有频道数据 - 我的频道数据
    // 根据条件排除一些数据：数据的filter方法
    optChannels () {
      // 保留所有频道的部分数据
      return this.allChannels.filter((all) => {
        // 根据条件排除：all在我的频道有：不要当前all这个数据:相反保留all
        return this.myChannels.some((my) => my.id === all.id)
      })
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    // 获取所有频道数据
    async getAll () {
      const { data: { channels } } = await getAllChannels()
      // console.log(data)
      this.allChannels = channels
    }
  }
}
</script>
<style lang="less" scoped>
.van-popup--bottom {
  &.van-popup--round {
    border-radius: 0;
  }
}
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close,
    .van-action-sheet__close {
      color: #fff;
    }
  }
}
.channel {
  padding: 10px;
  .tit {
    line-height: 3;
    text-align:left;
    .tip {
      font-size: 10px;
      color: #999;
    }
  }
  .van-button {
    float: right;
    margin-top: 7px;
  }
  .btn {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #ddd;
    font-size: 12px;
    color: #fff;
  }
  .f12 {
    font-size: 12px;
    color: #555;
  }
  .red {
    color: red;
  }
}
</style>
