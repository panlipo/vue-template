<template>
  <div id="app">
    <page></page>
  </div>
</template>

<script>
import page from "./layout/page";
export default {
  components: {
    page
  },
  name: "App"
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
}

/* element 表格border 不齐 */
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
