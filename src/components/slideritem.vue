<template>
  <fragment v-if="!info.hidden">
    <template v-if="info.children">
      <el-submenu :index="info.path">
        <template slot="title">
          <i :class="info.meta.icon"></i>
          <span>{{info.meta.title}}</span>
        </template>
        <slideritem v-for="(item,index) in info.children" :key="index" :info="item"></slideritem>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item :index="info.meta.pullpath">
        <i :class="info.meta.icon"></i>
        <span slot="title">{{info.meta.title}}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>
<script>
export default {
  name: "slideritem",
  props: ["info"],
  mounted() {
    // console.log(this.info);
  },
  methods: {}
};
</script>
<style>
</style>
