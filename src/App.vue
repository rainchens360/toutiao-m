<template>
  <div id="app">
    <!-- 路由挂载点 -->
    <keep-alive include="layout,articleDetail">
      <router-view />
    </keep-alive>
    <!-- 测试组件库是否引入成功 -->
    <!-- <div>
      <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
      />
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <div class="test">
        <p style="width:80px;height:80px">rem适配注意事项</p>
      </div>
    </div> -->
  </div>
</template>

<style lang="less">
// .test {
//   width: 100px;
//   height: 100px;
//   border: 2px solid #fd19;
//   background: orange;
//   color: #fff;
// }
</style>
