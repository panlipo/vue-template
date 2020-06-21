<template>
  <div class="page">
    <router-view v-if="$route.name =='Login' || $route.name =='Changepass'" />
    <template v-else>
      <div class="slider" :style="{'width':(isCollapse?'65px':'200px')}">
        <keep-alive>
          <slider :isCollapse="isCollapse"></slider>
        </keep-alive>
      </div>
      <div class="container" :style="{'margin-left': isCollapse? '64px ': '200px',}">
        <div class="header">
          <keep-alive>
            <myheader @changeCollapse="getCollapse"></myheader>
          </keep-alive>
        </div>
        <div class="main">
          <router-view />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import slider from "../components/slider";
import myheader from "../components/myheader";
export default {
  components: {
    slider,
    myheader
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    getCollapse(val) {
      this.isCollapse = val;
    }
  }
};
</script>
<style lang="less">
.page {
  height: 100%;
  display: flex;
  .header {
    min-width: 1000px;
  }
  .slider {
    width: 200px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    transition: all 0.3s;
    background: #545c64;
    z-index: 999;
  }
  .container {
    margin-left: 200px;
    flex: 1;
    transition: all 0.3s;
    width: -webkit-calc(100% - 200px);
    width: -moz-calc(100% - 200px);
    width: calc(100% - 200px);
  }
  .main {
    padding: 30px;
    box-sizing: border-box;
    min-width: 1100px;
  }
}
.mt20 {
  margin-top: 20px;
}
.ml20 {
  margin-left: 20px !important;
}
.mr20 {
  margin-right: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
.flex_c_c {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_b_c {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex__c {
  display: flex;
  align-items: center;
}
</style>
