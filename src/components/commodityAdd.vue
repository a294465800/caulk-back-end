<style scoped>
.form-wrap {
  width: 100%;
}

.ql-container .ql-editor {
  min-height: 20em;
  padding-bottom: 1em;
  max-height: 25em;
}

.html {
  height: 9em;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  resize: vertical;
}

/* 图片 */
.img-item {
  /* width: 250px; */
  height: 200px;
  border-radius: 5px;
  /* margin: 0 20px 20px 0; */
  position: relative;
}

.img-item img {
  /* width: 100%; */
  height: 200px;
  border-radius: 5px;
}

.img-del {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}

.img-del i {
  font-size: 40px;
  cursor: pointer;
  color: #888;
  margin: 0 10px;
}
.img-item:hover .img-del {
  display: flex;
}

.no-pic {
  font-size: 20px;
  text-align: center;
  flex: 1;
}

.hide-upload-wrap {
  margin-bottom: 20px;
}

.hide-upload-wrap > div {
  border: 0 !important;
}

.hide-upload {
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 120px;
  height: 40px;
  line-height: 40px;
}
</style>

<template>
  <section class="wrap">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list/commodity' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <div class="form-wrap">
      <el-form label-position="top" :model="infoForm" :rules="rules" ref="infoForm" label-width="100px">
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="infoForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品销量" prop="sales">
          <el-input v-model="infoForm.sales"></el-input>
        </el-form-item>
        <el-form-item prop="cover" label="商品封面">
          <el-upload class="avatar-uploader" name="image" accept="image/gif,image/png,image/jpg,image/jpeg" :action="host" :show-file-list="false" :on-success="handleUploadCoverSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="infoForm.cover" :src="infoForm.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品图片（最多 5 张）" prop="images" :class="{'active':  hideUpload}">
          <!-- <div class="img-list flex-row">
            <div class="img-item" v-for="(img, index) in infoForm.images" :key="img.id">
              <img :src="img.url" alt="商品图片">
              <div class="img-del">
                <i class="el-icon-view" @click="preImg(img)"></i>
                <i class="el-icon-delete" @click="delImg(img.id, index)"></i>
              </div>
            </div>
          </div> -->
          <el-upload :action="host" name="image" :file-list="images" list-type="picture-card" :before-upload="beforeAvatarUpload" accept="image/png,image/gif,image/jpg,image/jpeg" :on-success="uploadSuccess" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input type="textarea" v-model="infoForm.description"></el-input>
        </el-form-item>
        <el-form-item label="商品细节描述">
          <el-upload class="hide-upload-wrap" name="image" accept="image/gif,image/png,image/jpg,image/jpeg" :action="host" :show-file-list="false" :on-success="uploadHideSuccess">
            <i class="el-icon-upload hide-upload"></i>
          </el-upload>
          <div class="quill-editor-example">
            <quill-editor ref="myTextEditor" v-model="infoForm.content" :options="editorOption"></quill-editor>
            <div class="html ql-editor" v-html="infoForm.content"></div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('infoForm')" style="width: 100%;">确定</el-button>
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
      infoForm: {
        title: "",
        description: "",
        content: "",
        images: [],
        cover: "",
        sales: ""
      },

      images: [],
      hideUpload: false,

      dialogImageUrl: "",
      dialogVisible: false,

      editorOption: {
        placeholder: "在这里输入，下面会同步显示..."
      },

      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        description: [{ required: true, message: "请输入商品描述", trigger: "blur" }]
      }
    };
  },

  created() {
    const commodity = this.$route.params.commodity;
    if (commodity) {
      this.infoForm.title = commodity.title;
      this.infoForm.description = commodity.description;
      this.infoForm.content = commodity.content;
      this.infoForm.id = commodity.id;
      this.infoForm.cover = commodity.cover;
      this.infoForm.sales = commodity.sales;
      this.images = commodity.pictures;
    }
  },

  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    }
  },

  methods: {
    //隐藏上传
    uploadHideSuccess(res, file) {
      this.infoForm.content += `<img src="${res.data.base_url}">`;
    },
    //上传成功
    uploadSuccess(res, file, filelist) {
      this.infoForm.images.push(res.data.file_name);
      if (this.infoForm.images.length >= 5) {
        this.hideUpload = true;
      }
    },

    //上传成功
    handleUploadCoverSuccess(res, file, filelist) {
      this.infoForm.cover = res.data.base_url;
    },

    //删除
    handleRemove(file) {
      if (file.response === undefined) {
        this.$api.deleteCommodityImg(file.id, res => {
          this.$message({
            type: "success",
            message: "图片已删除"
          });
        });
      } else {
        const index = file.response.data.file_name.indexOf(
          this.infoForm.images
        );
        this.infoForm.images.splice(index, 1);
        if (this.infoForm.images.length <= 5) {
          this.hideUpload = false;
        }
      }
    },

    //上传之前
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    //确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.infoForm.sales ? "" : (this.infoForm.sales = 0);
          this.$api.postCommodityInfo(this.infoForm, res => {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.$router.push("/list/commodity");
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


