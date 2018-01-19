<template lang="html">
  <div class="article" v-bind:class="id ? '' : 'skeleton'">
    <template v-if="id">
      <h1 class="title">{{ title }}</h1>
      <i class="iconfont icon-calendar time">{{ time }}</i>
      <i class="iconfont icon-tags tags">
        <span class="label label-primary" v-for="(tag, index) in tags" v-bind:key="index" v-on:click.stop="goToTags(tag)">{{tag}}</span>
      </i>
      <div class="art-body" v-html="ArticleContent"></div>
    </template>
    <template v-else>
      <h1 class="title"></h1>
      <i class="time"></i>
      <i class="tags"></i>
      <div class="art-body"></div>
    </template>
    <div id="gitments"></div>
  </div>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'
  import 'gitment/style/default.css'
  import Gitment from 'gitment'

  export default {
    name: 'blog-article',
    computed: {
      ...mapGetters(['ArticleContent']),
      ...mapState({
        id: state => state.article.curArticle.id,
        title: state => state.article.curArticle.title,
        time: state => state.article.curArticle.time,
        tags: state => state.article.curArticle.tags
      })
    },
    methods: {
      getArticle ({ title }) {
        this.$store.dispatch('getSingleArticleByTitle', { title })
      },
      goToTags (tag) {
        this.$router.push({ name: 'Tags', query: { tag } })
      }
    },
    destroyed () {
      this.$store.dispatch('clearArticle')
    },
    mounted () {
      this.getArticle({ title: this.$route.query.title })

      let clientId = ''
      let clientSecret = ''
      if (window.location.host.indexOf('gitee') > -1) {
        clientId = 'fd18d1966dfcc8594bcb'
        clientSecret = '5ab5f82d1e43e5a87442d2cacac8d112097daf30'
      } else {
        clientId = '97967852851cd7df9d9f'
        clientSecret = '584cc7869b08edd11ee48e0819359b2a2697e774'
      }
      const gitment = new Gitment({
        id: window.location.pathname,
        owner: 'Arweil',
        repo: 'Arweil.github.io',
        oauth: {
          client_id: clientId,
          client_secret: clientSecret
        }
      })
      gitment.render('gitments')
    }
  }
</script>

<style lang="less">
  .art-body {
    padding-bottom: 20px;
    margin: 60px 0 40px;
    line-height: 28px;
    color: #5d686f;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 1px;
    border-bottom: 1px solid #eef2f8;
    h1, h2, h3, h4, h5, h6 {
      color: #4a4a4a;
    }
    blockquote {
      font-size: 16px;
    }
  }
</style>
<style lang="less" scoped>
  @media (max-width: 991px) {
    .article {
      padding: 70px 0 20px !important;
    }
  }

  .article {
    padding: 30px 60px;
  }

  .title {
    letter-spacing: -1px;
    line-height: 54px;
    margin: 0;
  }

  .time, .tags {
    display: block;
    color: #aaa;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 10px;
    .label {
      cursor: pointer;
      margin-right: 10px;
    }
    &:before {
      margin-right: 10px;
    }
  }

  .skeleton {
    h1 {
      background: #FAFAFA;
      height: 40px;
      margin: 7px 0;
    }
    .time {
      background: #FAFAFA;
      height: 17px;
    }
    .tags {
      background: #FAFAFA;
      height: 17px;
    }
    .art-body {
      background: #FAFAFA;
      height: 1000px;
    }
  }
</style>

