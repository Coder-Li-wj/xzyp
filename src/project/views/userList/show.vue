<template>
  <div >
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
          <!--<el-dropdown style="position: absolute;right: -9px;top: -6px"  @command="handleClick">
            <el-button type="text">
              <img src="../../assets/more.png" alt="" width="10" height="8">
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="状态">启用</el-dropdown-item>
              <el-dropdown-item command="状态">禁用</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>-->
        </div>
        <div class="text item">
          <span class="text_label">User ID</span>
          {{user.id}}
        </div>
        <div class="text item">
          <span class="text_label">手机号</span>
          {{user.phone}}
        </div>
        <div class="text item">
          <span class="text_label">昵称</span>
          {{user.nickname}}
        </div>
        <div class="text item">
          <span class="text_label">头像</span>
          <el-image
            style="width: 100px; height: 100px"
            :src="user.avatar"
            >
          </el-image>
        </div>
        <div class="text item">
          <span class="text_label">性别</span>
          {{user.gender}}
        </div>
        <div class="text item">
          <span class="text_label">出生日期</span>
          {{user.birthday}}
        </div>
        <div class="text item">
          <span class="text_label">收货地址</span>
          {{user.receiptAddress}}
        </div>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card class="box-card-large">
        <el-tabs v-model="activeName">
          <el-tab-pane label="账户信息" name="first">
            <div class="text item">
              <span class="text_label">启用状态</span>
              {{user.enabled === true ? "已启用" : "已禁用"}}
            </div>
            <div class="text item">
              <span class="text_label">注册时间</span>
              {{user.createAt}}
            </div>
            <div class="text item">
              <span class="text_label">最近登录时间</span>
              {{user.accessAt}}
            </div>
            <div class="text item">
              <span>累计消费金额(元)</span>
              {{user.expenseAmount}}
            </div>
            <div class="text item">
              <span class="text_label">余额(元)</span>
              {{user.balanceAmount}}
            </div>
            <div class="text item">
              <span class="text_label">最后登录IP</span>
              {{user.	accessIp}}
            </div>
            <div class="text item">
              <span class="text_label">订单数</span>
              {{user.	orderQuantity}}
            </div>
            <div class="text item">
              <span class="text_label">评价</span>
              {{user.evaluation}}
            </div>
            <div class="text item">
              <span class="text_label">申请售后数</span>
              {{user.afterSalesServiceQuantity}}
            </div>
            <div class="text item">
              <span class="text_label">收藏数</span>
              {{user.collectNumber}}
            </div>
            <div class="text item">
              <span class="text_label">消费金额</span>
              {{user.expenseAmount}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="备注信息" name="second">
            <div class="text item">
              <span class="text_label">备注信息</span>
              {{user.comment}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="订单详情" name="third">
            <el-table
              :data="data"
              style="width: 95%;margin:0 auto;"
            >
              <el-table-column
                prop="orderNumber"
                label="订单号"
              >
              </el-table-column>
              <el-table-column
                prop="goodsNumber"
                label="商品数量"
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="orderMoney"
                label="订单金额"
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="payMoney"
                label="实付金额"
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="consigneeName"
                label="收货人姓名"
              >
              </el-table-column>
              <el-table-column
                prop="consigneePhone"
                label="收件人手机号"
              >
              </el-table-column>
              <el-table-column
                prop="orderType"
                label="订单类型"
              >
              </el-table-column>
              <el-table-column
                prop="orderStatus"
                label="订单状态"
              >
              </el-table-column>
              <el-table-column
                prop="orderTime"
                label="下单时间"
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="updateTime"
                label="更新时间"
                sortable
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
    <!--返回上一页按钮-->
    <el-button plain class="backButton" v-on:click="backButton">返回上一页</el-button>
  </div>
</template>

<script>
  import {get, enable, disable, findById} from '@/project/service/userList'

  export default {
    name: "show",
    data() {
      return {
        data:[],
        edit: false,
        originalEditMessage:'',
        user: {},
        id: this.$route.params.id,
        activeName: 'first',
      }
    },
    created() {
      this.findById();
    },
    methods: {
      backButton() {
        this.$router.push({path: `/userList/list`})
      },
      findById() {
        findById({id: this.id}, res => {
          this.user = res;
          this.user.avatar = 'http://120.79.38.151/attachment/' + this.user.avatar
          console.log(this.user.avatar)
        });
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
    width: 150px;
    text-align: left;
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
  .backButton{
    margin:50px 0 0 23px;
  }
</style>
