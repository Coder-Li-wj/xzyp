<template>
  <el-dialog
    title="敏感词详情"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">基本信息</div>

    <el-form ref="formValidate" label-width="150px" >
      <el-form-item label="启用状态">
        <el-radio v-model="radio" label="1">启用</el-radio>
        <el-radio v-model="radio" label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label="敏感词">
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
  import { save } from '@/project/service/manager'
  export default {
    name: "create",
    mixins:[emitter],
    components:{
      Upload
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      }
    },
    data(){
      return{
        radio: '1',
        form:{

        }
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
