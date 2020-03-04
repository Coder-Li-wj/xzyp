<template>
  <el-dialog
    title="新增时间段信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form label-width="150px">
      <el-form-item label="活动时间段" >
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="活动开始时间" >
        <el-date-picker
          v-model="activityStartTime"
          type="datetime"
          placeholder="请选择年月日时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动结束时间" >
        <el-date-picker
          v-model="activityFinishTime"
          type="datetime"
          placeholder="请选择年月日时间">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import Editor from "@/framework/components/editor"
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  export default {
    name: "edit",
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
        activityStartTime:'',
        activityFinishTime:'',
      }
    },
    computed:{
    },
    methods:{
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleConfirm(){
        this.$emit('on-dialog-confirm');
      },
      onChangeRuleEditor(val){
        this.ruleContent = val.html;
      },
      onChangeDetailEditor(val){
        this.detailContent = val.html;
      },
    }
  }
</script>

<style scoped>

</style>
