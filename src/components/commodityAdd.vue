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
        <el-form-item label="商品描述" prop="description">
          <el-input type="textarea" v-model="infoForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="quill-editor-example">
        <!-- quill-editor -->
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
      infoForm: {
        title: "",
        description: "",
        content: ""
      },

      editorOption: {
        placeholder: "在这里输入，下面会同步显示..."
      },

      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        description: [{ required: true, message: "请输入商品描述", trigger: "blur" }]
      }
    };
  },

  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    }
  },

  methods: {
    //确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.postCommodityInfo(this.infoForm, res => {
            this.$message({
              type: "success",
              message: "添加成功"
            });
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


