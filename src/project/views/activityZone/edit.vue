<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="60%"
    :before-close="handleClose">

    <el-form label-width="150px">
      <el-form-item label="是否包邮" >
        <el-radio v-model="freeMailRadio" label="1">是</el-radio>
        <el-radio v-model="freeMailRadio" label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="活动名称" >
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="活动副标题" >
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
      <el-form-item label="活动主图" >
        <upload
          :max-size="5120"
          :limit="1"
        >
        </upload>
      </el-form-item>
      <el-form-item label="活动轮播" >
        <!--<upload
          :max-size="5120"
          :limit="5"
        >
        </upload>-->
        <div class="block">
          <!--          <span class="demonstration" style="padding: 0 200px"></span>-->
          <el-carousel height="360px" style="width: 50%;">
            <el-carousel-item v-for="item in swiperImage" :key="item">
              <el-image
                style="background-size: 100%"
                :src=item
                @click="imgVisible = true">
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-form-item>
      <el-form-item label="活动规则" >
        <Editor :defaultContent="ruleContent" @on-change-content="onChangeRuleEditor"/>
      </el-form-item>
      <el-form-item label="活动详情" >
        <Editor :defaultContent="detailContent" @on-change-content="onChangeDetailEditor"/>
      </el-form-item>
      <el-form-item label="是否推送到首页" style="margin-top: 100px">
        <el-radio v-model="homeRadio" label="1">是</el-radio>
        <el-radio v-model="homeRadio" label="2">否</el-radio>
        <div v-show="homeRadio == '1'">
          <span style="margin-right: 10px">首页排序</span>
          <el-input v-model="homeSort" placeholder="请输入"></el-input>
        </div>
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
        freeMailRadio:'1',
        activityStartTime:'',
        activityFinishTime:'',
        ruleContent:'',
        detailContent:'',
        homeRadio:'1',
        homeSort:'',
        swiperImage:["https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572941094.42616676.jpg","https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572941094.42616676.jpg"]
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
