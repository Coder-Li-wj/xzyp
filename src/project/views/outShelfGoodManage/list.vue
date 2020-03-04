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
<!--    批量设置-->
<!--    <el-col :span="24">
      <el-form :inline="true">
        <el-form-item label="批量设置标签" style="margin-left: 42px">
          <el-select placeholder="请选择">
            <el-option label="热销" value="shanghai"></el-option>
            <el-option label="爆款" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="batchSet">批量设置</el-button>
        </el-form-item>
        <el-form-item label="批量取消标签" style="margin-left: 42px">
          <el-select placeholder="请选择">
            <el-option label="热销" value="shanghai"></el-option>
            <el-option label="爆款" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="batchCancel">批量设置</el-button>
        </el-form-item>
      </el-form>
    </el-col>-->
<!--    按钮和分页-->
    <el-col :span="24">
      <div style="width: 95%;margin: 10px auto;">
<!--        <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="toCreate">新建</el-button>-->
        <el-dropdown :trigger="'click'" @command="handleClick" size="medium" @visible-change="onMenuChange">
          <el-button icon="el-icon-menu" style="background:#3e5265;color: white ">更多操作<i :class="menu.visible?'el-icon-caret-top':'el-icon-caret-bottom'"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              icon="el-icon-upload2"
              command="上架"
              :disabled="selectList.length !== 1"
              :style="(selectList.length !== 1)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
              @click.stop="batchShelve"
            >
              上架
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-edit"
              command="编辑"
              :disabled="selectList.length !== 1"
              :style="(selectList.length !== 1)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
              @click.stop="handleEdit"
            >
              编辑
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
          </el-dropdown-menu>
        </el-dropdown>
<!--        分页-->
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
          prop="goodName"
          label="商品名称"
          >
        </el-table-column>
        <el-table-column
          label="商品图片"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.avatar"
              fit="fit"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="limitPurchase"
          label="限购"
        >
        </el-table-column>
        <el-table-column
          prop="newPhonePrice"
          label="全新机价格"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="售价"
        >
        </el-table-column>
        <el-table-column
          prop="repertory"
          label="库存"
        >
        </el-table-column>
        <el-table-column
          prop="goodType"
          label="商品分类"
        >
        </el-table-column>
        <el-table-column
          prop="sales"
          label="销量"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          sortable
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-link type="primary" @click="batchShelve(scope.row)">上架</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

<!--    新建-->
<!--    <i-create
      :dialog-visible="createProps.visible"
      @on-dialog-close="handleClose"
      @on-dialog-submit="handleCreateSubmit"
    />-->
<!--    编辑-->
    <i-edit
      :dialog-visible="editProps.visible"
      :edit-id="editId"
      @on-dialog-close="handleClose"
      @on-dialog-submit="handleEditSubmit"
   />


  </el-row>
</template>
<script>
  import Search from "@/framework/components/search";
  // import ICreate from "./create"
  import IEdit from "./edit"
  import {post} from "@/framework/http/request";
  import Emitter from '@/framework/mixins/emitter'
  import {search, count, del, enable, disable} from '@/project/service/manager'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "manager",
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
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        imageSrc:'',
        searchItems: [
          {
            name: "商品名称",
            key: "username",
            type: "string"
          },
          {
            name: "商品分类",
            key: "goodType",
            type: "select",
            displayValue: ["智能手机>华为", "笔记本电脑>华硕", "智能手机>小米"],
            value: ["智能手机>华为", "笔记本电脑>华硕", "智能手机>小米"]
          },
          {
            name: "更新时间",
            key: "createAt",
            type: "date"
          },
        ],
      };
    },
    computed: {
      route() {
        return this.$route;
      }
    },
    components: {
      Search, IEdit
    },
    methods: {
      handleEdit() {
        this.editId = this.selectList[0].id
        this.editProps.visible = true;
      },
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
/*      toCreate() {
        this.createProps.visible = true;
      },*/
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
      // 新建和编辑对话框的关闭事件
      handleClose() {
        this.createProps.visible = false;
        this.editProps.visible = false;
      },
      // 新建对话框的提交事件
      handleCreateSubmit(){
        this.createProps.visible = false;
        alert("尚未完善")
      },
      // 编辑对话框的提交事件
      handleEditSubmit(){
        this.editProps.visible = false;
        alert("尚未完善")
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      handleRowClick(row) {
        this.editId = row.id
        this.editProps.visible = true;
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
            this.editProps.visible = true;
            break;
          case '上架':
            console.log('上架');
            alert("尚未实现")
            break;
          case '禁用':
            console.log('禁用');
            alert("尚未实现")
            break;
        }
      },
      // 批量设置标签事件
      /*batchSet(){
        alert("尚未实现")
      },*/
      // 批量取消标签事件
      /*batchCancel(){
        alert("尚未实现")
      },*/
      // 上架事件
      batchShelve(){
        alert("尚未实现")
      }
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
  .demo-form-inline{
    /*display: flex;*/
  }
</style>
