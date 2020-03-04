<template>
  <div >
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>售后详情</span>
        </div>
        <div class="text item">
          <span class="text_label">原订单号</span>
          {{orderType}}
        </div>
        <div class="text item">
          <span class="text_label">售后单号</span>
          {{orderNumber}}
        </div>
        <div class="text item">
          <span class="text_label">申请时间</span>
          {{orderStatus}}
        </div>
        <div class="text item">
          <span class="text_label">售后状态</span>
          {{goodAllPrice}}
        </div>
        <div class="text item">
          <span class="text_label">售后类型</span>
          {{freight}}
        </div>
        <div class="text item">
          <span class="text_label">售后原因</span>
          {{discountMoney}}
        </div>
        <div class="text item">
          <span class="text_label">售后图片</span>
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            fit="fit"></el-image>
        </div>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card class="box-card-large">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户信息" name="first">
            <div class="text item">
              <span class="text_label">User ID</span>
              {{userId}}
            </div>
            <div class="text item">
              <span class="text_label">手机号</span>
              {{phone}}
            </div>
            <div class="text item">
              <span class="text_label">昵称</span>
              {{nickname}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="售后商品" name="second">
            <div class="text item">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="goodId"
                  label="商品ID"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="商品名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="规格">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="单价(元)"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="数量"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="退款金额(元)">
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="协商历史" name="third">

          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>

    <!--返回上一页按钮-->
    <el-button plain class="backButton" v-on:click="backButton">返回上一页</el-button>
  </div>
</template>

<script>
  import {get, enable, disable, findById} from '@/project/service/user'

  export default {
    name: "show",
    data() {
      return {
        tableData:[],
        user: {},
        id: this.$route.params.id,
        activeName: 'first',
      }
    },
    created() {
      this.findById();
    },
    methods: {
      findById() {
        findById({id: this.id}, res => {
          this.user = res;
        });
      },
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
