<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article"></article-meta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      <hr />
      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comment :article="article"></article-comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/posts";
import articleMeta from "./components/article-meta";
import MarkdownIt from "markdown-it";
import ArticleComment from './components/article-comment.vue';

export default {
  name: "postsIndex",
  async asyncData({ params, redirect }) {
    const { slug } = params;
    if (!slug) {
      redirect("/");
      return;
    }
    const {
      data: { article },
    } = await getArticle(slug);
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article,
    };
  },
  components: {
    articleMeta,
    ArticleComment
  },
  // 给个性化页面设置head。
  head() {
    return {
      title: `${this.article.title} -- RealWorld`,
      meta: [
        {hid: 'description', name: 'description', content: this.article.description}
      ]
    }
  },
};
</script>

<style></style>
