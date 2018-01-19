<template lang="html">
  <div class="tags">
    <h1 class="tag-name">{{$route.query.tag}}</h1>
    <div class="year-item" v-for="item in artsTag">
      <h3 class="year">{{ item.year }}</h3>
      <ul>
        <li class="art-item" v-for="info in item.data">
          <router-link :to="{ name: 'Article', query: { title: info.title }}" class="title">{{info.title}}</router-link>
          <div class="time">{{info.time}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState(['category']),
      ...mapState({
        artsTag: state => state.article.artsTag
      })
    },
    methods: {
      getArticles (tag) {
        this.$store.dispatch('getArticlesByTags', { tag })
      }
    },
    mounted () {
      this.getArticles(this.$route.query.tag)
    }
  }
</script>
<style lang="less" scoped>
  @media (max-width: 991px) {
    .tags {
      margin: 70px 0 20px !important;
    }
  }

  .tags {
    margin: 30px 60px;
  }

  .year {
    color: #5d686f;
    font-size: 22px;
  }

  .tag-name {
    margin-bottom: 30px;
  }

  .year-item {
    border-bottom: 1px solid #eef2f8;
    ul {
      margin-bottom: 26px;
    }
  }

  .art-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 26px;
    &:before {
      font-family: 'iconfont';
      content: '\e619';
      margin-right: 10px;
    }
    .title {
      color: #5d686f;
      letter-spacing: 1px;
    }
    .time {
      color: #9eabb3;
      &:before {
        content: ' - ';
        margin-left: 20px;
      }
    }
  }
</style>
