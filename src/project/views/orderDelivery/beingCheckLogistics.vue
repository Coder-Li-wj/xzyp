<template>
  <el-dialog
    title="查看物流"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="form" :model="form" label-width="100px">
      <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">订单信息</div>
      <el-form-item label="订单类型">
        {{  }}
      </el-form-item>
      <el-form-item label="订单号">
        {{  }}
      </el-form-item>
      <el-form-item label="订单状态">
        {{  }}
      </el-form-item>
      <el-form-item label="订单金额">
        {{  }}
      </el-form-item>
      <el-form-item label="优惠金额">
        {{  }}
      </el-form-item>
      <el-form-item label="需付金额">
        {{  }}
      </el-form-item>
      <el-form-item label="实付金额">
        {{  }}
      </el-form-item>
      <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">配送信息</div>
      <el-form-item label="收货人">
        {{  }}
      </el-form-item>
      <el-form-item label="手机号码">
        {{  }}
      </el-form-item>
      <el-form-item label="收货地区">
        {{  }}
      </el-form-item>
      <el-form-item label="详细地址">
        {{  }}
      </el-form-item>
      <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">物流信息</div>
      <el-form-item label="物流公司">
        {{  }}
      </el-form-item>
      <el-form-item label="物流单号">
        {{  }}
      </el-form-item>
      <el-form-item>
        暂无物流信息
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返回</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'

  export default {
    name: "beingCheckLogistics",
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
      }
    }
  }
</script>

<style scoped>

</style>
