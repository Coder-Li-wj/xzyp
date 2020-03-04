<template>
  <el-row class="page">
    <!--    分页-->
    <el-col :span="24">
      <div style="width: 95%;margin: 10px auto;">
        <div class="pager-group">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, jumper, prev, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-col>
    <!--    表格-->
    <el-col :span="24">
      <el-table
        :data="data"
        style="width: 95%;margin:0 auto;"
      >
        <el-table-column
          prop="id"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          prop="openTime"
          label="开始时间"
        >
        </el-table-column>
        <el-table-column
          prop="finishTime"
          label="结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="订单状态"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click.stop="handleOperate(scope.row)" style="color: blue" type="text" size="small" v-show="scope.row.status == '成功'">订单下载</el-button>
            <span v-show="scope.row.status == '执行中'">执行中，请稍后刷新</span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import {search, count, del, enable, disable} from '@/project/service/user'


  export default {
    name: "show",
    data() {
      return {
        user: {},
        id: this.$route.params.id,
        activeName: 'first',
        pageSize: 10,
        page: 1,
        total: 0,
        data:[
          {id:123456, openTime:'2018-09-09 19:13', finishTime:'2018-09-09 19:13', orderStatus:'等待发货', status:'成功', createTime:'2018-09-09 19:13'},
          {id:654321, openTime:'2018-09-09 19:13', finishTime:'2018-09-09 19:13', orderStatus:'等待发货', status:'执行中', createTime:'2018-09-09 19:13'},
          {id:456789, openTime:'2018-09-09 19:13', finishTime:'2018-09-09 19:13', orderStatus:'等待发货', status:'成功', createTime:'2018-09-09 19:13'},
          {id:987654, openTime:'2018-09-09 19:13', finishTime:'2018-09-09 19:13', orderStatus:'等待发货', status:'失败', createTime:'2018-09-09 19:13'},
          {id:987321, openTime:'2018-09-09 19:13', finishTime:'2018-09-09 19:13', orderStatus:'等待发货', status:'成功', createTime:'2018-09-09 19:13'}
        ]
      }
    },
    created() {
      this.findById();
    },
    methods: {
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
            sort: _t.sort
          },
          [this.model]: _t.extraParam
        };
        if (
          param.pageable.sort.asc.length === 0 &&
          param.pageable.sort.desc.length === 0
        ) {
          delete param.pageable.sort;
        }
        search(param, res => {
          let data = res;
          _t.data = data;
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        let param = {[this.model]: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      // 列表里面的操作
      handleOperate(row){
        alert("尚未实现")
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .text_label{
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .clearfix{
    position: relative;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 92%;
    margin: 20px;
    display: inline-block;
  }
  .box-card-large{
    width: 92%;
    display: inline-block;
    margin: 20px;
  }
  .el-button--text{
    color: #3e5265;
  }
  .el-button--mini{
    padding: 4px 12px;
  }
  .table-button{
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }
</style>
