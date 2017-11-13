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
        <el-form-item label="商品名称">
          <div class="title">{{commodity_title}}</div>
        </el-form-item>
        <el-form-item class="low-label" v-for="(standard, index) in standards" :key="standard.id" :label="standard.title" prop="feature">
          <el-radio-group v-model="productForm.feature[index]" size="medium">
            <el-radio style="margin: 0 10px 10px 0;" v-for="(tag,tagIndex) in standard.attrs" :key="tag.id" :label="tag.id">{{tag.title}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="image" label="商品封面">
          <el-upload class="avatar-uploader" name="image" accept="image/gif,image/png,image/jpg,image/jpeg" :action="host" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="beforeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
          <el-button type="primary" @click="submitForm('productForm')" style="width: 100%;">新增商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      host: this.$api.host + "upload",
      productForm: {
        id: "",
        commodity_id: sessionStorage.commodity_id,
        price: "",
        stock: "",
        feature: [],
        standards: []
      },
      commodity_title: sessionStorage.commodity_title,
      imageUrl: "",
      standards: [],

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
    for (let i = 0; i < product.attrs.length; i++) {
      tmp.push(product.attrs[i].id);
    }
    this.productForm.id = product.id;
    this.productForm.feature = tmp;
    this.productForm.price = product.price;
    this.productForm.stock = product.stock;
    this.imageUrl = product.pictures ? product.pictures.url : "";
    this.$api.getStandards(sessionStorage.commodity_id, res => {
      this.standards = res.data.data;
    });
  },

  methods: {
    handleUploadSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.productForm.image = res.data.file_name;
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
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
          this.$api.postProduct(this.productForm, res => {
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

