<style scoped>
.img-item {
  /* width: 250px; */
  height: 250px;
  border-radius: 5px;
  margin: 20px;
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
      <el-breadcrumb-item>首页轮播</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <div class="operation-btns">
          <el-button type="primary" @click="productdAddImg">新增图片</el-button>
          <!-- <el-button type="danger"  @click="productDeleteAll">删除</el-button> -->
      </div>
    </div>
    <!-- /功能 -->

    <div class="img-list">
      <div class="flex-row" v-if="images.length">
        <div class="img-item" v-for="(img, index) in images" :key="img.id">
          <img :src="img.url" alt="商品图片失效">
          <div class="img-del">
            <i class="el-icon-view" @click="preImg(img)"></i>
            <i class="el-icon-delete" @click="delImg(img.id, index)"></i>
          </div>
        </div>
      </div>
      <div v-else class="no-pic">暂无图片</div>
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
      images: [],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },

  created() {
    this.$api.getAdverts({ type: 3 }, res => {
      this.images = res.data.data;
    });
  },

  methods: {
    //新增图片
    productdAddImg() {
      const path = {
        path: "/company/images",
        type: 3,
        name: "公司轮播"
      };
      this.$router.push({ name: "advertImgAdd", params: { path: path } });
    },

    //删除图片
    delImg(id, index) {
      this.$confirm("此操作将删除此图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.deleteAdvert(id, res => {
            this.images.splice(index, 1);
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

    /** 
     * 预览图片
     * @param {object} file 预览图片对象
    */
    preImg(img) {
      this.dialogImageUrl = img.url;
      this.dialogVisible = true;
    },

    //关闭 dialog
    closeDialog() {
      this.dialogVisible = false;
    }
  }
};
</script>
