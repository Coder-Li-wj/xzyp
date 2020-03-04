<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="formValidate" label-width="150px">
      <div style="font-weight: bold; margin-bottom: 10px">订单信息</div>
      <el-form-item label="状态" prop="username" >
        {{  }}
      </el-form-item>
      <el-form-item label="订单号">
        <el-input v-model="orderNumber"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="商品SKU">
        <el-input v-model="goodSkU" placeholder="请输入"></el-input>
      </el-form-item>
      <div style="font-weight: bold; margin-bottom: 10px">用户信息</div>
      <el-form-item label="User ID" prop="username" >
        <el-input v-model="orderNumber"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="orderNumber"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="goodSkU" placeholder="请输入"></el-input>
      </el-form-item>
      <div style="font-weight: bold; margin-bottom: 10px">评价详情</div>
      <el-form-item label="IP地址" prop="username" >
        <el-input v-model="orderNumber"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="评论时间">
        <el-input v-model="orderNumber"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="评价星数">
        <el-input v-model="goodSkU" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="评价内容" prop="username" >
        <el-input v-model="orderNumber"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="评价图片">
        <upload
          :max-size="5120"
          :limit="1"
        >
        </upload>
      </el-form-item>
      <el-form-item label="评价视频">
        <upload
          type="file"
          :max-size="5120"
          :limit="1"
        >
        </upload>
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
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  export default {
    name: "dialog",
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
        orderNumber:'',
        goodSkU:''
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
        this.broadcast('SiUpload','on-form-submit',() => {});

      },

    }
  }
</script>

<style scoped>

</style>
