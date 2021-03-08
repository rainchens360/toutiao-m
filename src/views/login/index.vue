<template>
  <div class="page-user-login">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="登录"
    ></van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
  <van-field
    v-model="formData.mobile"
    name="mobile"
    label="手机号"
    placeholder="手机号"
    :rules="[{ pattern, message: '请输入正确手机号' }]"
  />
  <van-field
    v-model="formData.code"
    name="code"
    label="验证码"
    placeholder="验证码"
    :rules="[
      { required: true, message: '请填写验证码' },
      { validator:checkCode, message: '请输入正确的验证码' }
    ]"
  >
   <template slot="button">
    <van-button size="small" native-type="button" type="primary">发送验证码</van-button>
  </template>
  </van-field>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
// import VanTest from '@/components/Test'
// 导入登录接口
import { login } from '../../api/user'
import { mapMutations } from 'vuex'
export default {
  // components: {
  //   VanTest
  // },
  data () {
    return {
      pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      // 登录表单数据
      formData: {
        mobile: '13611111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 映射存储token方法
    ...mapMutations(['setUser']),
    // 函数校验验证码的长度
    /**
     * val 校验用户输入的值
     * 通过返回true/false 表明是否校验通过
     */
    checkCode (val) {
      if (val.length !== 6) return false
      return true
    },
    // 执行时机=》只有在表单所有项校验通过后才会执行submit
    async onSubmit (values) {
      console.log('submit', values)
      /**
       * 1. 获取表单数据=》values
       * 2. 调用封装的login接口方法
       * 3. 拿到token=》存到vuex
       * 4. 判断路由参数中是否携带=》上次访问页面参数
       */
      try {
        const { data } = await login(values)
        console.log(data)
        this.setUser(data)
        // 提示
        this.$toast.success('登录成功！')
        this.$router.replace(this.$route.query.redirectUrl || '/user')
      } catch (error) {
        this.$toast.fail('登录失败！')
        console.warn(error)
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
