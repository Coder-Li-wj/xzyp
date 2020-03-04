<template>
  <div >
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>提现详情</span>
        </div>
        <div style="font-weight: bold; margin-bottom: 10px">基本信息</div>
        <div class="text item">
          <span class="text_label">状态</span>
          {{manager.username}}
        </div>
        <div class="text item">
          <span class="text_label">User ID</span>
          {{manager.phone}}
        </div>
        <div class="text item">
          <span class="text_label">手机号</span>
          {{manager.realname}}
        </div>
        <div class="text item">
          <span class="text_label">昵称</span>
          {{manager.phone}}
        </div>
        <div class="text item">
          <span class="text_label">提现金额</span>
          {{manager.realname}}
        </div>
        <div class="text item">
          <span class="text_label">提现方式</span>
          {{manager.username}}
        </div>
        <div class="text item">
          <span class="text_label">提现类型</span>
          {{manager.phone}}
        </div>
        <div class="text item">
          <span class="text_label">提交时间</span>
          {{manager.realname}}
        </div>
        <div class="text item">
          <span class="text_label">操作人员</span>
          {{manager.phone}}
        </div>
        <div class="text item">
          <span class="text_label">操作时间</span>
          {{manager.realname}}
        </div>
      </el-card>
    </el-col>
    <el-button style="margin:50px auto auto 100px" type="primary" @click="handlePass">通过</el-button>
    <el-button style="margin:50px auto auto 0px" type="danger" @click="handleReject">拒接</el-button>
    <el-button style="margin:50px auto auto 0px" @click="backButton">返回上一页</el-button>
  </div>
</template>

<script>
  import {get, enable, disable} from '@/project/service/manager'
  import {search, count} from '@/project/service/role'

  export default {
    name: "show",
    components: {

    },
    data() {
      return {
        data:[],
        manager: {},
      }
    },
    created() {

    },
    methods: {
      // 返回上一页按钮
      backButton(){
        this.$router.back(-1)
      },
      handlePass(){
        alert("尚未实现")
      },
      handleReject(){
        alert("尚未实现")
      }
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

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
