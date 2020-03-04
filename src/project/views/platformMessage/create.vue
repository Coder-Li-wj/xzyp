<template>
  <el-dialog
    title="编辑文章"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">

    <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">基本信息</div>

    <el-form ref="formValidate" label-width="150px" >
      <el-form-item label="推送方式">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息标题">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="图文详情">
        <Editor :defaultContent="detailContent" @on-change-content="onChangeDetailEditor"/>
      </el-form-item>
      <el-form-item label="推送对象" style="margin-top: 100px">
        <template>
          <el-radio v-model="radio" label="1">全部用户</el-radio>
          <el-radio v-model="radio" label="2">指定用户</el-radio>
        </template>
        <div v-if="radio == '2'">
          <el-col :span="24">
            <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="addGood">添加</el-button>
          </el-col>
          <!--表格-->
          <el-col :span="24">
            <el-table
              :data="data"
              style="width: 100%;margin:0 auto;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="username"
                label="User ID"
              >
              </el-table-column>
              <el-table-column
                prop="realname"
                label="手机号"
              >
              </el-table-column>
              <el-table-column
                prop="realname"
                label="昵称"
              >
              </el-table-column>
              <el-table-column
                fixed="right"
                align="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <!--添加用户-->
          <el-dialog
            title="添加用户"
            :visible.sync="addUserProps.dialogVisible"
            :modal-append-to-body='false'
            width="40%"
            :before-close="handleCloseUser">
            <!--搜索-->
            <el-col :span="24">
              <search
                style="width: 95%;margin: 10px auto"
                :search-items="searchItemsGood"
                @on-search="searchBySearchItem"
              ></search>
            </el-col>
            <!--表格-->
            <el-col :span="24">
              <el-table
                :data="data"
                style="width: 100%;margin:0 auto;"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="商品ID"
                >
                </el-table-column>
                <el-table-column
                  prop="realname"
                  label="商品标题"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  align="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addUserProps.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUserProps.dialogVisible = false">确 定</el-button>
          </span>
          </el-dialog>
        </div>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返回上一页</el-button>
      <el-button type="primary" @click="handleCommit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Search from "@/framework/components/search";
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import Editor from "@/framework/components/editor"
  import { save } from '@/project/service/manager'
  export default {
    name: "create",
    mixins:[emitter],
    components:{
      Upload, Editor, Search
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      }
    },
    data(){
      return{
        addUserProps:{
          dialogVisible: false
        },
        radio: '1',
        options: [
          {
            value: '选项1',
            label: '通知栏推送'
          }, {
            value: '选项2',
            label: 'APP内消息中心推送'
          },
        ],
        searchItemsGood:[
          {
            name: "手机号",
            key: "goodTitle",
            type: "string"
          },
        ],
        detailContent:'',
      }
    },
    computed:{
    },
    methods:{
      /*关闭窗口事件*/
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
        this.active = 0
      },
      addGood(){
        this.addUserProps.dialogVisible = true
      },
      handleCloseUser(){
        this.addUserProps.dialogVisible = false
      },
      handleCommit(){
        this.$emit('on-dialog-commit');
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      handleStatusChange(row) {
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
      onChangeDetailEditor(val){
        this.detailContent = val.html;
      },
    }
  }
</script>

<style scoped>

</style>
