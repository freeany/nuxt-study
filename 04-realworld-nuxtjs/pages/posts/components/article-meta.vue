<template>
  <div class="article-meta">
    <a href=""><img :src="article.author.image" /></a>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <span v-if="article.author.username !== user.username">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
          active: article.author.following,
        }"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{
          article.author.following
            ? "Unfollow " + article.author.username
            : "Follow " + article.author.username
        }}<span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited,
        }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post <span class="counter">(29)</span>
      </button>
    </span>
    <span v-else>
      <span ng-show="$ctrl.canModify" class="ng-scope">
        <a
          class="btn btn-outline-secondary btn-sm"
          ui-sref="app.editor({ slug: $ctrl.article.slug })"
          href="#/editor/markdown-a47rs6"
        >
          <i class="ion-edit"></i> Edit Article
        </a>

        <button
          class="btn btn-outline-danger btn-sm"
          ng-class="{disabled: $ctrl.isDeleting}"
          ng-click="$ctrl.deleteArticle()"
        >
          <i class="ion-trash-a"></i> Delete Article
        </button>
      </span>
    </span>
  </div>
</template>

<script>
// markdown-a47rs6
import { mapState } from 'vuex'
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style>
</style>
