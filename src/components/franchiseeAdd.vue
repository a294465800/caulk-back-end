<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}

.form-wrap {
  max-width: 900px;
  margin: 20px auto 0;
}
</style>

<template>
  <section class="wrap">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>加盟商管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list/franchisee'}">加盟商列表</el-breadcrumb-item>
      <el-breadcrumb-item>新增加盟商</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <div class="form-wrap">
      <el-form label-position="top" label-width="80px" :model="franchiseeForm" ref="franchiseeForm" :rules="rules">
        <el-form-item label="登录名称" prop="username">
          <el-input v-model="franchiseeForm.username" placeholder="请输入登录名称"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="franchiseeForm.password" placeholder="请输入登录密码"></el-input>
        </el-form-item>
        <el-form-item label="加盟商名称" prop="name">
          <el-input v-model="franchiseeForm.name" placeholder="请输入加盟商名称"></el-input>
        </el-form-item>
        <el-form-item label="APPID" prop="app_id">
          <el-input v-model="franchiseeForm.app_id" placeholder="请输入加盟商APPID"></el-input>
        </el-form-item>
        <el-form-item label="secret" prop="secret">
          <el-input v-model="franchiseeForm.secret" placeholder="请输入加盟商secret"></el-input>
        </el-form-item>
        <el-form-item label="消息模版 id" prop="template_id">
          <el-input v-model="franchiseeForm.template_id" placeholder="请输入加盟商消息模版 id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('franchiseeForm')" style="width: 100%;">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      franchiseeForm: {
        username: "",
        name: "",
        password: "",
        app_id: "",
        secret: "",
        template_id: ""
      },

      rules: {
        username: [{ required: true, message: "该项不能为空！" }],
        name: [{ required: true, message: "该项不能为空！" }],
        password: [{ required: true, message: "该项不能为空！" }],
        app_id: [{ required: true, message: "该项不能为空！" }],
        secret: [{ required: true, message: "该项不能为空！" }],
        template_id: [{ required: true, message: "该项不能为空！" }]
      }
    };
  },

  methods: {
    //提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.postAppUser(this.franchiseeForm, res => {
            this.$message({
              type: "success",
              message: "新增成功"
            });
            this.$router.push("/list/franchisee");
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

