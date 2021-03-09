<template>
  <div class="container">
    <!-- <button @click="$router.push('/article/1')">detail</button> -->
    <!-- 文章分类栏 -->
    <van-tabs
      v-model="activeIndex"
      @change="changeTab"
      swipeable
    >
      <!-- 标签栏数据 -->
      <!-- 文章列表频道 -->
      <van-tab
        :key="item.id"
        v-for="(item,i) in channels"
        :title="item.name"
      >
        <!-- 可滚动内容区域=》和标签栏对应 -->
        <ArticleList
          :ref="'alist'+i"
          :channelId="item.id"
        />
      </van-tab>
    </van-tabs>
    <!-- 右侧图标 -->
    <span class="bar_btn" @click="isShowChannel=true">
      <van-icon name="wap-nav"></van-icon>
    </span>
    <!-- 频道管理 -->
    <ChannelEdit v-model="isShowChannel" />
  </div>
</template>

<script>
import { getMyChannels } from '../../api/channel'
// 导入文章列表组件
import ArticleList from './components/articleList'
// 导入频道管理组件
import ChannelEdit from './components/channel-edit'
export default {
  name: 'home-index',
  components: {
    ArticleList, ChannelEdit
  },
  data () {
    return {
      // 频道数据
      channels: [],
      // 当前被打开频道的索引
      activeIndex: 0,
      // 控制频道管理弹出是否显示
      isShowChannel: false

    }
  },
  // wacth和computed的使用场景
  // 1.computed中定义新数据依赖data中的数据:派生数据
  // 2.wacth监控this上数据变化:去做一些事
  // 处理refresh_token失效，回跳缓存不刷新问题
  watch: {
    '$store.state.user.token' () {
      console.log('refresh')
      this.getChannelList()
    }
  },
  // 组件被缓存后多了两个钩子
  // 执行：1. 第一次默认执行一次 2.缓存后每次重新进入会重复执行
  activated () {
    console.log('activated-进入了')
    /**
     * 1. 获取对应频道下列表组件的实例
     * 2. 调用实例滚动方法=》执行阅读记忆
     */
    this.$refs['alist' + this.activeIndex] && this.$refs['alist' + this.activeIndex][0].scrollPos()
  },
  deactivated () {
    console.log('deactivated-离开了')
  },
  created () {
    this.getChannelList()
    console.log('home-index组件被创建了')
  },
  methods: {
    // 点击切换标签栏执行
    changeTab (i) {
      console.log('当前切换的tab索引', i)
      this.$refs['alist' + i] && this.$refs['alist' + i][0].scrollPos()
    },
    // 获取新闻列表频道数据
    async getChannelList () {
      const { data: { channels: cn } } = await getMyChannels()
      console.log(cn)
      this.channels = cn
    }

  }
}
</script>

<style scoped lang='less'>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  // 自定义tab样式
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    // 控制列表区域可滚动
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  box-shadow: -6px -6px 8px #ddd;
}
</style>
