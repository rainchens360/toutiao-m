<template>
  <div class='container'>
    <!-- 公共头部 -->
    <van-nav-bar
      v-if="isShowTop"
      fixed
      title="黑马头条"
      right-text="搜索"
      @click-right="onClickRight"
    />

    <!-- 中间路由切换区域（内容） -->
    <div
      class="my-wrapper"
      :class="{noTop: !isShowTop}"
    >
      <!-- 二级路由挂载点 -->
      <keep-alive include="home-index">
        <router-view />
      </keep-alive>
    </div>

    <!-- 底部：公共菜单 -->
    <van-tabbar route>
      <van-tabbar-item
        to="/"
        icon="home-o"
      >首页</van-tabbar-item>
      <van-tabbar-item
        to="/question"
        icon="search"
      >问答</van-tabbar-item>
      <van-tabbar-item
        to="/video"
        icon="video-o"
      >视频</van-tabbar-item>
      <van-tabbar-item
        to="/user"
        icon="contact"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  // 生命周期内只执行一次
  created () {
    console.log('layout组件被创建了')
  },
  computed: {
    // 不是我的页面=》显示公共头部
    isShowTop () {
      return this.$route.path !== '/user'
    }
  },
  methods: {
    onClickRight () {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop {
      // 我的页面top内边距是0
      padding-top: 0;
    }
  }
}
</style>
