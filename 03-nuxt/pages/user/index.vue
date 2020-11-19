<template>
  <div>
    <h1>User Page</h1>

    <!-- 测试路由导航 -->
    <h3>a标签， 刷新导航，走服务端渲染</h3>
    <a href="/">首页</a>

    <h3>nuxt-link，导航链接组件</h3>
    <nuxt-link to="/">首页</nuxt-link>

    <h3>编程式导航</h3>
    <button @click="handleRouter">首页</button>

  </div>
</template>

<script>
export default {
  name: "UserPage",
  methods: {
    handleRouter() {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
