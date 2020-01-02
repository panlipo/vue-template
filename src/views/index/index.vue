<template>
  <div class="index">
    <tinymce v-model="msg" @input="getval"></tinymce>
    <upload :image="image" @getimage="getimage"></upload>
  </div>
</template>

<script>
import tinymce from "../../components/tinymce";
import upload from "../../components/upload";
export default {
  name: "index",
  data() {
    return {
      content: "Welcome to Your Vue.js App",
      image: "",
      msg: "Welcome to Use Tinymce Editor"
    };
  },
  components: {
    upload,
    tinymce
  },
  methods: {
    getval(val) {
      console.log(val);
      this.msg = val;
    },
    getimage(val) {
      console.log(val);
      this.image = val;
    }
  }
};
</script>

<style lang="less">
.avatar {
  height: 148px;
}
</style>
