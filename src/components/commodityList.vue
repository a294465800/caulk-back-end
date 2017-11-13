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
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <div class="operation-btns">
          <el-button type="primary" @click="commodityAdd">新增</el-button>
          <!-- <el-button type="danger"  @click="commodityDeleteAll">删除</el-button> -->
      </div>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.title" placeholder="输入商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- /功能 -->

    <div class="tale-list">
      <el-table :data="commodities" border stripe style="min-width: 900px;" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="title" label="商品名称"></el-table-column>
        <el-table-column prop="description" label="描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="规格">
          <template slot-scope="scope">
            <el-button type="text" @click="checkStandard(scope.row.id)">查看规格</el-button>
          </template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">
            <el-button type="text" @click="checkProduct(scope.row)">查看库存</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="commodityEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="small" type="danger"  @click="commodityDelete(scope.$index, scope.row)">删除</el-button>
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
      //等待删除
      waittingData: [],

      //搜索 form
      searchForm: {
        title: ""
      },

      currentPage: 1,
      count: 0,

      //数据
      commodities: []
    };
  },

  created() {
    this.$api.getCommodityInfo("", res => {
      this.commodities = res.data.data;
      this.count = res.data.count;
    });
  },

  methods: {
    //新增商品，路由跳转
    commodityAdd() {
      this.$router.push({ name: "commodityAdd", params: { commodity: null } });
    },

    //删除所有
    // commodityDeleteAll() {
    //   const ids = this.waittingData;
    //   if (ids.length) {
    //     console.log(ids);
    //     this.$confirm("此操作将删除选中商品, 是否继续?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     })
    //       .then(() => {
    //         this.$message({
    //           type: "success",
    //           message: "删除成功!"
    //         });
    //       })
    //       .catch(() => {
    //         this.$message({
    //           type: "info",
    //           message: "已取消删除"
    //         });
    //       });
    //   } else {
    //     this.$message({
    //       message: "请先选择一项",
    //       type: "warning"
    //     });
    //   }
    // },

    /**
     * 查看规格
     */
    checkStandard(id) {
      sessionStorage.commodity_id = id;
      this.$router.push({ name: "commodityStandardsList" });
    },

    /**
     * 查看库存
     */
    checkProduct(row) {
      sessionStorage.commodity_id = row.id;
      sessionStorage.commodity_title = row.title;
      this.$router.push({ name: "commoditySpecificList" });
    },

    /**
     * 列表多选事件
     * @param {array object} selected 当前选中的项
     */
    handleSelectionChange(selected) {
      let temp = [];
      for (let it of selected) {
        temp.push(it.id);
      }
      this.waittingData = temp;
    },

    //搜索内容
    handleSearch() {
      this.$api.getCommodityInfo({ title: this.searchForm.title }, res => {
        this.commodities = res.data.data;
        this.count = res.data.count;
      });
    },

    /**
     * 行修改
     * @param {number} index 当前行（数据）索引
     * @param {object} row 当前行（数据）所有信息
     */
    commodityEdit(index, row) {
      this.$router.push({
        name: "commodityAdd",
        params: { commodity: row }
      });
    },

    /**
     * 行删除
     * @param {number} index 当前行（数据）索引
     * @param {object} row 当前行（数据）所有信息
     */
    commodityDelete(index, row) {
      this.$confirm("此操作将删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.deleteCommodityInfo(row.id, res => {
            this.commodities.splice(index, 1);
            this.count--;
            this.$message({
              type: "success",
              message: "删除成功"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    /**
     * 页码事件
     * @param {number} page 当前页码
     * */
    handleCurrentChange(page) {}
  }
};
</script>

