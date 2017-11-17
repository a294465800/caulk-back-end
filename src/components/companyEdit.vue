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
  height: 15em;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  resize: vertical;
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
      <el-breadcrumb-item :to="{ path: '/company/list' }">公司简介</el-breadcrumb-item>
      <el-breadcrumb-item>内容编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->
    <div class="form-wrap">
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <el-upload class="hide-upload-wrap" name="image" accept="image/gif,image/png,image/jpg,image/jpeg" :action="host" :show-file-list="false" :on-success="uploadHideSuccess">
          <i class="el-icon-upload hide-upload"></i>
        </el-upload>
        <quill-editor ref="myTextEditor" v-model="companyForm.content" :options="editorOption"></quill-editor>
        <div class="html ql-editor" v-html="companyForm.content"></div>
        <el-button type="primary" @click="submitForm" style="width: 100%;margin-top: 20px;">确定</el-button>
      <!-- <el-form label-position="top" :model="companyForm" :rules="rules" ref="companyForm" label-width="100px">
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="companyForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input type="textarea" v-model="companyForm.description"></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      host: this.$api.host + "upload",
      companyForm: {
        content: "",
        type: 2
      },

      editorOption: {
        placeholder: "在这里输入，下面会同步显示..."
      }
    };
  },

  created() {
    const company = this.$route.params.company;
    if (company) {
      this.companyForm = company;
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
      this.companyForm.content += `<img src="${res.data.base_url}">`;
    },
    //确定
    submitForm() {
      if (!this.companyForm.content) {
        this.$message({
          type: "warning",
          message: "内容不能为空"
        });
        return false;
      }
      this.$api.postCompany(this.companyForm, res => {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.$router.push("/company/list");
      });
    }
  }
};
</script>


