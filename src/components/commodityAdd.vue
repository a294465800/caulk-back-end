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
  margin: 0 20px 20px 0;
  position: relative;
}

.img-item img {
  /* width: 100%; */
  height: 100%;
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
        <el-form-item label="商品图片" prop="images">
          <div class="img-list flex-row">
            <div class="img-item" v-for="(img, index) in infoForm.images" :key="img.id">
              <img :src="img.url" alt="商品图片">
              <div class="img-del">
                <i class="el-icon-view" @click="preImg(img)"></i>
                <i class="el-icon-delete" @click="delImg(img.id, index)"></i>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input type="textarea" v-model="infoForm.description"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" prop="content">
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
    
    <el-dialog width="40%" :visible="dialogVisible" @close="closeDialog" style="text-align: center;">
      <img style="max-width: 100%;" :src="dialogImageUrl" alt="图片">
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      infoForm: {
        title: "",
        description: "",
        content: "",
        images: [
          {
            name: "food.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          },
          {
            name: "food2.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          }
        ]
      },

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

  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    }
  },

  methods: {
    //删除图片
    delImg(id, index) {
      // this.$confirm("此操作将删除此图片, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$api.deleteAdvert(id, res => {
      //       this.images.splice(index, 1);
      //       this.$message({
      //         type: "success",
      //         message: "删除成功!"
      //       });
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消"
      //     });
      //   });

      this.infoForm.images.splice(index, 1);
    },

    /** 
     * 预览图片
    */
    preImg(img) {
      console.log(11);
      this.dialogImageUrl = img.url;
      this.dialogVisible = true;
    },

    //关闭 dialog
    closeDialog() {
      this.dialogVisible = false;
    },

    //确定
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
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


