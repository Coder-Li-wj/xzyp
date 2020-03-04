<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form label-width="150px">
      <span style="font-weight: bold; font-size: 16px">基本信息</span>
      <el-form-item label="质检报告名称">
        <el-input v-model="reportName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-cascader
          v-model="classifyValue"
          :options="classifyOptions"
          :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
      </el-form-item>
      <el-form-item label="成色选择">
        <el-select v-model="colorValue" placeholder="请选择">
          <el-option
            v-for="item in colorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <span style="font-weight: bold; font-size: 16px">质检报告</span>
      <p style="margin: 20px 0 10px 20px">质检员信息</p>
      <el-form-item label="质检员头像">
        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          fit="fit"></el-image>
      </el-form-item>
      <el-form-item label="质检员姓名">
        <span>刘大强</span>
      </el-form-item>
      <el-form-item label="质检员等级">
        <el-select v-model="levelValue" placeholder="请选择">
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <span style="font-weight: bold; font-size: 16px">检测结果</span>
      <el-form-item label="整机评估">
        <el-input v-model="wholeMachineAssess"></el-input>
        <el-button size="small">添加</el-button>
      </el-form-item>
      <el-form-item label="外形评估">
        <el-input v-model="shapeAssess"></el-input>
        <el-button size="small">添加</el-button>
      </el-form-item>
      <span style="font-weight: bold; font-size: 16px;">检测评价</span>
      <el-form-item label-width="50px">
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 3}"
          placeholder="请输入"
          v-model="textarea">
        </el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleCommit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  export default {
    name: "edit",
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
        reportName:'',
        classifyValue: [],
        classifyOptions: [
          {value: 'huaweiPhone', label: '华为手机',
            children: [
              {value: 'huaweiP', label: '华为P系列'},
              {value: 'huaweiMate', label: '华为mate系列'},
              {value: 'huaweiNova', label: '华为nova系列'}
            ]
          },
          {value: 'xiaomiPhone', label: '小米手机',
            children: [
              {value: 'xiaomiMix', label: '小米mix系列'},
              {value: 'xiaomiNote', label: '小米note系列'},
              {value: 'xiaomi', label: '小米系列'}
            ]
          }
        ],
        colorValue:'',
        colorOptions:[
          {
            value: '选项1',
            label: '99成新'
          }, {
            value: '选项2',
            label: '88成新'
          }, {
            value: '选项3',
            label: '77成新'
          }, {
            value: '选项4',
            label: '66成新'
          }
        ],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        levelValue:'',
        levelOptions:[],
        textarea:'',
        wholeMachineAssess:'',
        shapeAssess:''
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
      // 提交事件
      handleCommit(){
        this.$emit('on-dialog-close');
      }

    }
  }
</script>

<style scoped>

</style>
