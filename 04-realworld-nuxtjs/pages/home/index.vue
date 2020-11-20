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
                  <nuxt-link
                    class="nav-link"
                    :class="{ active: tab === 'my_feed' }"
                    exact
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'my_feed',
                      },
                    }"
                    >Your Feed</nuxt-link
                  >
                </li>
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{ active: tab === 'global_feed' }"
                    exact
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'global_feed',
                      },
                    }"
                    >Global Feed</nuxt-link
                  >
                </li>

                <li class="nav-item" v-if="tag">
                  <nuxt-link
                    class="nav-link"
                    :class="{ active: tab === tag }"
                    exact
                    :to="{
                      name: 'home',
                      query: {
                        tab: tag,
                        tag: tag,
                      },
                    }"
                    >#{{ tag }}</nuxt-link
                  >
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
                  <span class="date">{{
                    article.createdAt | date("MMM DD, YYYY")
                  }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{
                    active: article.favorited,
                  }"
                  @click="favorit(article)"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <!-- 此nuxt-link是posts 数据 -->
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
                    active: Number($route.query.page)
                      ? item === Number($route.query.page)
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
                        tab: $route.query.tab,
                        tag: $route.query.tag,
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
                <nuxt-link
                  v-for="tag in tagsResult"
                  :key="tag"
                  :to="{
                    name: '',
                    query: {
                      tag: tag,
                      tab: tag,
                    },
                  }"
                  class="tag-pill tag-default"
                  >{{ tag }}</nuxt-link
                >
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
import { articleList, articleFeedList, favorite, unfavorite } from '@/api/posts'
import { getTags } from '@/api/tags'
export default {
  name: 'HomePage',
  async asyncData ({ query }) {
    const { page, tag, tab } = query
    let limit = 10
    // let offset = query.offset || 1
    let offset = page && (page - 1) * limit // 这是跳过的数量
    // 现在一个有10个，第一页limit是10， offset是0，
    // 如果第二页，那么limit是10， offset是10
    // 也就是 第n页 就是 (n-1)*limit
    // 可以对比下时间
    // 2.7s左右
    // const {
    //   data: { articles, articlesCount },
    // } = await articleList({
    //   limit,
    //   offset,
    //   tag,
    // });

    // const {
    //   data: { tags },
    // } = await getTags();

    // 1.6s左右
    // 区分是获取我关注的人写的文章还是全部文章
    const loadArticle = tab === 'my_feed' ? articleFeedList : articleList
    const [articleListResult, getTagsResult] = await Promise.all([
      loadArticle({
        limit,
        offset,
        tag
      }),
      getTags()
    ])
    // 解构promise.all的结果
    const {
      data: { articles, articlesCount }
    } = articleListResult
    const {
      data: { tags }
    } = getTagsResult
    //--
    const tagsResult = tags.filter(tag => !!tag)
    return {
      articles,
      articlesCount,
      limit,
      offset,
      tagsResult,
      tag,
      tab: tab || 'global_feed' // 在页面上使用
    }
  },
  watchQuery: ['page', 'tag', 'tab'], // 监听路由中query对象中的page。
  computed: {
    ...mapState(['user']),
    pageData () {
      let arr = []
      let num = Math.ceil(this.articlesCount / this.limit)
      return num
    }
  },
  methods: {
    async favorit (article) {
      console.log(article, '....xxxx')
      if (article.favorited) {
        // 取消点赞
        await favorite(article.slug)
        article.favoritesCount -= 1
      } else {
        // 去点赞
        await unfavorite(article.slug)
        article.favoritesCount += 1
      }
      article.favorited = !article.favorited
    }
  }
}
</script>
<style></style>
