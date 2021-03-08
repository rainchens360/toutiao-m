<template>
  <div id="app">
    <!-- 路由挂载点 -->
    <keep-alive include="layout,articleDetail">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
</style>
