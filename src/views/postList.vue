<template>
  <div>
    <el-table :data="tableData" style="width: 100%; margin-bottom:20px;">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column label="显示" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.open === 1 ? '打开': '关闭'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.type === 1 ? '文章': '视频'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-button
            size="mini"
            :type="scope.row.open === 0 ? 'success': 'danger'"
            @click="handleDelete(scope.$index, scope.row)"
          >{{scope.row.open === 0 ? '打开': '关闭'}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      // 跳转到编辑页
      this.$router.push("/post_edit/" + row.id);
    },

    handleDelete(index, row) {
      this.$axios({
        url: "/post_update/" + row.id,
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user") || `{}`).token
        },
        data: {
          open: Number(!row.open)
        }
      }).then(res => {
        this.getList();
      });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },

    getList() {
      this.$axios({
        url: `/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      }).then(res => {
        const { data } = res.data;

        this.tableData = data;
      });
    }
  },

  mounted() {
    this.getList();

    this.$axios({
      url: `/post?pageIndex=${this.pageIndex}&pageSize=9999`
    }).then(res => {
      const { data } = res.data;
      this.total = data.length;
    });
  }
};
</script>