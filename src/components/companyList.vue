<style scoped>

</style>

<template>
  <section v-if="loading" class="loading-wrap flex-column flex-center">
    <i class="el-icon-loading"></i>
  </section>
  <section v-else class="wrap">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公司简介</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <div class="table-list">
      <el-table :data="companyLists" border style="width: 100%">
        <el-table-column prop="id" label="ID">
        </el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <span>{{typeText[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建">
        </el-table-column>
        <el-table-column prop="updated_at" label="最后修改">
        </el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </section>
</template>

<script>
export default {
  data() {
    return {
      typeText: {
        1: "公司展示",
        2: "关于我们"
      },

      loading: true,

      companyLists: []
    };
  },

  created() {
    this.$api.getCompanies(res => {
      this.companyLists = res.data.data;
      this.loading = false;
    });
  },

  methods: {
    //修改
    handleEdit(row) {
      this.$router.push({ name: "companyEdit", params: { company: row } });
    }
  }
};
</script>
