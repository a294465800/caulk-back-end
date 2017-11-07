<style scoped>
.form-wrap {
  max-width: 1000px;
  margin: 0 auto;
}
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
      <el-form :model="productForm" :rules="rules" ref="productForm" label-width="100px" class="demo-productForm">
        <el-form-item label="商品名称" prop="title">
          <div class="title">{{productForm.standards[0]?productForm.standards[0].commodity_title: ''}}</div>
        </el-form-item>
        <el-form-item v-for="(standard, index) in productForm.standards" :key="standard.id" :label="standard.title" prop="feature">
          <el-select v-model="productForm.feature[index]" placeholder="请选择规格">
            <el-option v-for="(tag,tagIndex) in standard.attrs" :key="tag.id" :label="tag.title" :value="tag.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="productForm.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model.number="productForm.stock">
            <template slot="append">件</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('productForm')" style="width: 100%;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      productForm: {
        id: "",
        commodity_id: sessionStorage.commodity_id,
        price: "",
        stock: "",
        feature: [],
        standards: []
      },

      rules: {
        price: [
          { type: "number", required: true, message: "价格不能为空", trigger: "blur" }
        ],
        stock: [
          { type: "number", required: true, message: "库存不能为空", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    const product = this.$route.params.product;
    let tmp = [];
    if (product) {
      console.log(product);
      for (let i = 0; i < product.attrs.length; i++) {
        tmp.push(product.attrs[i].id);
      }
      this.productForm.id = product.id;
      this.productForm.feature = tmp;
      this.productForm.price = product.price;
      this.productForm.stock = product.stock;
    }
    this.$api.getStandards(sessionStorage.commodity_id, res => {
      this.productForm.standards = res.data.data;
    });
  },

  methods: {
    //提交
    submitForm(formName) {
      const dataForm = this.productForm;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (dataForm.standards.length > dataForm.feature.length) {
            this.$message({
              type: "warning",
              message: "规格不能留空"
            });
            return false;
          }
          for (let it = 0; it < dataForm.feature.length; it++) {
            if (!dataForm.feature[it]) {
              this.$message({
                type: "warning",
                message: "规格不能留空"
              });
              return false;
            }
          }
          let postData = {
            id: dataForm.id,
            feature: dataForm.feature,
            commodity_id: dataForm.commodity_id,
            price: dataForm.price,
            stock: dataForm.stock
          };
          this.$api.postProduct(postData, res => {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.$router.push("/list/commodity/specific");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

