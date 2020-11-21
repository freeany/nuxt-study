<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{comment.body}}
        </p>
      </div>
      <div class="card-footer">
        <a href="" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </a>
        &nbsp;
        <a href="" class="comment-author">{{comment.author.username}}</a>
        <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleComments } from "@/api/posts";
import { mapState } from 'vuex'
export default {
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
        comments: []
    };
  },
  computed: {
      ...mapState(['user'])
  },
  // 比如我这个评论的内容不需要进行seo
  mounted() {
      this.getCommentData()
  },
  methods: {
    async getCommentData() {
      const { slug } = this.article;
      const { data: {comments} } = await getArticleComments(slug);
    //   console.log(data)
    this.comments = comments
    },
  },
};
</script>
<style scoped>
</style>