<template>
  <el-row type="flex" justify="center" align="middle" class="container">
    <div class="form-wrap">
      <h3>登录页</h3>

      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },

      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/login",
            method: "POST",
            data: this.form
          }).then(res => {
            let { message, statusCode, data } = res.data;

            if (statusCode === 401) {
              this.$message.error(message);
              return;
            }

            this.$message.success(message);
            localStorage.setItem("user", JSON.stringify(data));

            setTimeout(() => {
              this.$router.push("/");
            }, 800);
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  h3 {
    text-align: center;
    margin-bottom: 20px;
  }
}

.form-wrap {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 400px;
}
</style>