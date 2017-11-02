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

/* 面包屑导航 */
.breadcrumb {
  margin-bottom: 20px;
}

/* 操作 */
.operation {
  text-align: right;
  padding: 1px;
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
</style>
