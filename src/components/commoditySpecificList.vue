<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}

.standard-list {
  max-width: 900px;
  margin: 0 auto 30px;
}

.pages {
  margin-bottom: 30px;
}
</style>

<template>
  <section class="wrap">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/list/commodity' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>库存列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑导航 -->

    <!-- 功能 -->
    <div class="operation">
      <div class="operation-btns">
          <!-- <el-button type="primary" @click="standardAdd">新增规格</el-button> -->
          <!-- <el-button type="danger"  @click="productDeleteAll">删除</el-button> -->
      </div>
    </div>
    <!-- /功能 -->

    <div class="standard-list">
      <el-form :model="productForm" :rules="rules" ref="productForm" label-width="100px" class="demo-productForm">
        <el-form-item label="商品名称">
          <div class="title">{{commodity_title}}</div>
        </el-form-item>
        <el-form-item class="low-label" v-for="(standard, index) in standards" :key="standard.id" :label="standard.title" prop="feature">
          <!-- <el-select v-model="productForm.feature[index]" placeholder="请选择规格">
            <el-option v-for="(tag,tagIndex) in standard.attrs" :key="tag.id" :label="tag.title" :value="tag.id"></el-option>
          </el-select> -->
          <el-radio-group v-model="productForm.feature[index]" size="medium">
            <el-radio style="margin: 0 10px 10px 0;" v-for="(tag,tagIndex) in standard.attrs" :key="tag.id" :label="tag.id">{{tag.title}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="image" label="商品封面">
          <el-upload class="avatar-uploader" name="image" accept="image/gif,image/png,image/jpg,image/jpeg" :action="host" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="beforeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="productForm.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model.number="productForm.stock">
            <template slot="append">件</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('productForm')" style="width: 100%;">新增商品</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tale-list">
      <el-table :data="commodities" border stripe style="min-width: 900px;" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection"></el-table-column> -->
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column prop="title" label="商品名称"></el-table-column>
        <el-table-column prop="attrs" label="具体规格" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="(tag, index) in scope.row.attrs" :key="tag.id" style="margin-right: 5px;">{{tag.title}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            <span class="price">{{scope.row.price}}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存">
          <template slot-scope="scope">
            <span>{{scope.row.stock}}件</span>
          </template>        
        </el-table-column>
        <el-table-column label="商品图片" align="center">
          <template slot-scope="scope">
            <img style="height: 50px; cursor: pointer;" :src="scope.row.pictures?scope.row.pictures.thumb_url:''" :alt="scope.row.title" @click="checkProductImg(scope.row)">
          </template>        
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="productEdit(scope.row)">修改</el-button>
            <el-button size="small" type="danger"  @click="productDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 页码 -->
    <div class="pages">
      <el-pagination :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
    <!-- /页码 -->

    <el-dialog style="text-align: center" title="图片预览" :visible.sync="preImgDialog">
      <img style="height: 100%;" :src="currentImg" alt="图片">
    </el-dialog>

  </section>
</template>

<script>
export default {
  data() {
    return {
      currentImg: "",
      preImgDialog: false,
      host: this.$api.host + "upload",

      commodity_id: "",
      commodity_title: "",

      //搜索 form
      searchForm: {
        status: "0"
      },

      currentPage: 1,
      count: 20,

      //模拟数据
      commodities: [],
      standards: [],

      productForm: {
        commodity_id: sessionStorage.commodity_id,
        price: "",
        stock: "",
        feature: [],
        image: ""
      },
      imageUrl: "",

      rules: {
        price: [
          { type: "number", required: true, message: "价格不能为空", trigger: "blur" }
        ],
        stock: [
          { type: "number", required: true, message: "库存不能为空", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    this.commodity_title = sessionStorage.commodity_title;
    const id = sessionStorage.commodity_id;
    this.$api.getProducts(id, "", res => {
      this.commodities = res.data.data;
      this.count = res.data.count;
    });
    this.$api.getStandards(id, res => {
      this.standards = res.data.data;
      this.commodity_id = id;
    });
  },

  methods: {
    handleUploadSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.productForm.image = res.data.file_name;
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //新增规格，路由跳转
    // standardAdd() {
    //   this.$router.push({ name: "commodityAddStandard" });
    // },
    //查看图片
    checkProductImg(row) {
      this.preImgDialog = true;
      this.currentImg = row.pictures.url;
    },

    //新增库存
    // productdAdd() {
    //   this.$router.push({ name: "commoditySpecificEdit" });
    // },

    /**
     * 列表多选事件
     * @param {array object} selected 当前选中的项
     */
    handleSelectionChange(selected) {
      let temp = [];
      for (let it of selected) {
        temp.push(it.id);
      }
      this.waittingData = temp;
      console.log(this.waittingData);
    },

    //搜索内容
    handleSearch() {
      console.log("search");
    },

    /**
     * 行修改
     * @param {number} index 当前行（数据）索引
     * @param {object} row 当前行（数据）所有信息
     */
    productEdit(row) {
      this.$router.push({
        name: "commoditySpecificEdit",
        params: { product: row }
      });
    },

    /**
     * 行删除
     * @param {number} index 当前行（数据）索引
     * @param {object} row 当前行（数据）所有信息
     */
    productDelete(index, row) {
      this.$confirm("此操作将删除该商品库存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.deleteProduct(row.id, res => {
            this.commodities.splice(index, 1);
            this.count--;
            this.$message({
              type: "success",
              message: "删除成功"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //页码
    handleCurrentChange(page) {
      this.$api.getProducts(this.commodity_id, { page }, res => {
        this.commodities = res.data.data;
        // this.count = res.data.count;
      });
    },

    //提交
    submitForm(formName) {
      const dataForm = this.productForm;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.standards.length > dataForm.feature.length) {
            this.$message({
              type: "warning",
              message: "规格不能留空"
            });
            return false;
          }
          for (let it = 0; it < dataForm.feature.length; it++) {
            if (!dataForm.feature[it]) {
              this.$message({
                type: "warning",
                message: "规格不能留空"
              });
              return false;
            }
          }
          this.$api.postProduct(this.productForm, res => {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.productForm = {
              commodity_id: sessionStorage.commodity_id,
              price: "",
              stock: "",
              feature: [],
              image: ""
            };
            this.imageUrl = "";
            this.$api.getProducts(sessionStorage.commodity_id, "", res => {
              this.commodities = res.data.data;
              this.count = res.data.count;
            });
          });
        } else {
          this.$message({
            type: "warning",
            message: "信息填写不正确"
          });
          return false;
        }
      });
    }
  }
};
</script>

