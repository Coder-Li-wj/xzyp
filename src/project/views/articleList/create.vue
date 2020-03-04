<template>
  <el-dialog
    title="编辑文章"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">

    <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">基本信息</div>

    <el-form ref="formValidate" label-width="150px" >
      <el-form-item label="ID">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="封面图片">
        <upload
          :max-size="5120"
          :limit="1"
        >
        </upload>
      </el-form-item>
      <el-form-item label="详情">
        <Editor :defaultContent="detailContent" @on-change-content="onChangeDetailEditor"/>
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
        radio: '1',
        options: [],
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
