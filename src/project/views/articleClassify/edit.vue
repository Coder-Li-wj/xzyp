<template>
  <el-dialog
    title="编辑文章"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">

    <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">基本信息</div>

    <el-form ref="formValidate" label-width="150px" >
      <el-form-item label="分类名称">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="排序数字">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="分类描述">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返回上一页</el-button>
      <el-button type="primary" @click="handleCommit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import Editor from "@/framework/components/editor"
  import { save } from '@/project/service/manager'
  export default {
    name: "create",
    mixins:[emitter],
    components:{
      Upload, Editor
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      }
    },
    data(){
      return{

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
      handleCommit(){
        this.$emit('on-dialog-commit');

      },
    }
  }
</script>

<style scoped>

</style>
