<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item" v-if="user">
                  <a class="nav-link disabled" href="">Your Feed</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="">Global Feed</a>
                </li>
              </ul>
            </div>

            <div
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <!-- 此nuxt-link为用户信息数据 -->
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  ><img :src="article.author.image"
                /></nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="{
                      name: 'profile',
                      params: {
                        username: article.author.username,
                      },
                    }"
                    class="author"
                    >{{ article.author.username }}</nuxt-link
                  >
                  <span class="date">{{ article.createdAt }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{
                    active: article.favorited,
                  }"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link
                :to="{
                  name: 'posts',
                  params: {
                    slug: article.slug,
                  },
                }"
                class="preview-link"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>

            <nav>
              <ul class="pagination">
                <li
                  class="page-item"
                  :class="{
                    active: $route.query.offset
                      ? item === $route.query.offset
                      : item === 1,
                  }"
                  v-for="(item, index) in pageData"
                  :key="index"
                >
                  <nuxt-link
                    :to="{
                      name: 'home',
                      query: {
                        page: item,
                      },
                    }"
                    class="page-link"
                    >{{ item }}</nuxt-link
                  >
                </li>
              </ul>
            </nav>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <a href="" class="tag-pill tag-default">programming</a>
                <a href="" class="tag-pill tag-default">javascript</a>
                <a href="" class="tag-pill tag-default">emberjs</a>
                <a href="" class="tag-pill tag-default">angularjs</a>
                <a href="" class="tag-pill tag-default">react</a>
                <a href="" class="tag-pill tag-default">mean</a>
                <a href="" class="tag-pill tag-default">node</a>
                <a href="" class="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { articleList } from '@/api/posts'
export default {
  name: 'HomePage',
  async asyncData ({ query }) {
    console.log('执行asyncData...')
    let limit = 10
    // let offset = query.offset || 1
    let offset = (query.page - 1) * limit // 这是跳过的数量
    // 现在一个有10个，第一页limit是10， offset是0， 
    // 如果第二页，那么limit是10， offset是10
    // 也就是 第n页 就是 (n-1)*limit
    const { data: { articles, articlesCount } } = await articleList({
      limit,
      offset
    })

    return {
      articles,
      articlesCount,
      limit,
      offset
    }
  },
  computed: {
    ...mapState(['user']),
    pageData () {
      let arr = []
      let num = Math.floor(this.articlesCount / this.limit)
      for (let i = 1; i <= num; i++) {
        arr.push(i)
      }
      return arr
    }
  }
}
</script>
<style>
</style>
