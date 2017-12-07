<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}

.tale-list {
  flex: 1;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.search-form {
  text-align: right;
}

.input-with-select {
  max-width: 900px;
}
</style>

<template>
  <section class="wrap flex-column">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>加盟商管理</el-breadcrumb-item>
      <el-breadcrumb-item>加盟商列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <div style="width: 100%;text-align:left;margin-bottom: 20px;">
        <el-button type="primary" @click="addNewFrannchisee">新增加盟商</el-button>
      </div>
      <div class="search-form">
        <el-input placeholder="请输入搜索内容" v-model="selectInput" class="input-with-select" @keypress.native.enter="selectSearch">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="加盟商名称" value="name"></el-option>
            <el-option label="APPID" value="app_id"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectSearch"></el-button>
        </el-input>
      </div>
    </div>
    <!-- /功能 -->

    <div class="tale-list">
      <el-table :data="franchiseeList" border stripe style="min-width: 900px;">
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="user.username" label="登录名称"></el-table-column>
        <el-table-column prop="name" label="加盟商名称"></el-table-column>
        <el-table-column prop="app_id" label="APPID"></el-table-column>
        <el-table-column prop="secret" label="secret"></el-table-column>
        <el-table-column prop="template_id" label="消息模版id（template_id）" show-overflow-tooltip></el-table-column>
        <el-table-column prop="created_at" label="加盟时间"></el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 1" class="success">正常使用</span>
            <span v-else class="warning">已停用</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="操作" :width="280">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editBtn(scope.$index, scope.row)">修改</el-button>
            <el-button type="warning" size="small" @click="resetPassword(scope.row)">重置密码</el-button>
            <el-button v-if="scope.row.state === 1" type="danger" size="small" @click="stopFranchisee(scope.$index,scope.row)">停用</el-button>
            <el-button v-else type="info" size="small" @click="restartFranchisee(scope.$index,scope.row)">恢复使用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 页码 -->
    <div class="pages">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
    <!-- /页码 -->

    <el-dialog title="提示" :visible.sync="editInfoDialog" center>
      <el-form label-position="right" label-width="80px" :model="editForm">
        <el-form-item label="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="APPID">
          <el-input v-model="editForm.app_id"></el-input>
        </el-form-item>
        <el-form-item label="secret">
          <el-input v-model="editForm.secret"></el-input>
        </el-form-item>
        <el-form-item label="消息模版id">
          <el-input v-model="editForm.template_id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectInput: "",
      select: "name",

      franchiseeList: [],
      count: 0,
      currentPage: 1,

      editInfoDialog: false,
      editForm: {
        name: "",
        app_id: "",
        secret: "",
        template_id: ""
      },

      currentEdit: {
        index: "",
        row: ""
      }
    };
  },

  created() {
    this.$api.getAppsList("", res => {
      this.franchiseeList = res.data.data;
      this.count = res.data.count;
    });
  },

  methods: {
    //修改按钮
    editBtn(index, row) {
      this.currentEdit.index = index;
      this.currentEdit.row = row;
      this.editForm.app_id = row.app_id;
      this.editForm.secret = row.secret;
      this.editForm.template_id = row.template_id;
      this.editForm.name = row.name;
      this.editInfoDialog = true;
    },
    //修改确定
    confirmEdit() {
      const currentEdit = this.currentEdit;
      const editForm = this.editForm;
      this.$api.editAppUser(currentEdit.row.id, editForm, res => {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.franchiseeList[currentEdit.index].name = editForm.name;
        this.franchiseeList[currentEdit.index].app_id = editForm.app_id;
        this.franchiseeList[currentEdit.index].secret = editForm.secret;
        this.franchiseeList[currentEdit.index].template_id =
          editForm.template_id;
        this.editInfoDialog = false;
      });
    },
    //新增
    addNewFrannchisee() {
      this.$router.push({ name: "franchiseeAdd" });
    },
    //搜索
    selectSearch() {
      const getData = {
        [this.select]: this.selectInput
      };
      this.$api.getAppsList(getData, res => {
        this.franchiseeList = res.data.data;
        this.count = res.data.count;
      });
    },

    //重置密码
    resetPassword(row) {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$api.postAppPassword(row.id, { password: value }, res => {
            this.$message({
              type: "success",
              message: "修改成功！ "
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    //停用
    stopFranchisee(index, row) {
      this.$confirm("此操作将停用该加盟商, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.deleteAppUser(row.id, res => {
            this.franchiseeList[index].state = 0;
            this.$message({
              type: "success",
              message: "停用成功"
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

    //恢复
    restartFranchisee(index, row) {
      this.$confirm("此操作将恢复该加盟商的使用, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.deleteAppUser(row.id, res => {
            this.franchiseeList[index].state = 1;
            this.$message({
              type: "success",
              message: "恢复成功"
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

    //页码
    handleCurrentChange(page) {
      const getData = {
        [this.select]: this.selectInput,
        page
      };
      this.$api.getAppsList(getData, res => {
        this.franchiseeList = res.data.data;
      });
    }
  }
};
</script>

