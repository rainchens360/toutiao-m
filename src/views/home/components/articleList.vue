<template>
  <div
    class="scroll-wrapper"
    ref="alist"
    @scroll="remPos"
  >
    <!-- 文章列表 -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了..."
        @load="loadPage"
      >
        <!-- 文章列表的item内容 -->
        <van-cell
          v-for="item in list"
          :key="item.art_id.toString()"
        >
          <div class="article_item">
            <!-- 文章title -->
            <h3 class="van-ellipsis">{{item.title}}</h3>
            <!-- 文章封面图 -->
            <div
              class="img_box"
              v-if="item.cover.images.length"
            >
              <van-image
                :class="item.cover.type===1?'w100':'w33'"
                fit="cover"
                lazy-load
                v-for="(img,i) in item.cover.images"
                :key="i"
                :src="img"
              >
                <template v-slot:error>加载失败！</template>
                <!-- 图片加载 -->
                <template v-slot:loading>
                  <van-loading
                    type="spinner"
                    size="20"
                  />
                </template>
              </van-image>
            </div>
            <div class="info_box">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{item.pubdate|relTime}}</span>
              <span
                v-if="$store.state.user.token"
                class="close"
                @click="openMore(item.art_id.toString())"
              >
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <!-- 更多操作弹出层 -->
    <MoreAction v-model="isShowMore" :articleId = "articleId" @on-dislike="delArtcile" @on-report="delArtcile"/>
    <!-- <MoreAction
      :value="isShowMore"
      @input="isShowMore=$event"
    /> -->
  </div>
</template>

<script>
import { getArticlesById } from '../../../api/article'
// 导入更多操作子组件
import MoreAction from './more-action'
export default {
  components: {
    MoreAction
  },
  props: {
    // 获取文章列表=》需要的参数
    channelId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 列表数据
      list: [],
      // 列表加载状态 => 每次加载分页数据的时候要把它改成true=》加载完改成false
      loading: false,
      // 列表数据是否加载完成
      finished: false,
      // 刷新是否完成状态
      refreshing: false,
      // 获取新闻列表分页的时间戳
      timestamp: +new Date(),
      // 列表滚动高度
      scrollTop: 0,
      // 控制更多操作弹出层显示隐藏
      isShowMore: false,
      // 当前更多操作的文章ID
      articleId: ''
    }
  },
  methods: {
    // 对文章不感兴趣自定义事件,从列表删除对应的文章
    delArtcile () {
      console.log('来自子组件的通知,从列表删除对应的文章')
      // 1获取当前被删除文章的索引值
      // 2使用splice删除当前文章
      const i = this.list.findIndex((item) => item.art_id.toString() === this.articleId)
      this.list.splice(i, 1)
    },
    // 打开更多操作弹出
    /**
     * id 当前点击的文章ID
     */
    openMore (id) {
      console.log(id)
      this.articleId = id
      this.isShowMore = true
    },
    // 列表滚动回调
    remPos (e) {
      // console.log(e.target.scrollTop)
      // 存储阅读记忆需要的滚动高度
      this.scrollTop = e.target.scrollTop
    },
    // 执行阅读记忆滚动方法
    scrollPos () {
      this.$nextTick(() => {
        this.$refs.alist.scrollTop = this.scrollTop
      })
    },
    // 执行：1. 默认会执行，加载首屏数据 2. 列表滑动到底部执行
    async loadPage () {
      // await this.$sleep(2000)
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 后期这里=》替换成请求文章列表的后台接口
      if (this.refreshing) {
        // 如果是刷新=》 清空之前加载的数据
        this.list = []
        // 关闭刷新状态
        this.refreshing = false
      }
      // 造数据
      // for (let i = 0; i < 10; i++) {
      //   this.list.push(this.list.length + 1)
      // }
      // 获取列表数据
      const { data } = await getArticlesById(this.channelId, this.timestamp)
      // console.log(data.results)
      // 向列表中追加数据
      this.list.push(...data.results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成=>data.pre_timestamp返回null，表明后台没数据了
      if (!data.pre_timestamp) {
        this.finished = true
      } else {
        // 更新分页数据
        this.timestamp = data.pre_timestamp
      }
    },
    // 下拉刷新执行
    onRefresh () {
      console.log('开始刷新：', this.refreshing)
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      // 更新分页时间戳为=》当前最新时间
      this.timestamp = +new Date()
      this.loadPage()
    }
  }
}
</script>

<style lang="less" scoped>
// 文章列表item样式
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
