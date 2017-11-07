<style scoped>

</style>

<template>
  <section class="wrap">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list/commodity' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list/commodity/specific' }">库存列表</el-breadcrumb-item>
      <el-breadcrumb-item>库存编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->  

    <div class="form-wrap">

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {
    const id = this.$route.params.commodity_id;
    this.$api.getStandards(id, res => {
      console.log(res);
    });
  },

  methods: {}
};
</script>

