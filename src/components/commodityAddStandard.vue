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
      <el-breadcrumb-item>新增规格</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <div class="form-wrap">
      <el-form :model="stardandsForm" ref="stardandsForm" label-width="100px">
        <el-form-item v-for="(standard, index) in stardandsForm.standars" label="规格名" :key="standard.key" style="margin-bottom: 30px;">
          <div class="flex-row" style="margin-bottom: 20px;">
            <el-input v-model="standard.value"></el-input>
            <el-button style="margin-left: 30px;" type="danger" size="small" @click.prevent="removeDomain(standard)">删除当前规格</el-button>
          </div>
          <el-tag :key="tag" v-for="(tag, tagIndex) in stardandsForm.standars[index].tags" closable :disable-transitions="false" @close="handleClose(index, tag)"> {{tag}}</el-tag>
          <el-input class="input-new-tag" v-if="inputVisible && currentIndex == index" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(index)" @blur="handleInputConfirm(index)" >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ 新种类</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain">新增规格</el-button>
          <el-button type="primary" @click="submitForm('stardandsForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // dynamicTags: ["标签一", "标签二", "标签三"],
      currentIndex: "",
      inputVisible: false,
      inputValue: "",
      stardandsForm: {
        standars: [
          {
            value: "",
            tags: []
          }
        ]
      }
    };
  },

  created() {
  },

  methods: {
    //校验
    submitForm() {
      const standardsForm = this.stardandsForm.standars;
      if (!standardsForm.length) {
        this.$message({
          type: "warning",
          message: "规格为空！"
        });
        return false;
      }
      for (let it in standardsForm) {
        if (!standardsForm[it].value) {
          this.$message({
            type: "warning",
            message: "规格名不能为空！"
          });
          return false;
        }
      }
      console.log(this.stardandsForm.standars);
    },

    //添加新规格
    addDomain() {
      this.stardandsForm.standars.push({
        value: "",
        tags: [],
        key: Date.now()
      });
    },

    //移除规格
    removeDomain(item) {
      var index = this.stardandsForm.standars.indexOf(item);
      if (index !== -1) {
        this.stardandsForm.standars.splice(index, 1);
      }
    },

    //删除单个规格标签
    handleClose(index, tag) {
      this.stardandsForm.standars[index].tags.splice(
        this.stardandsForm.standars[index].tags.indexOf(tag),
        1
      );
    },

    showInput(index) {
      this.inputVisible = true;
      this.currentIndex = index;
    },

    handleInputConfirm(index) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.stardandsForm.standars[index].tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      this.currentIndex = "";
    }
  }
};
</script>


