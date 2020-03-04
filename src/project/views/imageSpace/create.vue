<template>
  <el-dialog
    title="新建相册"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">基本信息</div>

    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px" >
      <el-form-item label="相册名称" prop="name">
        <el-input placeholder="请输入" v-model="formValidate.name"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="comment" style="width: 60%;">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入"
          v-model="formValidate.comment"
        >
        </el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose('formValidate')">返回上一页</el-button>
      <el-button type="primary" @click="handleCommit('formValidate')">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import emitter from '@/framework/mixins/emitter'
  import { saveAndUpdate } from '@/project/service/album'
  export default {
    name: "create",
    mixins:[emitter],
    components:{

    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },
      editPage:{
        type:Number,
        default: 0
      }
    },
    data(){
      return{
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
          ]
        },
      }
    },
    computed:{
    },
    methods:{
      /*关闭窗口事件*/
      handleClose(formName){
        // this.visible = false;
        this.$emit('on-dialog-close');
        this.$refs[formName].resetFields();
      },
      handleCommit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.formValidate)
            saveAndUpdate({album:this.formValidate}, res => {
              this.$message({message:"新建成功",type: 'success'})
              this.$refs[formName].resetFields();
              this.formValidate.comment = ""
            })
            // this.$emit('on-edit-search');
            this.$emit('on-dialog-commit');
          } else {
            return false;
          }
        });
      },
      /*searchBySearchItem(searchItems) {
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
      handleSelectionChange(val) {
        this.selectList = val;
      },*/
    }
  }
</script>

<style scoped>

</style>
