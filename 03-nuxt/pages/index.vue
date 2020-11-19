<template>
  <div>
    <h1>This is homePage</h1>
    <p>asyncData: {{title}}</p>
    <nuxt-link to="/about">去about页面</nuxt-link>
    <br />
    <nuxt-link to="/article">去article页面</nuxt-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'homePage',
  async asyncData() {
    console.log('asyncData被调用...')
    const { data } = await axios.get('http://localhost:3000/abc/data.json')
    return data
  },
  created() {
    console.log('created..')
  },
  mounted() {
    console.log('mounted..')
  }
}
</script>

<style>

</style>
