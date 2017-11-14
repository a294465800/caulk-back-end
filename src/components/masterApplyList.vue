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
</style>

<template>
  <section class="wrap flex-column">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>师傅管理</el-breadcrumb-item>
      <el-breadcrumb-item>申请列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="省份">
          <el-select v-model="searchForm.area" placeholder="选择省份">
            <el-option v-for="sheng in shengs" :key="sheng.id" :label="sheng.fullname" :value="sheng.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-select v-model="searchForm.state" placeholder="申请状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="待处理" value="0"></el-option>
            <el-option label="通过" value="1"></el-option>
            <el-option label="拒绝" value="2"></el-option>
          </el-select>
        </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- /功能 -->

    <div class="tale-list">
      <el-table :data="masterLists" border stripe style="min-width: 900px;">
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="id_card" label="身份证"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="good_at" label="擅长" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="created_at" label="日期"></el-table-column>
        <el-table-column prop="state" label="申请状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 0" class="normal">待处理</span>
            <span v-else-if="scope.row.state == 1" class="success">已通过</span>
            <span v-else class="warning">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state == 0" size="small" type="primary" @click="passMaster(scope.$index, scope.row.id)">通过</el-button>
            <el-button v-if="scope.row.state == 0" size="small" type="danger" @click="rejectMaster(scope.$index, scope.row.id)">拒绝</el-button>
            <span v-else>无操作</span>
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
      searchForm: {
        state: ""
      },

      shengs: "",

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },

      masterLists: [],
      count: 0,
      currentPage: 1
    };
  },

  created() {
    this.$api.getApplies({ state: 0 }, res => {
      this.masterLists = res.data.data;
      this.count = res.data.count;
    });

    this.$api.getDistrict((err, res) => {
      this.shengs = res.result[0];
    });
  },

  methods: {
    //搜索
    search() {
      this.$api.getApplies(this.searchForm, res => {
        this.masterLists = res.data.data;
        this.count = res.data.count;
      });
    },

    //通过
    passMaster(index, id) {
      this.$confirm("此操作将通过该申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.postApply(id, { state: 1 }, res => {
            this.masterLists.splice(index, 1);
            this.count--;
            this.$message({
              type: "success",
              message: "通过成功"
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

    //通过
    rejectMaster(index, id) {
      this.$confirm("此操作将拒绝该申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.postApply(id, { state: 2 }, res => {
            this.masterLists.splice(index, 1);
            this.count--;
            this.$message({
              type: "warning",
              message: "已拒绝"
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
      this.$api.getApplies(
        { state: this.searchForm.state, page: page },
        res => {
          this.masterLists = res.data.data;
        }
      );
    }
  }
};
</script>

