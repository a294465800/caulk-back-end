<style scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background-color: #545c64;
}

.login-part {
  position: fixed;
  top: 25%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 500px;
  height: 400px;
}

h1 {
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
}

.login {
  background-color: #fff;
  border-radius: 4px;
  padding: 30px;
}
</style>

<template>
  <div class="login-wrap">
    <div class="login-part">
      <h1>后台管理系统</h1>
      <div class="login" @keydown.enter="login('loginInfo')">
        <el-form :label-position="labelPosition" :model="loginInfo" ref="loginInfo">
          <el-form-item label="用户名" prop="username" :rules="[{ required: true, message: '用户名不能为空！'}]">
            <el-input v-model="loginInfo.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '密码不能为空！'}]">
            <el-input type="password" v-model="loginInfo.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0;">
            <el-button type="primary" @click="login('loginInfo')" style="width: 100%;">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      loginInfo: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const login = {
            username: this.loginInfo.username,
            password: this.loginInfo.password
          };
          this.$api.login(login, res => {
            sessionStorage.username = this.loginInfo.username;
            this.$message({
              type: "success",
              message: "登录成功"
            });
            this.$router.push("/");
          });
          // this.$api.login(login, () => {
          //   sessionStorage.username = this.loginInfo.username
          //   this.$message({
          //     type: 'success',
          //     message: '登录成功',
          //   })
          //   this.$router.push('/')
          // })
        } else {
          return false;
        }
      });
    }
  }
};
</script>

