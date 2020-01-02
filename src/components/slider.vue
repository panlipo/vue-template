<template>
  <div class="aside">
    <div class="navMenu" style="margin-bottom: -17px; margin-right: -17px;">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @select="handselect"
        background-color="#545c64"
        active-text-color="#ffd04b"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <slideritem v-for="(item,index) in routerlist" :key="index" :info="item"></slideritem>
      </el-menu>
    </div>
  </div>
</template>
<script>
import slideritem from "./slideritem";
export default {
  props: ["isCollapse"],
  data() {
    return {
      routerlist: []
    };
  },
  components: {
    slideritem
  },
  watch: {},
  mounted() {
    console.log(this.$router.options.routes);
    this.routerlist = this.$router.options.routes;
  },
  methods: {
    handselect(key, keyPath) {
      console.log(key, keyPath);
      // var str = "";
      // keyPath.forEach(item => {
      //   str = str + item + "/";
      // });
      // str = str.substring(0, str.length - 1);
      this.$router.push(key);
    }
  }
};
</script>
<style lang="less">
.aside {
  width: 100%;
  overflow: hidden;
  height: 100%;
  .navMenu {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    .el-menu-vertical-demo {
      width: 100%;
    }
  }
}
</style>
