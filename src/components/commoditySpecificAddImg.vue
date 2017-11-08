<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 250px;
  height: 250px;
  line-height: 250px;
  text-align: center;
}
.avatar {
  width: 250px;
  height: 250px;
  display: block;
}

.table-img-wrap {
  text-align: center;
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
      <el-breadcrumb-item :to="{ path: '/list/commodity/specific/images' }">商品图片列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增图片</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <div class="table-img-wrap">
      <el-upload class="avatar-uploader" name="image" :action="host" accept="image/jpeg,image/png,image/jpg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button style="margin-top: 30px;" type="primary" @click="postImg">确定提交<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      host: "",
      form: {
        commodity_id: sessionStorage.product_id,
        base_url: "",
        thumb_url: ""
      }
    };
  },
  created() {
    this.host = this.$api.host + "upload";
  },
  methods: {
    //上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.form.base_url = res.data.base_url;
      this.form.thumb_url = res.data.thumb_url;
    },

    //上传之前
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    //提交
    postImg() {
      for (let it in this.form) {
        if (!this.form[it]) {
          this.$message({
            type: "warning",
            message: "请选择图片"
          });
          return false;
        }
      }
      this.$api.postProductImage(this.form, res => {
        this.$message({
          type: "success",
          message: "新增成功"
        });
        this.$router.push("/list/commodity/specific/images");
      });
    }
  }
};
</script>

