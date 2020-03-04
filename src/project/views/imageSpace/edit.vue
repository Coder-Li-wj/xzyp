<template>
  <div>
    <el-dialog
      title="编辑相册"
      :visible.sync="dialogVisible"
      :modal-append-to-body='false'
      width="55%"
      :before-close="handleClose">

      <el-tabs v-model="activeName">
        <el-tab-pane label="相册信息" name="first">
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">基本信息</div>

        <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px" >
          <el-form-item label="相册名称" prop="name">
            <el-input placeholder="请输入" v-model="formValidate.name"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="comment" style="width: 50%;">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入"
              v-model="formValidate.comment"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

        <el-tab-pane label="相册收藏" name="second">
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
          <!--遍历展示图片-->
          <div v-for="item in pictureList">
<!--              <div style="float: left; width: 20%;">-->
              <div style="float: left; width: 18%; margin-right: 2%">
                 <div class="handleStyle">
                   <el-image :src="item.path" style="height: 150px;" @click="selectImage(item.id)" :style="{}"></el-image>
                 </div>
                <div style="text-align: center;">{{ item.name }}</div>
                <div style="text-align: center; margin-bottom: 20px">id：{{ item.id }}</div>
              </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose('formValidate')">返回上一页</el-button>
        <el-button type="primary" @click="handleCommit('formValidate')">提交</el-button>
      </div>
    </el-dialog>

    <!--新建图片-->
    <el-dialog
      title="提示"
      :visible.sync="createProps.visible"
      :modal-append-to-body="false"
      width="30%"
      :before-close="handleCancelCreate">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" >
        <el-form-item label="图片" prop="path">
          <upload
            @on-transport-file-list="handleTransportFileList"
            :max-size="5120"
            :limit="1"
          >
          </upload>
        </el-form-item>
        <el-form-item label="备注" prop="comment" style="width: 80%;">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入"
            v-model="ruleForm.comment"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="图片名称" prop="name">
          <el-input placeholder="请输入" v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelCreate('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="handleConfirmCreate('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import Editor from "@/framework/components/editor"
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import {search, saveAndUpdate, findById} from '@/project/service/album'
  import { findByAlbumIdAndName, save, countByAlbumIdAndName, disableById, enableById } from '@/project/service/photo'

  export default {
    name: "edit",
    mixins:[emitter],
    components:{
      Upload, Editor, Search
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },
      editId:{
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        model: "album",
        formValidate:{
          name:'',
          comment:''
        },
        ruleValidate: {
          name: [
            {
              required: true,
              message: "请输入相册名称",
              trigger: "blur"
            }
          ],
        },
        ruleForm:{
          path:'',
          comment:'',
          name:''
        },
        rules:{
          path: [
            {
              required: true,
              message: "请上传图片",
              trigger: "blur"
            }
          ],
          name: [
            {
              required: true,
              message: "请输入相册名称",
              trigger: "blur"
            }
          ],
        },
        activeName: 'first',
        createProps: {
          visible: false
        },
        menu: {
          visible: false
        },
        pictureList:[],
        data: [],
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        searchItems: [
          {
            name: "名称",
            key: "name",
            type: "string"
          }
        ]
      };
    },
    computed:{
    },
    watch: {
      editId(val) {
        this.findById(val);
        // this.findByAlbumIdAndName(val)
      }
    },
    methods:{
      selectImage(id){

        console.log(id)
      },
      handleImage(id){
        console.log(id)
      },
      handleCancelCreate(){
        this.createProps.visible = false
      },
      handleConfirmCreate(formName){
        this.ruleForm.album = {
          id:this.editId
        }
        this.broadcast('SiUpload','on-form-submit',() => {});//事件广播
        this.$refs[formName].validate((valid) => {
          if (valid) {
              save({photo:this.ruleForm}, res => {
                this.$message({message:"新建成功",type: 'success'})
                this.$refs[formName].resetFields();
                this.formValidate.comment = ""
                this.search(1);
              })
            this.createProps.visible = false
          } else {
            return false;
          }
          this.createProps.visible = false
        });
      },
      /*关闭窗口事件*/
      handleClose(){
        this.$emit('on-dialog-close');
        this.activeName = "first"
      },
      handleCommit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.formValidate.id != 0){
              saveAndUpdate({album:this.formValidate}, res => {
                this.$message({message:"修改成功",type: 'success'})
                this.$emit('on-dialog-commit');
                this.activeName = "first"
              })
            }
          } else {
            return false;
          }
        });
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
        console.log(this.extraParam.name)
        this.search(1);
      },
      toCreate() {
        this.createProps.visible = true;
      },
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          albumId:this.editId,
          pageable: {
            page: page,
            size: _t.pageSize,
            sort: _t.sort
          },
          name:this.extraParam.name
          // [this.model]: _t.extraParam
        };
        if (param.pageable.sort.asc.length === 0 && param.pageable.sort.desc.length === 0) {
          delete param.pageable.sort;
        }
        findByAlbumIdAndName(param, res => {
          this.pictureList = res
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        // let param = {[this.model]: _t.extraParam};
        let param = {name:'qqq'};
        /*countByAlbumIdAndName({
          albumId:this.editId,
        }, res => {
          _t.total = parseInt(res);
        });*/
        countByAlbumIdAndName({
          albumId:this.editId,
          name:this.extraParam.name
        }, res => {
          _t.total = parseInt(res);
        });
      },
      handleTransportSelectList(list) {
        this.selectList = list;
      },
      handleTransportFileList(fileList){
        console.log(fileList)
        // this.ruleForm.path = fileList[0].response.data;
        this.ruleForm.path = 'http://120.79.38.151/attachment/' + fileList[0].response.data;
      },
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
      handleSelectionChange(val) {
        this.selectList = val;
      },
      handleCurrentChange(val) {
        console.log(val)
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        console.log(pageSize)
        this.pageSize = pageSize;
        this.search(this.page);
      },
      onMenuChange(val) {
        console.log(val);
      },
      handleClick(command) {
        switch (command) {
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
      // 根据相册id获取相册
      findById(id) {
        // this.isFinished = false;
        findById({id: id}, res => {
          let keys = Object.keys(res);
          keys.map(key => {
            this.formValidate[key] = res[key];
          });
          // this.isFinished = true;
        });
        this.search(1);
      },
      /*findByAlbumIdAndName(id) {
        // this.isFinished = false;
        findByAlbumIdAndName({albumId: id}, res => {
          this.pictureList = res
          /!*console.log(res)
          let keys = Object.keys(res);
          keys.map(key => {
            this.ruleForm[key] = res[key];
          });*!/
          // this.isFinished = true;
        });
        this.search(1)
      }*/
    },
    mounted() {
      this.search(1);
      // this.findAllRoles();
    }
  }
</script>

<style scoped>
.my-leave-to{
  opacity: 50%;
}
</style>
