<template>
    <div >
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>平台优惠券详情</span>
          </div>
          <div style="font-weight: bold; padding: 20px">基本信息</div>
          <div class="text item">
            <span class="text_label">活动状态</span>
            {{manager.username}}
          </div>
          <div class="text item">
            <span class="text_label">优惠券名称</span>
            {{manager.phone}}
          </div>
          <div class="text item">
            <span class="text_label">副标题</span>
            {{manager.realname}}
          </div>
          <div class="text item">
            <span class="text_label">可发放总数</span>
            {{manager.status}}
          </div>
          <div class="text item">
            <span class="text_label">没人限领</span>
            {{manager.comment}}
          </div>
          <div class="text item">
            <span class="text_label">开始时间</span>
            {{manager.status}}
          </div>
          <div class="text item">
            <span class="text_label">结束时间</span>
            {{manager.comment}}
          </div>

          <div style="font-weight: bold; padding: 20px">活动规则</div>
          <div class="text item">
            <span class="text_label">优惠形式</span>
            {{manager.username}}
          </div>
          <div class="text item">
            <span class="text_label">使用条件</span>
            {{manager.phone}}
          </div>
          <div class="text item">
            <span class="text_label">优惠面额</span>
            {{manager.phone}}
          </div>
        </el-card>
      </el-col>
      <!--返回上一页按钮-->
      <el-button  style="margin: 20px 0 0 30px" v-on:click="backButton">返回上一页</el-button>
    </div>
</template>

<script>
  import {get, enable, disable} from '@/project/service/manager'
  import {search, count} from '@/project/service/role'
  import previewImg from '@/framework/components/previewImg/previewImg.vue'

  export default {
    name: "show",
    components: {

    },
    data() {

      return {
        manager: {},

      }
    },
    created() {
      this.get();
      this.roleSearch();
    },
    methods: {
      /*详情页面返回上一页按钮*/
      backButton() {
        this.$router.back(-1)
      },
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .text_label{
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .clearfix{
    position: relative;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 92%;
    margin: 20px;
    display: inline-block;
  }
  .box-card-large{
    width: 92%;
    display: inline-block;
    margin: 20px;
  }
  .el-button--text{
    color: #3e5265;
  }
  .el-button--mini{
    padding: 4px 12px;
  }
  .table-button{
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }
</style>
