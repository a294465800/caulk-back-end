<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

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
      <el-breadcrumb-item :to="{ path: '/list/commodity/standards' }">规格列表</el-breadcrumb-item>
      <el-breadcrumb-item>规格编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <div class="form-wrap">
      <el-form :model="standardForm" ref="standardForm" label-width="100px">
        <el-form-item label="商品名称">
          <span>{{commodity_name}}</span>
        </el-form-item>
        <el-form-item label="规格名" style="margin-bottom: 30px;">
          <div class="flex-row" style="margin-bottom: 20px;">
            <el-input v-model="standardForm.title"></el-input>
          </div>
          <template>
            <el-tag :key="tag.id" v-for="(tag, tagIndex) in standard" closable :disable-transitions="false" @close="handleClose(tagIndex, tag)"> {{tag.title}}</el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm()" @blur="handleInputConfirm()" >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新种类</el-button>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submitForm()">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      standardForm: {
        title: "",
        attrs: []
      },
      standard: [],
      commodity_name: "",
      inputVisible: false,
      inputValue: "",
      standard_id: ""
    };
  },

  created() {
    const data = this.$route.params.standard;
    this.standard = data.attrs;
    this.standardForm.title = data.title;
    this.standard_id = data.id;
    this.commodity_name = data.commodity_title;
  },

  methods: {
    //显示 input
    showInput() {
      this.inputVisible = true;
    },

    //确认标签
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.standardForm.attrs.push(inputValue);
        this.standard.push({ title: inputValue });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    //删除单个规格标签
    handleClose(index, tag) {
      this.$confirm("此操作将删除具体规格, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.deleteStandardAttr(tag.id, res => {
            this.standard.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
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

    //确定保存
    submitForm() {
      if (this.standardForm.title === "") {
        this.$message({
          type: "warning",
          message: "规格名不能为空"
        });
        return false;
      }
      this.$api.editStandardSingle(this.standard_id, this.standardForm, res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.$router.push("/list/commodity/standards");
      });
    }
  }
};
</script>
