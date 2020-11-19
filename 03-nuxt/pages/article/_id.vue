<template>
  <div>
      <h2>{{ title }}</h2>
      <p>{{ body }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData(context) {
    // 上下文对象 context
    const { data } = await axios.get('http://localhost:3000/abc/data.json')
    const id = context.params.id
    const findArticle = data.posts.find(item => item.id === Number(id))
    return findArticle
  }
}
</script>

<style>

</style>
