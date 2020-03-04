<template>
  <el-row class="page">
    <!--    表格-->
    <el-col :span="24">
      <el-table
        :data="data"
        style="width: 95%;margin:0 auto;"
        @selection-change="handleSelectionChange"
        @row-dblclick="handleRowClick"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="reportName"
          label="质检报告名称"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="200">
          <template slot-scope="scope">
<!--            <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>-->
            <el-button type="text" style="padding-right: 0" @click="handleEdit">编辑</el-button>
            <span style="color: #C0C4CC">|</span>
            <el-button type="text" style="padding-left: 0; color: red" @click="handleDisable">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <!--    编辑-->
    <i-edit
      :dialog-visible="editProps.visible"
      :edit-id="editId"
      @on-dialog-close="handleClose"
      @on-dialog-commit="handleCommit"
    />


  </el-row>
</template>
<script>
  import IEdit from "./edit"
  import {post} from "@/framework/http/request";
  import Emitter from '@/framework/mixins/emitter'
  import {search, count, del, enable, disable} from '@/project/service/user'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "checkProjectManage",
        editProps: {
          visible: false
        },
        menu: {
          visible: false
        },
        editId: 0,//编辑id
        data: [],
        selectList: [],
        data:[
          {reportName:'安卓机99成新'},
          {reportName:'安卓机88成新'},
          {reportName:'笔记本77成新'},
          {reportName:'苹果机55成新'}
        ]
      };
    },
    computed: {
      route(){
        return this.$route;
      }
    },
    components: {
      IEdit
    },
    methods: {
      handleRowClick(row) {
        this.editId = row.id
        this.editProps.visible = true;
      },
      // 表格中的编辑操作
      handleEdit() {
        // this.editId = this.selectList[0].id
        this.editProps.visible = true;
      },
      // 编辑对话框里面的取消或关闭弹框操作
      handleClose(){
        this.editProps.visible = false
      },
      // 编辑对话框里面的提交操作
      handleCommit(){
        this.editProps.visible = false
      },
      // 表格中的禁用操作
      handleDisable(){
        alert("尚未实现")
      },
      /*handleStatusChange(row) {
        let status;
        let _t = this;
        if (row.status.indexOf('启用') >= 0) {
          status = '禁用'
        } else {
          status = '启用'
        }
        this.$confirm(`确定${status}选中内容？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (status === '禁用') {
            disable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已禁用!'
              });
              _t.search(_t.page);
            })
          } else {
            enable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已启用!'
              });
              _t.search(_t.page);
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },*/
      /*handleTransportSelectList(list) {
        this.selectList = list;
      },*/
      /*delete(id) {
        let _t = this;
        del({id: id}, res => {
          _t.search(_t.page);
        });
      },*/
      /*enable(id, url) {
        let _t = this;
        post(url, {id: id}, res => {
          _t.search(_t.page);
        });
      },*/
      handleSelectionChange(val) {
        this.selectList = val;
        console.log(this.selectList)
      },
    },
    mounted() {
      this.search(1);
      // this.findAllRoles();
    }
  };
</script>


<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-button+.el-button{
    margin-left: 2px;
  }
  .el-button--default:hover{
    color: #00a16c;
    border: 1px solid#00a16c;
    background: white;
  }
  .footor{
    margin:10px 30px;
    width: 90%;
    text-align: right;
  }
</style>
