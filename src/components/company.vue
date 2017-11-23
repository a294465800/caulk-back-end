<style scoped>
.dialog {
  max-height: 80vh;
}

.dialog-img {
  width: 100%;
}

.bm-view {
  width: 100%;
  height: 400px;
}

.location-search-input {
  margin-bottom: 20px;
}

.location-search-input label,
.location-search-input .location-search-content > div {
  flex: 1;
  margin: 0 10px;
}
</style>

<template>
  <section class="content-wrap flex-column">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公司简介</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <div class="table-list flex-column flex-center" v-if="loading">
      <i class="el-icon-loading loading-status"></i>
    </div>
    <div class="table-list" v-else>
      <div class="form-wrap">
        <el-form label-position="top" label-width="80px" :model="companyForm" ref="companyForm" :rules="rules">
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="companyForm.name" placeholder="输入公司名称"></el-input>
          </el-form-item>
          <el-form-item label="服务电话" prop="phone">
            <el-input v-model="companyForm.phone" placeholder="输入服务热线"></el-input>
          </el-form-item>
          <el-form-item label="公司描述" prop="detail">
            <el-input type="textarea" :rows="5" v-model="companyForm.detail" placeholder="输入公司描述"></el-input>
          </el-form-item>
          <el-form-item label="轮播图">
            <el-upload class="ad-imgs" :file-list="fileList" name="image" accept="image/jpeg,image/jpg,image/png,image/gif" :action="host" list-type="picture-card" :on-success="handleUploadSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="详情图">
            <el-upload class="info-imgs" :file-list="fileList2" :action="host" name="image" accept="image/jpeg,image/jpg,image/png,image/gif" list-type="picture-card" :on-success="handleUploadSuccess2" :on-preview="handlePictureCardPreview" :on-remove="handleRemove2">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="公司地址" prop="address">
            <el-input v-model="companyForm.address" placeholder="输入详细的公司地址"></el-input>
          </el-form-item>
          <el-form-item label="公司坐标" prop="position">
            <el-input v-model="position" placeholder="点击地图获取公司坐标"></el-input>
          </el-form-item>
          </el-form-item>
            <el-button type="success" @click="submit('companyForm')" style="width: 95%;display:block;margin: 20px auto;">更新信息</el-button>
          </el-form-item>
          <el-form-item label="获取坐标">
            <div class="location-search-input">
              <div class="location-search-title flex-row">
                <label>关键词：</label>
                <label>地区：</label>
              </div>
              <div class="location-search-content flex-row">
                <el-input v-model="keyword" placeholder="输入关键词"></el-input>
                <el-input v-model="location" placeholder="输入地区"></el-input>
              </div>
            </div>
            <baidu-map title="点击地图获取坐标" class="bm-view" ak="k1r99uanDrpyWo8Pr9aXK2BLfUdG71uY"  @click="getPosition" :center="center" :zoom="zoom" @ready="mapReady" :scroll-wheel-zoom="true">
              <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
            </baidu-map>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" custom-class="dialog">
      <img class="dialog-img" :src="preImg" alt="图片">
    </el-dialog>
  </section>
</template>

<script>
import { BaiduMap, BmLocalSearch } from "vue-baidu-map";
export default {
  components: {
    BaiduMap,
    BmLocalSearch
  },
  data() {
    return {
      loading: true,

      host: this.$api.host + "upload",

      //地图相关
      center: { lng: 0, lat: 0 },
      zoom: 3,
      keyword: "",
      location: "",

      preImg: "",
      dialogVisible: false,

      rules: {
        name: [{ required: true, message: "公司名称不能为空！" }],
        phone: [{ required: true, message: "服务热线不能为空！" }],
        detail: [{ required: true, message: "公司描述不能为空！" }]
      },

      fileList: [],
      fileList2: [],

      //表单
      companyForm: {
        name: "",
        phone: "",
        detail: "",
        address: "",
        lat: "",
        lng: "",
        pic: [],
        pic2: []
      },
      position: ""
    };
  },

  created() {
    function getImgName(arr) {
      if (arr.length < 1) {
        return [];
      }
      let imgArr = arr.reduce((sumArr, it) => {
        return sumArr.concat(it.name);
      }, []);
      console.log(imgArr);
      return imgArr;
    }
    this.$api.getInfo(res => {
      this.loading = false;
      const data = res.data.data;
      if (data) {
        this.companyForm = data;
        this.fileList = data.pic;
        this.fileList2 = data.pic2;
        this.companyForm.pic = getImgName(data.pic);
        this.companyForm.pic2 = getImgName(data.pic2);
        if (data.lng) {
          this.center.lng = data.lng;
          this.center.lat = data.lat;
          this.position = `${data.lng},${data.lat}`;
        }
      }
    });
  },

  methods: {
    //获取当前坐标
    getPosition(event) {
      const point = event.point;
      this.position = `${point.lng},${point.lat}`;
      this.companyForm.lat = point.lat;
      this.companyForm.lng = point.lng;
    },
    //百度地图初始化
    mapReady({ BMap, map }) {
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },

    //上传成功
    handleUploadSuccess(res, file) {
      this.companyForm.pic.push(res.data.file_name);
    },
    //上传成功
    handleUploadSuccess2(res, file) {
      this.companyForm.pic2.push(res.data.file_name);
    },
    //预览图片按钮
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogVisible = true;
      this.preImg = file.url;
    },

    //移除图片
    handleRemove(file, filelist) {
      const tmpFile = file.name ? file.name : file.response.data.file_name;
      const index = this.companyForm.pic.indexOf(tmpFile);
      if (index >= 0) {
        this.companyForm.pic.splice(index, 1);
        if(!this.companyForm.pic.length){
          this.companyForm.pic = ['']
        }
      }
    },
    //移除图片
    handleRemove2(file, filelist) {
      const tmpFile = file.name ? file.name : file.response.data.file_name;
      const index = this.companyForm.pic.indexOf(tmpFile);
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.postInfo(this.companyForm, res => {
            this.$message({
              type: "success",
              message: "更新成功"
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


