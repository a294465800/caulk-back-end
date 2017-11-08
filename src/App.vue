<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
html,
body {
  height: 100%;
}
* {
  box-sizing: border-box;
}

ul,
ol {
  list-style: none;
  padding: 0;
  margin: 0;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.warning {
  color: #ffd04b;
}

.success {
  color: #1aad19;
}

.price {
  color: #fa5555;
}

/* 面包屑导航 */
.breadcrumb {
  margin-bottom: 20px;
}

/* 操作 */
.operation {
  text-align: right;
  margin-bottom: 20px;
}

.operation .el-form-item {
  margin-bottom: 0;
}

.operation-btns {
  text-align: left;
  margin-bottom: 20px;
}

/* 页码 */
.pages {
  text-align: right;
  margin-top: 20px;
}

/* 通用 flex */
.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

/* element 组件 */

.el-select .el-input {
  width: 130px;
}

.hide .el-upload {
  display: none;
}

.img-list .el-upload-list__item,
.img-list .el-upload--picture-card {
  width: 250px;
  height: 250px;
}
.img-list .el-upload--picture-card i {
  font-size: 40px;
  line-height: 250px;
}

.el-steps {
  justify-content: center;
}
</style>
