<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.tale-list {
  flex: 1;
}

.input-with-select {
  width: 700px;
}
</style>

<template>
  <section class="wrap flex-column">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>成交订单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <el-input placeholder="请输入查询内容" v-model="searchForm.input" class="input-with-select" @keypress.enter.native="handleSearch">
        <el-select v-model="searchForm.select" slot="prepend" placeholder="请选择">
          <el-option label="商品ID" value="1"></el-option>
          <el-option label="用户姓名" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
    </div>
    <!-- /功能 -->

    <div class="tale-list">
      <el-table :data="orders" border stripe style="min-width: 900px;">
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="commodity" label="购买商品"></el-table-column>
        <el-table-column prop="price" label="购买价格">
          <template slot-scope="scope">
            <span class="price">{{scope.row.price}} 元</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
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
        select: "1",
        input: ""
      },

      currentPage: 1,

      //模拟数据
      orders: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          phone: 18431451451,
          address: "上海市普陀区金沙江路 1518 弄",
          commodity: "美缝剂一",
          price: 34
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          phone: 18431123421,
          address: "上海市普陀区金沙江路 1517 弄",
          commodity: "美缝剂一",
          price: 424
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          phone: 18434231451,
          address: "上海市普陀区金沙江路 1519 弄",
          commodity: "美缝剂三",
          price: 324
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          phone: 18413251451,
          address: "上海市普陀区金沙江路 1516 弄",
          commodity: "美缝剂一",
          price: 124
        }
      ]
    };
  },

  methods: {
    //搜索
    handleSearch() {
      console.log(1);
    },

    /**
     * @param {number} page 当前页码
     * */
    handleCurrentChange(page) {
      console.log(page);
    }
  }
};
</script>

