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
      <el-form :inline="true" :model="searchForm" style="margin-bottom: 20px;">
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.state" placeholder="订单状态" @change="searchState">
            <el-option label="全部" value=""></el-option>
            <!-- <el-option label="未付款" value="0"></el-option> -->
            <el-option label="待发货" value="1"></el-option>
            <el-option label="待收货" value="2"></el-option>
            <el-option label="已完成" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="订单号">
          <el-input v-model="searchForm.number" placeholder="输入订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- /功能 -->

    <div class="tale-list">
      <el-table :data="orders" border stripe style="min-width: 900px;">
        <el-table-column prop="number" label="订单号" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="checkOrder(scope.row.id)">{{scope.row.number}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="name" label="购买商品"></el-table-column>
        <el-table-column prop="price" label="购买价格">
          <template slot-scope="scope">
            <span class="price">{{scope.row.price}} 元</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="日期"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <span>{{stateText[scope.row.state]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" v-if="scope.row.state == 1" @click="shipCommodity(scope.$index, scope.row)">发货</el-button>
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

    <el-dialog title="提示" :visible.sync="dialogBox" width="30%" center>
      <div class="shipForm">
        <el-form label-position="top" label-width="80px" :model="shipForm" :rules="rules" ref="shipForm">
          <el-form-item label="快递公司" prop="name">
            <el-input v-model="shipForm.name"></el-input>
          </el-form-item>
          <el-form-item label="快递单号" prop="track_number">
            <el-input v-model="shipForm.track_number"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button @click="dialogBox = false">取 消</el-button>
            <el-button type="primary"  @click="confirmShip('shipForm')">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      stateText: {
        0: "未付款",
        1: "待发货",
        2: "待收货",
        3: "已完成"
      },

      //搜索 form
      searchForm: {
        state: "",
        number: ""
      },

      shipForm: {
        name: "",
        track_number: ""
      },

      rules: {
        name: [{ required: true, message: "快递公司名称不能为空！", trigger: "blur" }],
        track_number: [
          { required: true, message: "快递单号不能为空！", trigger: "blur" }
        ]
      },
      dialogBox: false,
      currentIndex: "",
      currentRow: {},

      currentPage: 1,
      count: 0,

      //模拟数据
      orders: []
    };
  },

  created() {
    this.$api.getOrders("", res => {
      this.orders = res.data.data;
      this.count = res.data.count;
    });
  },

  methods: {
    //查看单条订单
    checkOrder(id) {
      this.$router.push({ name: "commodityOrderOne", params: { id } });
    },

    //状态搜索
    searchState(e) {
      this.$api.getOrders({ state: e }, res => {
        this.orders = res.data.data;
        this.count = res.data.count;
      });
    },

    //单号搜索
    handleSearch() {
      this.$api.getOrders({ number: this.searchForm.number }, res => {
        this.orders = res.data.data;
        this.count = res.data.count;
      });
    },

    /**
     * @param {number} page 当前页码
     * */
    handleCurrentChange(page) {
      const getData = Object.assign(
        { state: this.searchForm.state },
        { page: page }
      );
      this.$api.getOrders(getData, res => {
        this.orders = res.data.data;
        this.count = res.data.count;
      });
    },

    //发货
    shipCommodity(index, row) {
      this.dialogBox = true;
      this.currentIndex = index;
      this.currentRow = row;
    },

    confirmShip(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.shipOrder(this.currentRow.id, this.shipForm, res => {
            this.orders[this.currentIndex].state = 2;
            this.dialogBox = false;
            this.$message({
              type: "success",
              message: "发货成功"
            });
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

