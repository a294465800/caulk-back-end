<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}

.tale-list {
  flex: 1;
}
</style>

<template>
  <section class="wrap flex-column">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预约列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.status" placeholder="订单状态">
            <el-option label="全部" value="2"></el-option>
            <el-option label="未接单" value="0"></el-option>
            <el-option label="已受理" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- /功能 -->

    <div class="tale-list">
      <el-table :data="reservations" border stripe style="min-width: 900px;">
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="created_at" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="number" label="联系方式"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="当前状态" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.state == 0" class="warning">未接单</span>
            <span v-else class="success">已受理</span>
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
      //搜索 form
      searchForm: {
        status: "2"
      },

      count: 0,

      statusText: {
        0: "未接单",
        1: "已受理"
      },
      currentPage: 1,

      //模拟数据
      reservations: []
    };
  },

  created() {
    this.$api.getReservations("", res => {
      this.reservations = res.data.data;
      this.count = res.data.count
    });
  },

  methods: {
    /**
     * @param {number} page 当前页码
     * */
    handleCurrentChange(page) {
      const state = this.searchForm.status;
      let searchData = {
        page: page
      };
      if (state != 2) {
        searchData.state = state;
      }
      this.$api.getReservations(searchData, res => {
        this.reservations = res.data.data;
      });
    },

    //搜索查询
    onSubmit() {
      const state = this.searchForm.status;
      let searchData = {};
      if (state != 2) {
        searchData.state = state;
      }
      this.$api.getReservations(searchData, res => {
        this.reservations = res.data.data;
        this.count = res.data.count
      });
    }
  }
};
</script>

