<template>
  <div>
    <h2>{{title}}</h2>
    <ul>
      <li v-for="item in posts" :key="item.id">
        <nuxt-link :to="'article/'+item.id">{{item.title}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData() {
    const { data: {posts,title} } = await axios.get('http://localhost:3000/abc/data.json')
    return {
      posts,
      title
    }
  }
}
</script>

<style>

</style>
