<template>
  <div>
    <el-dialog
      title="商品详情"
      :visible.sync="dialogVisible"
      :modal-append-to-body='false'
      width="60%"
      :before-close="handleClose">

      <!--<el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px">

        <el-form-item label="账号" prop="username" >

          <el-input v-model="formValidate.username"  placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password" >
          <el-input type="password" v-model="formValidate.password" placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname" >
          <el-input v-model="formValidate.realname" placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <upload
            @on-transport-file-list="handleTransportFileList"
            :max-size="5120"
            :limit="3"
          >
          </upload>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" >
          <el-input v-model="formValidate.phone"  placeholder="输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" >
          <el-input v-model="formValidate.email" placeholder="输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment" >
          <el-input v-model="formValidate.comment" placeholder="输入备注"></el-input>
        </el-form-item>

      </el-form>-->
      <el-form label-width="150px">
        <div style="font-weight: bold">基本信息</div>
        <el-form-item label="赠品ID">
          <el-input v-model="giftId"></el-input>
        </el-form-item>
        <el-form-item label="赠品名称">
          <el-input v-model="giftName"></el-input>
        </el-form-item>
        <div style="font-weight: bold">商品规格（销售属性）</div>
        <div style="margin: 20px 0 10px 60px">规格设置</div>
        <div style="display: flex">
          <el-form-item label="颜色">
            <el-input v-model="color"></el-input>
          </el-form-item>
          <el-form-item label="库存">
            <el-input v-model="inventory"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button size="mini">添加</el-button>
          </el-form-item>
        </div>
        <el-form-item label="活动主图" >
          <upload
            :max-size="5120"
            :limit="1"
          >
          </upload>
        </el-form-item>
        <div style="display: flex; margin: 20px 0 20px 0">
          <div style="font-weight: bold; margin-right: 40px" >关联商品</div>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addGood">添加商品</el-button>
        </div>
        <el-table
          :data="data"
          style="width: 95%"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="goodId"
            label="商品ID"
          >
          </el-table-column>
          <el-table-column
            prop="goodName"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            prop="goodType"
            label="商品分类"
          >
          </el-table-column>
          <el-table-column
            prop="recommendStatus"
            label="推荐状态"
          >
          </el-table-column>
          <el-table-column
            prop="nowPrice"
            label="现价(元)"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="sales"
            label="销量"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="sortValue"
            label="排序数值"
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
            width="120">
            <template slot-scope="scope">
              <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleCommit">提交</el-button>
      </div>
    </el-dialog>

    <!--    添加商品弹出对话框-->
    <el-dialog
      title="多选"
      :visible.sync="addGoodProps.dialogVisible"
      :modal-append-to-body='false'
      width="30%"
      :before-close="handleCloseAddGood">
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="searchItems"
          @on-search="searchBySearchItem"
        ></search>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="data"
          style="width: 95%;margin:0 auto;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="100">
          </el-table-column>
          <el-table-column
            prop="goodName"
            label="商品名称"
          >
          </el-table-column>
        </el-table>
      </el-col>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addGoodProps.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addGoodProps.dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  export default {
    name: "dialog",
    mixins:[emitter],
    components:{
      Upload, Search
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      }
    },
    data(){
      return{
        addGoodProps:{
          dialogVisible:false
        },
        giftId:"",
        giftName:'',
        color:'',
        inventory:'',
        manager: {},
        searchItems: [
          {
            name: "商品名称",
            key: "goodName",
            type: "string"
          }
        ]
      }
    },
    computed:{
    },
    methods:{
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleCommit(){
        this.$emit('on-dialog-commit');
      },
      handleTransportFileList(fileList){
        console.log(fileList);
      },
      handleCloseAddGood(){
        this.addGoodProps.dialogVisible = false
      },
      // 添加商品事件
      addGood(){
        this.addGoodProps.dialogVisible = true
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
      handleSelectionChange(val) {
        this.selectList = val;
      },
    }
  }
</script>

<style scoped>

</style>
