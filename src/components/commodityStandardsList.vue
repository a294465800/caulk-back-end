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
      <el-breadcrumb-item>规格列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <div class="operation-btns">
          <el-button type="primary" @click="standardAdd">新增</el-button>
          <!-- <el-button type="danger"  @click="standardDeleteAll">删除</el-button> -->
      </div>
    </div>
    <!-- /功能 -->

    <div class="tale-list">
      <el-table :data="standards" border stripe style="min-width: 900px;" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="title" label="规格名"></el-table-column>
        <el-table-column prop="attrs" label="具体规格" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="(tag, index) in scope.row.attrs" :key="index" style="margin-right: 5px;">{{tag}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <!-- <el-button size="small" type="primary" @click="commodityEdit(scope.$index, scope.row)">修改</el-button> -->
            <el-button size="small" type="danger"  @click="standardDelete(scope.$index, scope.row)">删除</el-button>
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
        status: "0"
      },

      currentPage: 1,
      count: 0,

      //模拟数据
      standards: [
        {
          id: 1,
          date: "2016-05-02",
          name: "美缝剂一",
          price: 23,
          description: "这是很长的一段描述"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "美缝剂二",
          price: 111,
          description: "这是很长的一段描述这是很长的一段描述这是很长的一段描述"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "美缝剂三",
          price: 423,
          description: "这是很长的一段描述"
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "美缝剂四",
          price: 24,
          description: "这是很长的一段描述这是很长的一段描述"
        }
      ]
    };
  },

  created() {
    const id = this.$route.params.commodity_id
    this.$api.getStandards(id, res => {
      console.log(res);
      this.standards = res.data.data;
      // this.count = res.data.count;
    });
  },

  methods: {
    //新增规格，路由跳转
    standardAdd() {
      console.log(1);
      this.$router.push({ name: "commodityAddStandard" });
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
      console.log(this.waittingData);
    },

    //搜索内容
    handleSearch() {
      console.log("search");
    },

    /**
     * 行修改
     * @param {number} index 当前行（数据）索引
     * @param {object} row 当前行（数据）所有信息
     */
    // commodityEdit(index, row) {
    //   console.log(index);
    // },

    /**
     * 行删除
     * @param {number} index 当前行（数据）索引
     * @param {object} row 当前行（数据）所有信息
     */
    standardDelete(index, row) {
      console.log(index);
      this.$api.deleteStandards(row.id, res => {
        this.standards.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功"
        });
      });
    },

    /**
     * 页码事件
     * @param {number} page 当前页码
     * */
    handleCurrentChange(page) {
      console.log(page);
    }
  }
};
</script>

