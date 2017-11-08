<style scoped>
.table-wrap {
  max-width: 1200px;
  margin: 0 auto;
}

.order-content {
  padding: 50px;
}

.order-content-item {
  color: #666;
  font-size: 18px;
  margin-bottom: 20px;
}

.order-content-title {
  width: 160px;
}

.order-content-text {
  flex: 1;
}

.order-count {
  background-color: #f3f3f3;
  padding: 30px;
  font-size: 14px;
  color: #333;
  justify-content: space-between;
  margin-top: 30px;
}

.order-count-small {
  margin: 10px 0;
}

.order-count-large {
  font-weight: 600;
  font-size: 18px;
  margin: 20px 0;
}
</style>

<template>
  <section class="wrap">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list/order' }">成交订单</el-breadcrumb-item>
      <el-breadcrumb-item>订单快照</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->  
    
    <div class="table-wrap">
      <el-steps :space="200" :active="order.state" finish-status="success">
        <!-- <el-step title="未付款"></el-step> -->
        <el-step title="待发货"></el-step>
        <el-step title="待收货"></el-step>
        <el-step title="已完成"></el-step>
      </el-steps>

      <div class="order-content">
        <div class="order-content-item flex-row">
          <div class="order-content-title">用户姓名：</div>
          <div class="order-content-text">{{order.username}}</div>
        </div>
        <div class="order-content-item flex-row">
          <div class="order-content-title">电话号码：</div>
          <div class="order-content-text">{{order.phone}}</div>
        </div>
        <div class="order-content-item flex-row">
          <div class="order-content-title">地址：</div>
          <div class="order-content-text">{{order.address}}</div>
        </div>
        <div class="order-content-item flex-row">
          <div class="order-content-title">订单号：</div>
          <div class="order-content-text">{{order.number}}</div>
        </div>
        <div class="order-content-item flex-row">
          <div class="order-content-title">创建时间：</div>
          <div class="order-content-text">{{order.created_at}}</div>
        </div>
      </div>

      <div class="table-list">
        <el-table :data="order.snapshots" border style="width: 100%">
          <el-table-column prop="commodity_name" label="商品">
          </el-table-column>
          <el-table-column prop="attrs" label="规格" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="margin-right: 10px;" v-for="(tag, index) in scope.row.attrs" :key="index">{{tag}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价">
            <template slot-scope="scope">
              <span class="price">{{scope.row.price}} 元</span>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="数量">
          </el-table-column>
        </el-table>
      </div>

      <div class="order-count flex-row">
        <div class="order-left">商品总数：{{order.snapshots.length}}</div>
        <div class="order-right">
          <div class="order-count-small">商品总价： ￥{{order.price}}</div>
          <div class="order-count-small">运费： ￥{{order.delivery_price}}</div>
          <div class="order-count-large">订单总价： ￥{{order.price + order.delivery_price}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      order: {}
    };
  },

  created() {
    const id = this.$route.params.id;
    this.$api.getOrder(id, res => {
      console.log(res);
      this.order = res.data.data;
    });
  }
};
</script>
