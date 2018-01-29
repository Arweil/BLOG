<template lang="html">
  <div class="work-left col-md-3" v-bind:class="collapse ? '' : 'showMenu'">
    <div class="mine">
      <div class="mine-header"></div>
      <div class="mine-body">
        <div class="mine-avatar">
          <img class="img-circle" src="https://gitee.com/uploads/19/409119_Arweil.png?1489311697" alt="img" />
        </div>
        <div class="mine-intro">
          <h3 class="name">{{yourName}}</h3>
          <p>{{sign}}</p>
        </div>
      </div>
      <div class="mine-menu">
        <h4>MY BLOGS</h4>
        <router-link to="/work" class="link">
          <i class="iconfont icon-mac"></i>
          <span>Work</span>
        </router-link>
        <router-link to="/life" class="link">
          <i class="iconfont icon-weibiaoti-"></i>
          <span>Life</span>
        </router-link>
      </div>
      <div class="mine-footer">
        <a name="git" class="iconfont icon-git" v-bind:href="git" target="_blank"></a>
        <a name="sina" class="iconfont icon-sina" v-bind:href="sina" target="_blank"></a>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'user-card',
    props: {
      'collapse': {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapState(['yourName', 'sign', 'git', 'sina'])
    }
  }
</script>
<style lang="less" scoped>
  @media (max-width: 991px) {
    .work-left {
      width: 250px;
      z-index: 9999;
      position: absolute;
      transform: translateX(-250px);
      transition: transform .5s;
      position: fixed;
      top: 0;

      &.showMenu {
        transform: translateX(0);
        transition: transform .5s;
      }
    }
    .mine-header {
      min-height: 160px !important;
    }
    .mine-body {
      margin-top: -30px !important;
    }
  }

  .work-left {
    padding: 0;
    height: 100%;
    background-color: #23222a;
    overflow-y: scroll;
  }

  .mine {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    height: 100%;
  }

  .mine-header {
    background: url('../assets/img/bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    min-height: 180px;
    width: 100%;
  }

  .mine-avatar {
    display: inline-block;
    border-radius: 50%;
    border: 1px solid #33383B;

    img {
      margin: 10px;
      width: 100px;
    }
  }

  .mine-body {
    width: 100%;
    margin-top: -30px;
    color: #fff;
  }

  .mine-intro {
    .name {
      font-weight: 400;
      margin-bottom: 14px;
      letter-spacing: 4px;
      font-size: 20px;
    }
    p {
      font-size: 12px;
      margin-bottom: 20px;
      letter-spacing: 1px;
    }
  }

  .mine-menu, .mine-footer {
    border-top: 1px solid #313638;
    width: 100%;
  }

  .mine-menu {
    flex: 1;
    padding: 40px 60px;
    text-align: left;
    h4 {
      color: #777F83;
      font-size: 14px;
      margin-bottom: 24px;
    }

    .link {
      color: #4A4F52;
      font-size: 14px;
      line-height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      > i {
        margin-top: -2px;
      }
      > span {
        display: block;
        flex: 1;
        padding-left: 20px;
      }
      &:after {
        font-family: iconfont;
        content: '\e6b4'
      }

      &.router-link-active {
        color: #fff;
      }
    }
  }

  .mine-footer {
    padding: 30px 0;
    .iconfont {
      margin-right: 20px;
      font-size: 20px;
      text-decoration: none;
      border: 1px solid #474C4F;
      border-radius: 50%;
      padding: 4px;
      color: #fff;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
