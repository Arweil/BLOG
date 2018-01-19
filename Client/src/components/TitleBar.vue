<template lang="html">
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <i class="iconfont icon-menu" v-on:click="toggleMenu"></i>
      <h3 class="site-name">{{siteName}}</h3>
    </div>
  </nav>
</template>
<script>
  import { mapState } from 'vuex'
  import { MaskMinixChildComp } from '@/utils/ModalMinix'
  export default {
    mixins: [ MaskMinixChildComp ],
    computed: {
      ...mapState(['siteName'])
    },
    methods: {
      toggleMenu () {
        this.$emit('toggle')
      }
    }
  }
</script>
<style lang="less" scoped>
  @media (max-width: 991px) {
    .navbar[role="navigation"] {
      display: block;
    }
  }

  .navbar {
    display: none;
    .container-fluid {
      display: flex;
      align-items: center;
    }
    .site-name {
      text-align: center;
      margin: 0;
      line-height: 50px;
      flex: 1;
    }
  }
</style>
