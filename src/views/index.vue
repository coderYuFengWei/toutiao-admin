<template>
  <el-container class="container">
    <el-aside width="200px">
      <div class="logo">头条后台</div>

      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item index="1-1">
            <router-link to="/post_list">文章列表</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/post_add">发布文章</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <img :src="$axios.defaults.baseURL + user.user.head_img" alt class="head" />
        <span>{{ user.user.nickname }}</span>
        <span @click="handleLogout" style="cursor:pointer">退出</span>
      </el-header>
      <el-main>
        <div>{{ breaks }}</div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user") || `{}`)
    };
  },
  computed: {
    breaks() {
      const { matched } = this.$route;
      const arr = [];

      matched.forEach(v => {
        arr.push(v.meta);
      });

      return arr.join(" / ");
    }
  },

  mounted() {},

  methods: {
    handleLogout() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        localStorage.removeItem(`user`);
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped lang="less">
.el-header,
.el-footer {
  background-color: #eee;
  color: #333;
  line-height: 60px;
}

.el-header {
  text-align: right;

  * {
    vertical-align: middle;
  }

  .head {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px #999 solid;
  }

  span {
    margin-left: 10px;
  }
}

.el-aside {
  background-color: #333;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
}

.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.logo {
  height: 60px;
  width: 200px;
  line-height: 60px;
  text-align: center;
  font-size: 18px;
  color: #eee;
}
</style>