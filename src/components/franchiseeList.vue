<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}

.tale-list {
  flex: 1;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.search-form {
  text-align: right;
}

.input-with-select {
  max-width: 900px;
}
</style>

<template>
  <section class="wrap flex-column">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>加盟商管理</el-breadcrumb-item>
      <el-breadcrumb-item>加盟商列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <div style="width: 100%;text-align:left;margin-bottom: 20px;">
        <el-button type="primary" @click="addNewFrannchisee">新增加盟商</el-button>
      </div>
      <div class="search-form">
        <el-input placeholder="请输入搜索内容" v-model="selectInput" class="input-with-select" @keypress.native.enter="selectSearch">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="加盟商名称" value="name"></el-option>
            <el-option label="APPID" value="app_id"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectSearch"></el-button>
        </el-input>
      </div>
    </div>
    <!-- /功能 -->

    <div class="tale-list">
      <el-table :data="franchiseeList" border stripe style="min-width: 900px;">
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="user.username" label="登录名称"></el-table-column>
        <el-table-column prop="name" label="加盟商名称"></el-table-column>
        <el-table-column prop="app_id" label="APPID"></el-table-column>
        <el-table-column prop="secret" label="secret"></el-table-column>
        <el-table-column prop="template_id" label="消息模版id（template_id）" show-overflow-tooltip></el-table-column>
        <el-table-column prop="created_at" label="加盟时间"></el-table-column>
        <el-table-column prop="state" label="操作" :width="150">
          <template slot-scope="scope">
            <!-- <el-button type="warning" size="small" @click="resetPassword(scope.row)">重置密码</el-button> -->
            <el-button type="danger" size="small" @click="deleteFranchisee(scope.$index,scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 页码 -->
    <div class="pages">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
    <!-- /页码 -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectInput: "",
      select: "name",

      franchiseeList: [],
      count: 0,
      currentPage: 1
    };
  },

  created() {
    this.$api.getAppsList("", res => {
      this.franchiseeList = res.data.data;
      this.count = res.data.count;
    });
  },

  methods: {
    //新增
    addNewFrannchisee() {
      this.$router.push({ name: "franchiseeAdd" });
    },
    //搜索
    selectSearch() {
      const getData = {
        [this.select]: this.selectInput
      };
      this.$api.getAppsList(getData, res => {
        this.franchiseeList = res.data.data;
        this.count = res.data.count;
      });
    },

    //重置密码
    resetPassword(row) {
      console.log(row);
    },

    //移除
    deleteFranchisee(index, row) {
      this.$confirm("此操作将移除该加盟商, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.deleteAppUser(row.id, res => {
            this.count--;
            this.franchiseeList.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },

    //页码
    handleCurrentChange(page) {
      const getData = {
        [this.select]: this.selectInput,
        page
      };
      this.$api.getAppsList(getData, res => {
        this.franchiseeList = res.data.data;
      });
    }
  }
};
</script>

