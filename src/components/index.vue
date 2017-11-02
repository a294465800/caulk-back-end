<style scoped>
.el-header {
  background-color: #545c64;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  color: #fff;
  overflow: hidden;
}

.el-dropdown-link {
  color: #ffd04b;
  cursor: pointer;
}

.el-dropdown-link > i {
  margin-right: 20px;
  color: #fff;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #fff;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.nav-bar {
  height: 100%;
  border-right: 0;
}

.el-aside.active {
  overflow: unset;
}

.nav-bar:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}

.collapse {
  font-size: 24px;
  text-align: right;
  cursor: pointer;
  padding-right: 20px;
}

.collapse i.active {
  transform: rotate(-180deg);
}
</style>

<template>
<el-container>
  <!-- 顶部 -->
  <el-header>
    <div class="header-logo">LOGO</div>
    <div class="header-user">
      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i>欢迎</i>SHINING
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </el-header>
  <!-- /顶部 -->
  <el-container>

    <!-- 左侧导航 -->
    <el-aside width="auto" :class="{'active': isCollapse}">
      <el-menu :default-active="activeNav" class="nav-bar" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse" router>
        <div class="collapse" @click="collapseNav">
          <i :class="{'active': isCollapse}" class="el-icon-caret-left"></i>
        </div>
        <el-menu-item index="/list/reservation">
          <i class="el-icon-tickets"></i>
          <span slot="title">预约列表</span>
        </el-menu-item>
        <el-submenu index="/commodity">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/list/commodity">商品列表</el-menu-item>
            <el-menu-item index="/list/order">成交订单</el-menu-item>
            <el-menu-item index="/list/commodity/imgs">商品首页轮播</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/company">
          <i class="el-icon-info"></i>
          <span slot="title">公司简介</span>
        </el-menu-item>
        <el-menu-item index="/list/master">
          <i class="el-icon-phone-outline"></i>
          <span slot="title">师傅列表</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 左侧导航 -->

    <!-- 内容 -->
    <el-main>
      <router-view></router-view>
    </el-main>
    <!-- /内容 -->
  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      //导航展开控制
      isCollapse: false,

      activeNav: "/"
    };
  },

  created() {
    this.activeNav = this.$route.path
    // console.log(this.$route.path);
  },
  methods: {
    //退出登录
    logout() {
      sessionStorage.username = "";
      this.$router.push("/login");
    },

    //控制展开
    collapseNav() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>


