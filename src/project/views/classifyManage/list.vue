<template>
  <el-row class="page">
    <!--    搜索-->
    <el-col :span="24">
      <search
        style="width: 95%;margin: 10px auto"
        :search-items="searchItems"
        @on-search="searchBySearchItem"
      ></search>
    </el-col>
    <!--    按钮和分页-->
    <el-col :span="24">
      <div style="width: 95%;margin: 10px auto;">
        <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="toCreate">新建</el-button>
<!--        <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>-->
        <el-dropdown :trigger="'click'" @command="handleClick" size="medium" @visible-change="onMenuChange">
          <el-button icon="el-icon-menu" style="background:#3e5265;color: white ">更多操作<i :class="menu.visible?'el-icon-caret-top':'el-icon-caret-bottom'"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-circle-check"
              command="启用"
              :disabled="selectList.findIndex(s=>{return s.status === '启用'}) >=0 || selectList.length === 0"
              :style="(selectList.findIndex(s=>{return s.status === '启用'}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)','cursor': 'not-allowed'}:{'color':'#fff'}"
              @click="batchEnable"
            >
              启用
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-circle-close"
              command="禁用"
              :disabled="selectList.findIndex(s=>{return s.status === '禁用'}) >=0 || selectList.length === 0"
              :style="(selectList.findIndex(s=>{return s.status === '禁用'}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
              @click.stop="batchDisable"
            >
              禁用
            </el-dropdown-item>
            <!--<el-dropdown-item
              icon="el-icon-edit"
              command="编辑"
              :disabled="selectList.length !== 1"
              :style="(selectList.length !== 1)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
              @click.stop="handleEdit"
            >
              编辑
            </el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
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
        @selection-change="handleSelectionChange"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <!--<el-table-column
          prop="classifyId"
          label="分类ID"
        >
        </el-table-column>-->
        <el-table-column
          prop="type"
          label="类型"
        >
        </el-table-column>
        <el-table-column
          prop="classifyName"
          label="分类名称"
        >
        </el-table-column>
        <el-table-column
          prop="sortNumber"
          label="排序数值"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          align="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
<!--            <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>
            <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">编辑</el-button>-->
            <el-link type="primary" v-show="scope.row.type == '一级分类'" @click="addSubclass">添加子类</el-link>
            <el-link type="primary" v-show="scope.row.type == '一级分类'" @click="handleFirstEdit(scope.row)">编辑1</el-link>
            <el-link type="primary" v-show="scope.row.type == '二级分类'" @click="handleSecondEdit">编辑2</el-link>
            <el-link type="primary" @click.stop="handleStatusChange(scope.row)">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <!--    新建一级分类-->
    <i-create
      :dialog-visible="createProps1.visible"
      @on-dialog-close="handleClose"
      @on-dialog-confirm="handleFirstCreateConfirm"
    />
    <!--    添加子类-->
    <second-create
      :dialog-visible="createProps2.visible"
      @on-dialog-close="handleClose"
      @on-dialog-confirm="handleSubclassConfirm"
      />
    <!--    一级分类编辑-->
    <i-edit
      :dialog-visible="editProps1.visible"
      :edit-id="editId"
      @on-dialog-close="handleClose"
      @on-dialog-confirm="handleFirstEditConfirm"
    />
    <!--    二级分类编辑-->
    <second-edit
      :dialog-visible="editProps2.visible"
      :edit-id="editId"
      @on-dialog-close="handleClose"
      @on-dialog-confirm="handleSecondEditConfirm"
    />
  </el-row>
</template>
<script>
  import Search from "@/framework/components/search";
  import ICreate from "./create"
  import SecondCreate from './secondCreate'
  import IEdit from "./edit"
  import SecondEdit from './secondEdit'
  import {post} from "@/framework/http/request";
  import Emitter from '@/framework/mixins/emitter'
  import {search, count, del, enable, disable} from '@/project/service/user'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "userList",
        createProps1: {//新建一级分类
          visible: false
        },
        createProps2: {//添加子类
          visible: false
        },
        editProps1: {
          visible: false
        },
        editProps2: {
          visible: false
        },
        menu: {
          visible: false
        },
        editId: 0,//编辑id
        data: [
          {id:1, classifyId:123456, type:"一级分类", classifyName:"华为手机", sortNumber:88, status:"已启用", children:[
              {id:11, classifyId:987654, type:"二级分类", classifyName:"华为Mate", sortNumber:11, status:"已禁用"},
              {id:12, classifyId:369852, type:"二级分类", classifyName:"华为P系列", sortNumber:22, status:"已启用"}
            ]},
          {id:2, classifyId:789456, type:"一级分类", classifyName:"小米手机", sortNumber:16, status:"已禁用", children:[
              {id:21, classifyId:987654, type:"二级分类", classifyName:"小米mix", sortNumber:33, status:"已禁用"},
              {id:22, classifyId:369852, type:"二级分类", classifyName:"小米note", sortNumber:44, status:"已启用"}
            ]},
          {id:3, classifyId:456123, type:"一级分类", classifyName:"智能穿戴", sortNumber:50, status:"已启用"},
          {id:4, classifyId:654321, type:"一级分类", classifyName:"笔记本", sortNumber:20, status:"已禁用", children:[
              {id:11, classifyId:135451, type:"二级分类", classifyName:"华硕", sortNumber:55, status:"已禁用"},
              {id:12, classifyId:363345, type:"二级分类", classifyName:"联想", sortNumber:66, status:"已启用"}
            ]},
          {id:5, classifyId:147258, type:"一级分类", classifyName:"智能家居", sortNumber:45, status:"已禁用"},
          {id:6, classifyId:258369, type:"一级分类", classifyName:"配件", sortNumber:65, status:"已启用"},
        ],
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        searchItems: [
          /*{
            name: "分类ID",
            key: "classifyId",
            type: "string"
          },*/
          {
            name: "分类名称",
            key: "classifyName",
            type: "string"
          },
          {
            name: "类型",
            key: "type",
            type: "string",
          },
          {
            name: "状态",
            key: "status",
            type: "select",
            displayValue: ["禁用", "启用"],
            value: ["禁用", "启用"]
          }
        ],
      };
    },
    computed: {
      route() {
        return this.$route;
      }
    },
    components: {
      Search, ICreate, IEdit, SecondCreate, SecondEdit
    },
    methods: {
      // 表格里面的操作，一级分类编辑事件
      handleFirstEdit(){
        this.editProps1.visible = true;
      },
      // 表格里面的操作，二级分类编辑事件
      handleSecondEdit(){
        this.editProps2.visible = true;
      },
      // 新建一级分类事件
      toCreate() {
        this.createProps1.visible = true;
      },
      // 表格里面的操作，添加子类事件
      addSubclass(){
        this.createProps2.visible = true;
      },
      handleEdit() {
        this.editId = this.selectList[0].id
        this.editProps1.visible = true;
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
      handlePageSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(1);
      },
      handlePageChange(page) {
        this.search(page);
      },
      handleSortChange(sort) {
        let key = sort.key;
        let order = sort.order;
        let asc = this.sort.asc;
        let desc = this.sort.desc;
        if (asc.indexOf(key) > -1) {
          let idx = asc.indexOf(key);
          asc.splice(idx, 1);
        }
        if (desc.indexOf(key) > -1) {
          let idx = desc.indexOf(key);
          desc.splice(idx, 1);
        }
        if (order !== "normal") {
          this.sort[order].push(key);
        }
        this.search(1);
      },
      searchBySearchItem(searchItems) {
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.searchItems,
            len = searchItemList.length;
          i < len;
          i++
        ) {
          keys.push(searchItemList[i].key);
        }
        for (let i in keys) {
          if (searchItems[keys[i]]) {
            this.extraParam[keys[i]] = searchItems[keys[i]];
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        this.search(1);
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
      handleTransportSelectList(list) {
        this.selectList = list;
      },
      //批量删除
/*      batchDelete() {
        this.broadcast("SiTable", "on-get-selectList");
        this.$nextTick(() => {
          let selectList = this.selectList;
          if (selectList.length === 0) {
            this.$notify.warning({
              title: "至少选择一条数据"
            });
            return;
          }
          this.$confirm('确定删除所选记录吗?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            del({ids: ids}, res => {
              _t.search(_t.page);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        });
      },*/
      //批量启用
      batchEnable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            enable({id: s.id}, res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //批量禁用
      batchDisable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            disable({id: s.id}, res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },

      delete(id) {
        let _t = this;
        del({id: id}, res => {
          _t.search(_t.page);
        });
      },
      enable(id, url) {
        let _t = this;
        post(url, {id: id}, res => {
          _t.search(_t.page);
        });
      },
      /*新建页面和编辑页面关闭或取消事件*/
      handleClose() {
        this.createProps1.visible = false;
        this.createProps2.visible = false;
        this.editProps1.visible = false;
        this.editProps2.visible = false;
      },
      // 新建一级分类页面的确定事件
      handleFirstCreateConfirm(){
        this.createProps1.visible = false;
      },
      // 添加子类页面的确定事件
      handleSubclassConfirm(){
        this.createProps2.visible = false;
      },
      // 编辑一级分类页面的确定事件
      handleFirstEditConfirm(){
        this.editProps1.visible = false;
      },
      // 编辑二级分类页面的确定事件
      handleSecondEditConfirm(){
        this.editProps2.visible = false;
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      // 导出
      exportData(){
        alert("尚未完善")
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      },
      onMenuChange(val) {
        console.log(val);
      },
      handleClick(command) {
        switch (command) {
          case '编辑':
            console.log('编辑');
            this.editId = this.selectList[0].id;
            this.editProps1.visible = true;
            break;
          case '启用':
            console.log('启用');
            this.batchEnable();
            break;
          case '禁用':
            console.log('禁用')
            this.batchDisable();
            break;
        }
      }
    },
    mounted() {
      // this.search(1);
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
