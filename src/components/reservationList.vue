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
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="当前状态" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" class="warning">未接单</span>
            <span v-else class="success">已受理</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 页码 -->
    <div class="pages">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="total, prev, pager, next" :total="1000">
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
        status: "0"
      },

      statusText: {
        0: "未接单",
        1: "已受理"
      },
      currentPage: 1,

      //模拟数据
      reservations: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          phone: 18431451451,
          address: "上海市普陀区金沙江路 1518 弄",
          status: 1
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          phone: 18431123421,
          address: "上海市普陀区金沙江路 1517 弄",
          status: 0
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          phone: 18434231451,
          address: "上海市普陀区金沙江路 1519 弄",
          status: 0
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          phone: 18413251451,
          address: "上海市普陀区金沙江路 1516 弄",
          status: 1
        }
      ]
    };
  },

  methods: {
    /**
     * @param {number} page 当前页码
     * */
    handleCurrentChange(page) {
      console.log(page);
    }
  }
};
</script>

