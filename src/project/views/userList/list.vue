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
        <el-button style="background: rgb(0, 161, 108);border: none" type="primary" @click="exportData">导出</el-button>
<!--        <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>-->
        <el-dropdown :trigger="'click'" @command="handleClick" size="medium">
          <el-button icon="el-icon-menu" style="background:#3e5265;color: white ">更多操作<i :class="menu.visible?'el-icon-caret-top':'el-icon-caret-bottom'"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-circle-check"
              command="启用"
              :disabled="selectList.findIndex(s=>{return s.enabled === true}) >=0 || selectList.length === 0"
              :style="(selectList.findIndex(s=>{return s.enabled === true}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)','cursor': 'not-allowed'}:{'color':'#fff'}"
              @click="batchEnable"
            >
              启用
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-circle-close"
              command="禁用"
              :disabled="selectList.findIndex(s=>{return s.enabled === false}) >=0 || selectList.length === 0"
              :style="(selectList.findIndex(s=>{return s.enabled === false}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
              @click.stop="batchDisable"
            >
              禁用
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-edit"
              command="编辑"
              :disabled="selectList.length !== 1"
              :style="(selectList.length !== 1)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
              @click.stop="handleRowClick"
            >
              编辑
            </el-dropdown-item>
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
        @row-dblclick="handleRowClick"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          >
          <template slot-scope="scope">
            <el-button @click.native.prevent="toDetail(scope.row)" type="text" size="small">{{scope.row.nickname}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="注册时间"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="accessAt"
          label="最近登录时间"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="balanceAmount"
          label="钱包余额"
        >
        </el-table-column>
        <el-table-column
          prop="expenseAmount"
          label="消费金额"
        >
        </el-table-column>
        <el-table-column
          prop="orderQuantity"
          label="订单数"
        >
        </el-table-column>
        <el-table-column
          prop="commentQuantity"
          label="评价数"
        >
        </el-table-column>
        <el-table-column
          prop="afterSalesServiceQuantity"
          label="申请售后数"
        >
        </el-table-column>
        <el-table-column
          prop="enabled"
          label="状态"
        >
          <template slot-scope="scope">
            {{scope.row.enabled === true ? '已启用' : '已禁用'}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.enabled === true ? '禁用' : '启用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <!--    新建-->
    <i-create
      :dialog-visible="createProps.visible"
      @on-dialog-close="handleClose"
    />
    <!--    编辑-->
    <i-edit
      :dialog-visible="editProps.visible"
      :edit-id="editId"
      @on-dialog-close="handleClose"
      :edit-page = 'page'
      @on-edit-search="search"
    />

  </el-row>
</template>
<script>
  import Search from "@/framework/components/search";
  import ICreate from "./create"
  import IEdit from "./edit"
  import {post} from "@/framework/http/request";
  import Emitter from '@/framework/mixins/emitter'
  import {search, count, enable, disable, disableByIds, enableByIds} from '@/project/service/userList'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "user",
        createProps: {
          visible: false
        },
        editProps: {
          visible: false
        },
        menu: {
          visible: false
        },
        editId: 0,//编辑id
        data: [],
        selectList: [],
        sort: {asc: ['id'], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        searchItems: [
          {
            name: "手机号",
            key: "phone",
            type: "string"
          },
          {
            name: "昵称",
            key: "nickname",
            type: "string"
          },
          {
            name: "状态",
            key: "enabled",
            type: "select",
            displayValue: ["已禁用", "已启用"],
            value: ["已禁用", "已启用"]
          },
          {
            name: "最近登录时间",
            key: "accessAt",
            type: "datetimerange",
          },
          {
            name: "注册时间",
            key: "createAt",
            type: "datetimerange",
          }
        ]
      };
    },
    computed: {
      route() {
        return this.$route;
      }
    },
    components: {
      Search, ICreate, IEdit
    },
    methods: {
      // table操作列里面的改变状态
      handleStatusChange(row) {
        let status = row.enabled === true ? "启用" : "禁用"
        let _t = this;
        if (status.indexOf('启用') >= 0) {
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
            disableByIds({ids: [row.id]}, res => {
              _t.$message({
                type: 'success',
                message: '已禁用!'
              });
              _t.search(_t.page);
            })
          } else {
            enableByIds({ids: [row.id]}, res => {
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
      },

      /*handlePageSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(1);
      },*/
      /*handlePageChange(page) {
        this.search(page);
      },*/
      /*handleSortChange(sort) {
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
      },*/

      // 根据条件进行搜索
      searchBySearchItem(searchItems) {
        if(searchItems.enabled){
          searchItems.enabled = searchItems.enabled === "已启用" ? true : false
        }
        //把startcreateAt（endcreateAt）转成startRegistAt（endRegistAt）字段
        for(let i in searchItems){
          if( i === 'startcreateAt'){
            searchItems.startRegistAt = searchItems[i]
            delete searchItems[i]
          }else if( i === 'endcreateAt'){
            searchItems.endRegistAt = searchItems[i]
            delete searchItems[i]
          }
        }
        //startaccessAt（endaccessAt）转成startAccessAt（endAccessAt）字段
        for(let i in searchItems){
          if( i === 'startaccessAt'){
            searchItems.startAccessAt = searchItems[i]
            delete searchItems[i]
          }else if( i === 'endaccessAt'){
            searchItems.endAccessAt = searchItems[i]
            delete searchItems[i]
          }
        }
        this.extraParam = searchItems
        this.search(1);
      },
      // 新建
      toCreate() {
        this.createProps.visible = true;
      },
      // 搜索
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
      // 统计数据数量
      getTotal() {
        let _t = this;
        let param = {[this.model]: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },

      /*handleTransportSelectList(list) {
        this.selectList = list;
        // console.log(this.selectList)
      },*/
      //批量删除
      /*batchDelete() {
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
            enableByIds({ids: [s.id]}, res => {
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
        console.log(123456)
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            disableByIds({ids: [s.id]}, res => {
              _t.search(_t.page);
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      // 删除
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
      /*新建页面和编辑页面关闭或取消事件*/
      handleClose() {
        this.createProps.visible = false;
        this.editProps.visible = false;
        // this.search(1);
      },
      // table中所选择的数据
      handleSelectionChange(val) {
        this.selectList = val;
      },
      // 导出
      exportData(){
        alert("尚未完善")
      },
      // 双击进入编辑
      handleRowClick(row) {
        this.editId = row.id
        this.editProps.visible = true;
      },
      //跳转到详情页
      toDetail(row){
        this.$router.push({path: `/userList/show/` + row.id})
      },
      // 改变页码
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      // 改变每页显示的数据的多少
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(this.page);
      },
      handleClick(command) {
        switch (command) {
          case '编辑':
            console.log('编辑');
            this.editId = this.selectList[0].id
            this.editProps.visible = true;
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
