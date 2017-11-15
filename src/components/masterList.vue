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
  margin-bottom: 20px;
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
      <el-breadcrumb-item>师傅管理</el-breadcrumb-item>
      <el-breadcrumb-item>师傅列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <div class="search-form">
        <el-input placeholder="请输入搜索内容" v-model="selectInput" class="input-with-select" @keypress.native.enter="selectSearch">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="师傅名称" value="name"></el-option>
            <el-option label="身份证" value="id_card"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectSearch"></el-button>
        </el-input>
      </div>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="注册时间">
          <el-date-picker v-model="searchForm.time" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="left">
        </el-date-picker>
        <el-form-item label="省份">
          <el-select v-model="searchForm.province" placeholder="选择省份">
            <el-option v-for="sheng in shengs" :key="sheng.id" :label="sheng.fullname" :value="sheng.fullname"></el-option>
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
      <el-table :data="workerLists" border stripe style="min-width: 900px;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="身份证">
                <span>{{ props.row.apply.id_card }}</span>
              </el-form-item>
              <el-form-item label="昵称">
                <span>{{ props.row.nickname }}</span>
              </el-form-item>
              <el-form-item label="详细地址">
                <span>{{ props.row.apply.address }}</span>
              </el-form-item>
              <el-form-item style="width: 100%;" label="擅长领域">
                <span>{{ props.row.apply.good_at }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="apply.name" label="姓名"></el-table-column>
        <el-table-column prop="apply.phone" label="联系方式"></el-table-column>
        <el-table-column prop="count" label="接单数量" sortable></el-table-column>
        <el-table-column prop="apply.city" label="注册区域" show-overflow-tooltip></el-table-column>
        <el-table-column prop="apply.created_at" label="注册时间"></el-table-column>
        <el-table-column prop="enable" label="使用状态">
          <template slot-scope="scope">
            <span v-if="scope.row.enable == 1" class="success">正常使用</span>
            <span v-else class="warning">已停用</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.enable == 1" size="small" type="danger" @click="stopMaster(scope.$index, scope.row.id)">停用</el-button>
            <el-button v-else size="small" type="primary" @click="reuseMaster(scope.$index, scope.row.id)">恢复使用</el-button>
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
        time: ""
      },

      select: "name",
      selectInput: "",

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

      workerLists: [],
      count: 0,
      currentPage: 1,

      searchData1: {},
      searchData2: {}
    };
  },

  created() {
    this.$api.getWorkers("", res => {
      this.workerLists = res.data.data;
      this.count = res.data.count;
    });

    this.$api.getDistrict((err, res) => {
      this.shengs = res.result[0];
    });
  },

  methods: {
    //内容搜索
    selectSearch() {
      let getData = {
        [this.select]: this.selectInput,
        search: 1
      };
      this.searchData1 = getData;
      this.$api.getWorkers(getData, res => {
        this.workerLists = res.data.data;
        this.count = res.data.count;
      });
    },
    //搜索
    search() {
      const data = this.searchForm;
      let getData = {
        search: 1,
        province: data.province
      };
      if (data.time) {
        getData.start = data.time[0];
        getData.end = data.time[1];
      }
      this.searchData2 = getData;
      this.$api.getWorkers(getData, res => {
        this.workerLists = res.data.data;
        this.count = res.data.count;
      });
    },

    //通过
    reuseMaster(index, id) {
      this.$confirm("此操作将恢复该师傅帐号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.changeWorker(id, res => {
            this.workerLists[index].enable = 1;
            this.$message({
              type: "success",
              message: "已恢复使用"
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

    //停用
    stopMaster(index, id) {
      this.$confirm("此操作将停用该师傅帐号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.changeWorker(id, res => {
            this.workerLists[index].enable = 0;
            this.$message({
              type: "success",
              message: "已停用"
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
      let getData = Object.assign({}, this.searchData1, this.searchData2, {
        page
      });
      this.$api.getWorkers(getData, res => {
        this.workerLists = res.data.data;
      });
    }
  }
};
</script>

