<template>
  <el-dialog
    title="发货"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">

    <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">第一步  确认收货信息及交易详情</div>
    <el-col :span="24" style="margin-bottom: 30px">
      <el-card class="box-card">
        <div slot="header" style="display: flex" >
          <span style="width: 33%">订单号：{{ orderItem.orderNumber }}</span>
          <span style="width: 33%">下单时间：{{ orderItem.orderTime }}</span>
          <span style="width: 34%">订单来源：{{ orderItem.orderSource }}</span>
        </div>
        <el-row>
          <el-col :span="8">
            <div style="display: flex">
              <el-image
                style="width: 100px; height: 100px; margin-right: 15px"
                :src="orderItem.url"
                fit="fit"></el-image>
              <span>
                    <div style="font-weight: bold">{{orderItem.goodName}}</div>
                    <span>规格：</span>{{ orderItem.specification }}
                  </span>
            </div>
          </el-col>
          <el-col :span="16">
            <div>User ID:</div>
            {{ orderItem.userId }}
            <div>收货信息:</div>
            {{ orderItem.getGoodInfo }}
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">第二步  选择物流服务</div>
    <el-col :span="24" style="margin-bottom: 30px">
      <el-card class="box-card">
        <div slot="header" style="display: flex" >
          <span style="width: 33%">物流公司</span>
          <span style="width: 52%">物流单号</span>
          <span style="width: 15%">操作</span>
        </div>
        <el-row v-for="item in logisticsData" :key="item" style="margin-bottom: 10px">
          <el-col :span="8">
            {{ item.logisticsCompany }}
          </el-col>
          <el-col :span="12">
            <el-input v-model="item.logisticsOrderNumber" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="text" @click="handleConfirm">确认</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'

  export default {
    name: "delivery",
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
        orderItem: {
          orderNumber: 5465465465,
          orderTime: "9012-12-25",
          orderSource: '销售订单',
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          goodName: "华为P30",
          specification: "白色",
          userId: "Apache",
          getGoodInfo: "广东省广州市天河区 棠安路188号，紫小鲸，13789008090"
        },
        logisticsData: [
          {
            logisticsCompany: '顺丰',
            logisticsOrderNumber:''
          },
          {
            logisticsCompany: '韵达',
            logisticsOrderNumber:''
          },
          {
            logisticsCompany: '圆通',
            logisticsOrderNumber:''
          },
          {
            logisticsCompany: 'EMS',
            logisticsOrderNumber:''
          }
        ],
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
      },
      // 确认发货
      handleConfirm(){
        alert("尚未实现")
        this.$emit('on-dialog-confirm');
      }

    }
  }
</script>

<style scoped>

</style>
