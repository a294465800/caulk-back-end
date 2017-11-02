<style scoped>

</style>

<template>
  <section class="wrap">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品主页轮播</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 图片列表 -->
    <div class="img-list">
      <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" accept="image/jpeg,image/png,image/jpg" :class="{'hide':imagesLimit}" :file-list="imgLists" :on-preview="handlePictureCardPreview" :before-upload="beforeImagesUpload" :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog width="40%" :visible="dialogVisible" @close="closeDialog" style="text-align: center;">
        <img style="max-width: 100%;" :src="dialogImageUrl" alt="图片">
      </el-dialog>
    </div>
    <!-- /图片列表 -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgLists: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
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
      ],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },

  computed: {
    imagesLimit: function() {
      return this.imgLists.length >= 5 ? true : false;
    }
  },

  methods: {
    /** 
     * 移除图片
     * @param {object} file 当前文件对象
     * @param {array object} flieList 所有文件
    */
    handleRemove(file, fileList) {
      this.imgLists = fileList;
      console.log(file, fileList);
    },

    /** 
     * 预览图片
     * @param {object} file 预览图片对象
    */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    /**
     * 控制上传图片的大小
     * @param {object} file 当前即将上传的文件
     * */
    beforeImagesUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 1MB!");
      }
      return isLt2M;
    },

    //关闭 dialog
    closeDialog() {
      this.dialogVisible = false;
    }
  }
};
</script>


