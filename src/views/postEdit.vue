<template>
  <div style="padding:30px;">
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="内容" v-if="form.type === 1">
        <VueEditor :config="config" ref="vueEditor" />
      </el-form-item>

      <el-form-item label="封面">
        <el-upload
          :action="`${$axios.defaults.baseURL}/upload`"
          name="file"
          :headers="{
             Authorization: token
          }"
          list-type="picture-card"
          :file-list="form.cover"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 导入富文本编辑器
import VueEditor from "vue-word-editor"; // vue-quill-editor tiny
import "quill/dist/quill.snow.css";

export default {
  name: "app",
  data() {
    return {
      form: {
        title: "",
        content: "",
        cover: [],
        type: 1
      },

      allCate: [],
      token: JSON.parse(localStorage.getItem(`user`) || `{}`).token,

      config: {
        uploadImage: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "file",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user") || `{}`)
              .token
          },
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "file",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user") || `{}`)
              .token
          },
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data.data.url);
          }
        }
      }
    };
  },

  components: {
    VueEditor
  },

  methods: {
    onSubmit() {
      // 使用refs获取编辑器中内容
      if (this.form.type === 1) {
        this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      }

      this.$axios({
        url: "/post_update/" + this.$route.params.id,
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user") || `{}`).token
        },
        data: this.form
      }).then(res => {
        const { message } = res.data;

        this.$message.success(message);
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.cover = fileList;
    },

    handleSuccess(res, file) {
      this.form.cover.push({
        id: res.data.id,
        url: this.$axios.defaults.baseURL + res.data.url
      });
    },

    handleVideoSuccess(res) {
      this.form.content = this.$axios.defaults.baseURL + res.data.url;
    }
  },

  mounted() {
    const id = this.$route.params.id;

    this.$axios({
      url: "/post/" + id
    }).then(res => {
      const { data } = res.data;

      this.form = {
        title: data.title,
        content: "",
        cover: [],
        type: data.type
      };

      data.cover.forEach(v => {
        if (v.url.indexOf("http") === -1) {
          // 本地服务器的图片
          v.url = this.$axios.defaults.baseURL + v.url;
        }

        // 修改没有http开头的本地图片
        this.form.cover.push(v);
      });

      this.$refs.vueEditor.editor.clipboard.dangerouslyPasteHTML(
        0,
        data.content
      );
    });
  }
};
</script>

<style>
</style>