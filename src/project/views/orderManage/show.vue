<template>
  <div >
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>订单信息</span>
        </div>
        <div class="text item">
          <span class="text_label">订单类型</span>
          {{orderType}}
        </div>
        <div class="text item">
          <span class="text_label">订单号</span>
          {{orderNumber}}
        </div>
        <div class="text item">
          <span class="text_label">订单状态</span>
          {{orderStatus}}
        </div>
        <div class="text item">
          <span class="text_label">商品总价</span>
          {{goodAllPrice}}
        </div>
        <div class="text item">
          <span class="text_label">运费</span>
          {{freight}}
        </div>
        <div class="text item">
          <span class="text_label">优惠金额</span>
          {{discountMoney}}
        </div>
        <div class="text item">
          <span class="text_label">订单总额</span>
          {{orderAllPrice}}
        </div>
        <div class="text item">
          <span class="text_label">实付金额</span>
          {{realPayPrice}}
        </div>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card class="box-card-large">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户信息" name="first">
            <div class="text item">
              <span class="text_label">用户ID</span>
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
          <el-tab-pane label="订单进度" name="second">
            <div class="text item">
              <span class="text_label">下单时间</span>
              {{orderTime}}
            </div>
            <div class="text item">
              <span class="text_label">支付时间</span>
              {{payTime}}
            </div>
            <div class="text item">
              <span class="text_label">发货时间</span>
              {{deliverTime}}
            </div>
            <div class="text item">
              <span class="text_label">收货时间</span>
              {{receiptTiime}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="支付信息" name="third">
            <div class="text item">
              <span class="text_label">支付流水号</span>
              {{paySerialNumber}}
            </div>
            <div class="text item">
              <span class="text_label">支付方式</span>
              {{payWay}}
            </div>
            <div class="text item">
              <span class="text_label">支付金额(元)</span>
              {{payMoney}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="配送信息" name="forth">
            <div class="text item">
              <span class="text_label">收货人</span>
              {{orderTime}}
            </div>
            <div class="text item">
              <span class="text_label">手机号码</span>
              {{payTime}}
            </div>
            <div class="text item">
              <span class="text_label">收货地区</span>
              {{deliverTime}}
            </div>
            <div class="text item">
              <span class="text_label">详细地址</span>
              {{receiptTiime}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="物流信息" name="fifth">
            <div class="text item">
              <span class="text_label">物流公司</span>
              {{orderTime}}
            </div>
            <div class="text item">
              <span class="text_label">物流订单号</span>
              {{payTime}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="备注信息" name="sixth">
            <div class="text item">
              <span class="text_label">取消理由</span>
              <i class="el-icon-edit" style="margin-right: 40px; color: lightskyblue" @click="note.dialogVisible1 = true"></i>
              {{cancelReason}}
            </div>
            <div class="text item">
              <span class="text_label">买家备注</span>
              <i class="el-icon-edit" style="margin-right: 40px; color: lightskyblue" @click="note.dialogVisible2 = true"></i>
              {{buyerNote}}
            </div>
            <div class="text item">
              <span class="text_label">卖家备注</span>
              <i class="el-icon-edit" style="margin-right: 40px; color: lightskyblue" @click="note.dialogVisible3 = true"></i>
              {{sellerNote}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品信息" name="seventh">
            <div class="text item">
              <el-table
                ref="singleTable"
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="goodName"
                  label="商品名称"
                  >
                </el-table-column>
                <el-table-column
                  property="specification"
                  label="规格"
                  >
                </el-table-column>
                <el-table-column
                  property="unitPrice"
                  label="单价（元）"
                  >
                </el-table-column>
                <el-table-column
                  property="amount"
                  label="数量"
                  >
                </el-table-column>
                <el-table-column
                  property="subtotal"
                  label="小计（元）"
                  >
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>

<!--    取消理由对话框-->
    <el-dialog
      title="备注"
      :visible.sync="note.dialogVisible1"
      width="30%">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="cancelReason">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="note.dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="confirmCancelReason">确 定</el-button>
      </span>
    </el-dialog>
<!--    买家备注对话框-->
    <el-dialog
      title="备注"
      :visible.sync="note.dialogVisible2"
      width="30%">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="buyerNote">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="note.dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmBuyerNote">确 定</el-button>
      </span>
    </el-dialog>
<!--    卖家备注对话框-->
    <el-dialog
      title="备注"
      :visible.sync="note.dialogVisible3"
      width="30%">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="sellerNote">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="note.dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="confirmSellerNote">确 定</el-button>
      </span>
    </el-dialog>

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
        user: {},
        id: this.$route.params.id,
        activeName: 'first',
        tableData: [],
        note:{
          dialogVisible1: false,
          dialogVisible2: false,
          dialogVisible3: false
        },
        cancelReason:'我不想买了',
        buyerNote:'仔细挑选一下',
        sellerNote:'卖家输入的备注内容显示在这里卖家输入的备注内容显示在这里卖家输入的备注内容显示在这里'
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
      /*handleClick(command){
        switch (command) {
          case '状态':
            let status = this.user.status;
            if (status === '禁用') {
              enable({id: this.id}, res => {
                this.$message({
                  type: 'success',
                  message: '已启用!'
                });
                this.findById();
              })
            } else {
              disable({id: this.id}, res => {
                this.$message({
                  type: 'success',
                  message: '已禁用!'
                });
                this.findById();
              })
            }
            break;
        }
      }*/
      // 取消理由对话框的确定事件
      confirmCancelReason(){
        this.note.dialogVisible1 = false
      },
      // 买家备注对话框的确定事件
      confirmBuyerNote(){
        this.note.dialogVisible2 = false
      },
      // 卖家备注对话框的确定事件
      confirmSellerNote(){
        this.note.dialogVisible3 = false
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
