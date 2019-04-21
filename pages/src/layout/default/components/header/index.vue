<!--
/**
 * @intro: 布局头部文件.
 */
-->
<template>
  <div class="default-layout-header">
    <div class="header-bar relative">
      <div class="head-text flex">
        <i class="el-icon-bell"/>
        <span>欢迎登录后台管理平台</span>
      </div>
      <el-dropdown class="head-right">
        <div class="head-user flex pointer">
          <!-- <img :src="userInfo.avatar" class="head-avatar"> -->
          <span class="user-text" v-text="loginInfo.name"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item class="dropdown-list" @click.native="onLogout">
            <i class="icon fa fa-user"/>
            <span class="user-text">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script type="text/javascript">
import {UserLogin} from 'src/router/auto-routes'

export default {
  data() {
    return {
      loginInfo: {}
    }
  },
  methods: {
    // 登出
    async onLogout () {
      try {
        await this.$confirm('此操作将退出登录, 是否继续?', '提示', {type: 'warning'})
        localStorage.removeItem('loginInfo')
        this.$message.success('已退出登录！')
        this.$router.replace(UserLogin.path)
      } catch ({msg}) {
        msg && this.$message.warn(msg)
      }
    }
  },
  mounted () {
    this.loginInfo = Object.assign({}, JSON.parse(localStorage['loginInfo']));
  },
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .default-layout-header {
    padding: 0;

    .header-bar {
      padding: 0 20px;
      line-height: 56px;
      font-size: 14px;
      color: #fff;
      background-color: #344058;

      .head-text {
        align-items: center;
      }

      .head-right {
        position: absolute;
        top: 0;
        right: 15px;

        .head-user {
          align-items: center;
        }

        .user-text {
          color: #fff;

          &.logout {
            margin-left: 20px;
          }
        }
      }

      .head-avatar {
        margin-right: 10px;
        width: 36px;
        height: 36px;
        border-radius: 18px;
      }
    }
  }
</style>
