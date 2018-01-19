<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      getBaseData () {
        this.$store.dispatch('getBaseData')
      }
    },
    components: {
    },
    mounted () {
      this.getBaseData()
    }
  }
</script>

<style lang="less">
  .fill {
    min-height: 100%;
    height: 100%;
  }

  html, body {
    .fill;
  }

  #app {
    position: relative;
    .fill;
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
    opacity: 0.7;
    z-index: 2222;
  }

  @font-face {
    font-family: 'iconfont';  /* project id 520351 */
    src: url('//at.alicdn.com/t/font_520351_gtyqj9ekywyojemi.eot');
    src: url('//at.alicdn.com/t/font_520351_gtyqj9ekywyojemi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_520351_gtyqj9ekywyojemi.woff') format('woff'),
    url('//at.alicdn.com/t/font_520351_gtyqj9ekywyojemi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_520351_gtyqj9ekywyojemi.svg#iconfont') format('svg');
  }
</style>
