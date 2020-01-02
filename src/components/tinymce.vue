<template>
  <div class="tinymce">
    <editor v-model="myValue" :init="init"></editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";

// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
// import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount"
    },
    toolbar: {
      type: [String, Array],
      default() {
        return [
          "undo redo |  formatselect  fontsizeselect | bold italic underline strikethrough forecolor backcolor |",
          " alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |  image  table  removeformat |"
        ];
      }
    }
  },

  data() {
    // 获取项目地址 例：'www.***.com/test/tinymce/skins/ui/oxide'  的  '/test/'
    // 获取项目地址 例：'/test/tinymce/skins/ui/oxide'  的  '/test/'
    let baseurl = window.location.pathname;
    return {
      init: {
        language_url: `${baseurl}tinymce/langs/zh_CN.js`,
        language: "zh_CN",
        skin_url: `${baseurl}tinymce/skins/ui/oxide`,
        // skin_url: '/tinymce/skins/ui/oxide-dark',//暗色系
        height: 300, //编辑器高度
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false, //是否禁用“Powered by TinyMCE”
        menubar: false, //顶部菜单栏显示
        images_upload_handler: (blobInfo, success, failure) => {
          console.log(blobInfo, success, failure);
          //   获取file
          console.log(blobInfo.blob());
          var data = new FormData();
          data.append("file", blobInfo.blob());
          this.$http.uploadfile(data).then(res => {
            if (res.status === 200) {
              console.log(res.data.src);
              success(res.data.src);
            }
          });
        }
      },
      myValue: this.value
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // onClick(e) {
    //   this.$emit("onClick", e, tinymce);
    // }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>

<style>
</style>