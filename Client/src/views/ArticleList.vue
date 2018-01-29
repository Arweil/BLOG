<template>
  <ul class="list-unstyled" v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="150">
    <li v-for="item in articleList" v-bind:key="item.id" v-on:click="goToArticle(item.id)">
      <h2 class="title">{{item.title}}</h2>
      <i class="iconfont icon-calendar time">{{item.time}}</i>
      <div class="desc">
        <img class="mr-2" v-bind:src="item.descImg" v-if="item.descImg" >
        <span>{{item.desc}}</span>
      </div>
      <hr>
      <div class="footer">
        <div class="tags">
          <span class="label label-primary" v-for="(tag, index) in item.tags" v-bind:key="index" v-on:click.stop="goToTags(tag)">{{tag}}</span>
        </div>
        <div class="readmore">Continue reading >></div>
      </div>
    </li>
  </ul>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'blog-articleList',
    data () {
      return {
        loading: true,
        pageIndex: 1
      }
    },
    computed: {
      ...mapState({
        articleList: state => state.article.articleList
      })
    },
    methods: {
      getArticleList () {
        this.$store.dispatch('getArticleList', { pageIndex: this.pageIndex })
          .then(() => {
            this.loading = false
          })
      },
      goToArticle (id) {
        this.$router.push({ name: 'Article', query: { id } })
      },
      goToTags (tag) {
        this.$router.push({ name: 'Tags', query: { tag } })
      },
      loadMore () {
        this.loading = true
        this.$store.dispatch('getArticleList', { pageIndex: this.pageIndex + 1 })
          .then(() => {
            this.pageIndex++
            this.loading = false
          }, () => {
            this.loading = true
          })
      }
    },
    mounted () {
      this.getArticleList()
    },
    beforeRouteUpdate (to, from, next) {
      this.getArticleList()
      next()
    }
  }
</script>

<style lang="less" scoped>
  @media (max-width: 991px) {
    ul {
      margin: 70px 0 20px !important;
    }
    li {
      .footer {
        display: block !important;
        .readmore {
          margin-top: 10px;
          text-align: right;
        }
      }
    }
  }

  ul {
    margin: 40px 60px;
  }

  li {
    background-color: #fff;
    padding: 20px 30px;
    box-shadow: 3px 2px 20px rgba(0,0,0,0.07);
    margin-bottom: 20px;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      box-shadow: 10px 8px 50px rgba(0, 0, 0, 0.07);
    }

    .title {
      margin: 0px;
      font-size: 26px;
      line-height: 36px;
      letter-spacing: -1px;
    }

    .time {
      display: block;
      font-size: 12px;
      color: #aaa;
      min-width: 114px;
      margin-bottom: 16px;
      &:before {
        margin-right: 5px;
      }
    }

    .desc {
      display: flex;
      align-items: flex-start;
      img {
        width: 100px;
      }
    }

    .label {
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .readmore {
        color: #337ab7;
      }
    }
  }

  hr {
    margin: 7px 0;
  }

  .mb-2 {
    margin-bottom: 20px;
  }
</style>
