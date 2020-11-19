<template>
  <div id="app">
    <h1>{{title}}</h1>
    <ul>
      <li v-for="item in posts" :key="item.title">
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {

  },
  async asyncData() {
    const { data } = await axios.get('http://localhost:3000/data.json')
    // console.log(data)
    return data
    /**
      posts: [
      ],
      title: '时事新闻'
    */
  }

}
</script>

<style>

</style>
