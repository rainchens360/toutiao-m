<template>
  <div>
    <h1>插槽用法</h1>
    <!-- 显示默认插槽 -->
    <div>
      <slot />
    </div>
    <!-- 显示具名插槽 -->
    <div>
      <slot name="mn1" />
       <slot name="mn2" />
        <slot name="mn3" />
    </div>
    <!-- 作用域插槽 -->
           <slot name="mn4" :user="user" :abc="abc">
              <h3>{{user.name}}</h3>
           </slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      abc: 123,
      user: { name: '小红', age: 18 }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
