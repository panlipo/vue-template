<template>
  <div class="upload">
    <el-upload
      action="#"
      list-type="picture-card"
      :show-file-list="false"
      class="avatar-uploader"
      :auto-upload="false"
      :on-change="uploadfile"
      style="overflow:hidden"
    >
      <img v-if="image" :src="image" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ["image"],
  data() {
    return {};
  },
  methods: {
    uploadfile(file, fileList) {
      console.log(file, fileList);
      var data = new FormData();
      data.append("file", file.raw);
      this.$http.uploadfile(data).then(res => {
        if (res.status === 200) {
          console.log(res.data.src);
          this.$emit("getimage", res.data.src);
        }
      });
    }
  }
};
</script>

<style lang="less">
.avatar {
  height: 148px;
  max-width: 500px;
  min-width: 148px;
}
</style>