<template lang="html">
  <div class="container-fluid">
    <div class="row">
      <title-bar v-model="showMenu" v-on:toggle="openMenu"></title-bar>
      <user-card v-bind:collapse="!showMenu"></user-card>
      <div class="work-right col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import UserCard from '@/components/UserCard'
  import TitleBar from '@/components/TitleBar'
  export default {
    name: 'blog-work',
    data () {
      return {
        showMenu: false
      }
    },
    methods: {
      openMenu () {
        this.showMenu = true
      }
    },
    components: {
      'user-card': UserCard,
      'title-bar': TitleBar
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
  .container-fluid, .row {
    min-height: 100%;
    height: 100%;
  }

  .work-right {
    height: 100%;
    overflow-y: scroll;
  }
</style>

