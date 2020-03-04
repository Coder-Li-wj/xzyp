<template>
  <div>
    <el-row class="page">
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="searchItems"
          @on-search="searchBySearchItem"
        ></search>
      </el-col>
      <!--    按钮和分页-->
      <el-col :span="24">
        <div style="width: 95%;margin: 10px auto;">
          <!--<el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="toCreate">新建</el-button>
          <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>-->
          <!--<el-dropdown :trigger="'click'" @command="handleClick" size="medium" @visible-change="onMenuChange">
            <el-button icon="el-icon-menu" style="background:#3e5265;color: white ">更多操作<i :class="menu.visible?'el-icon-caret-top':'el-icon-caret-bottom'"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-circle-check"
                command="修改物流订单号"
                :disabled="selectList.length !== 1"
                :style="(selectList.length !== 1)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
                @click="modifyOrderNumber"
              >
                修改物流订单号
              </el-dropdown-item>
              &lt;!&ndash;<el-dropdown-item
                icon="el-icon-circle-check"
                command="启用"
                :disabled="selectList.findIndex(s=>{return s.status === '启用'}) >=0 || selectList.length === 0"
                :style="(selectList.findIndex(s=>{return s.status === '启用'}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)','cursor': 'not-allowed'}:{'color':'#fff'}"
                @click="batchEnable"
              >
                启用
              </el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-circle-close"
                command="禁用"
                :disabled="selectList.findIndex(s=>{return s.status === '禁用'}) >=0 || selectList.length === 0"
                :style="(selectList.findIndex(s=>{return s.status === '禁用'}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
                @click.stop="batchDisable"
              >
                禁用
              </el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-edit"
                command="编辑"
                :disabled="selectList.length !== 1"
                :style="(selectList.length !== 1)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
                @click.stop="handleEdit"
              >
                编辑
              </el-dropdown-item>&ndash;&gt;
            </el-dropdown-menu>
          </el-dropdown>-->
          <div class="pager-group">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, jumper, prev, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="data"
          style="width: 95%;margin:0 auto;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="售后单号"
          >
            <template slot-scope="scope">
              <el-button @click.native.prevent="toDetail(scope.row)" type="text" size="small">{{scope.row.nickname}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="原订单号"
          >
          </el-table-column>
          <el-table-column
            prop="userPhone"
            label="用户手机号"
          >
          </el-table-column>
          <el-table-column
            prop="goodNumber"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            prop="orderPrice"
            label="退款金额"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="realPayPrice"
            label="售后类型"
          >
          </el-table-column>
          <el-table-column
            prop="consigneeName"
            label="售后原因"
          >
          </el-table-column>
          <el-table-column
            prop="consigneePhone"
            label="售后状态"
          >
          </el-table-column>
          <el-table-column
            prop="orderType"
            label="申请时间"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="orderStatus"
            label="更新时间"
            sortable
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button @click.stop="agreeRefund" type="text" size="small">同意退款</el-button>
              <el-button @click.stop="rejectRefund" type="text" size="small">拒绝退款</el-button>
              <el-button @click.stop="agreeApply" type="text" size="small">同意申请</el-button>
              <el-button @click.stop="rejectApply" type="text" size="small">拒绝申请</el-button>
              <el-button @click.stop="agreeDelivery" type="text" size="small">同意发货</el-button>
              <el-button @click.stop="rejectDelivery" type="text" size="small">拒绝发货</el-button>
              <el-button @click.stop="agreeFix" type="text" size="small">同意维修</el-button>
              <el-button @click.stop="rejectFix" type="text" size="small">拒绝维修</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--拒绝退款-->
    <el-dialog
      title="拒绝退款"
      :visible.sync="rejectRefundProps.visible"
      width="30%"
      :before-close="handleClose">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="refundReason">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectRefundProps.visible = false">取 消</el-button>
        <el-button type="primary" @click="rejectRefundProps.visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--拒绝申请-->
    <el-dialog
      title="拒绝申请"
      :visible.sync="rejectApplyProps.visible"
      width="30%"
      :before-close="handleClose">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="applyReason">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectApplyProps.visible = false">取 消</el-button>
        <el-button type="primary" @click="rejectApplyProps.visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--拒绝发货-->
    <el-dialog
      title="拒绝发货"
      :visible.sync="rejectDeliveryProps.visible"
      width="30%"
      :before-close="handleClose">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="deliveryReason">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectDeliveryProps.visible = false">取 消</el-button>
        <el-button type="primary" @click="rejectDeliveryProps.visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--拒绝维修-->
    <el-dialog
      title="拒绝维修"
      :visible.sync="rejectFixProps.visible"
      width="30%"
      :before-close="handleClose">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="fixReason">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectFixProps.visible = false">取 消</el-button>
        <el-button type="primary" @click="rejectFixProps.visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--同意申请-->
    <el-dialog
      title="同意申请"
      :visible.sync="agreeApplyProps.visible"
      width="30%"
      :before-close="handleClose">
        <el-form ref="form" label-width="80px">
          <el-form-item label="退货地址">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款说明">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="refundInstruction">
            </el-input>
          </el-form-item>
          <el-form-item label="换货说明">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="exchangeInstruction">
            </el-input>
          </el-form-item>
          <el-form-item label="维修说明">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="fixInstruction">
            </el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="agreeApplyProps.visible = false">取 消</el-button>
        <el-button type="primary" @click="agreeApplyProps.visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import Search from "@/framework/components/search";
  import {post} from "@/framework/http/request";
  import Emitter from '@/framework/mixins/emitter'
  import {search, count, del, enable, disable} from '@/project/service/user'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "user",
        rejectRefundProps: {
          visible: false
        },
        rejectApplyProps: {
          visible: false
        },
        rejectDeliveryProps: {
          visible: false
        },
        rejectFixProps: {
          visible: false
        },
        agreeApplyProps:{
          visible: false
        },
        menu: {
          visible: false
        },
        editId: 0,//编辑id
        data: [],
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        searchItems: [
          {
            name: "原订单号",
            key: "orderNumber",
            type: "string"
          },
          /*{
            name: "User ID",
            key: "userID",
            type: "string"
          },*/
          {
            name: "用户手机号",
            key: "userPhone",
            type: "string"
          },
          {
            name: "售后单号",
            key: "consigneeName",
            type: "string"
          },
          {
            name: "售后类型",
            key: "orderType",
            type: "select",
            displayValue: ["仅退款", "退货退款", "换货", "维修"],
            value: ["普通", "促销", "认证", "维修"]
          },
          {
            name: "售后状态",
            key: "orderStatus",
            type: "select",
            displayValue: ["退款成功", "退款关闭" ,"待商家处理", "待买家处理", "待买家退货", "待商家退款", "待商家发货", "换货成功", "换货关闭", "待买家寄件", "维修成功", "维修失败"],
            value: ["退款成功", "退款关闭" ,"待商家处理", "待买家处理", "待买家退货", "待商家退款", "待商家发货", "换货成功", "换货关闭", "待买家寄件", "维修成功", "维修失败"]
          },
          {
            name: "申请时间",
            key: "accessAt",
            type: "date",
          }
        ],
        refundReason:'',
        applyReason:'',
        deliveryReason:'',
        fixReason:'',
        refundInstruction:'',
        exchangeInstruction:'',
        fixInstruction:''
      };
    },
    computed: {
      route() {
        return this.$route;
      }
    },
    components: {
      Search
    },
    methods: {
      //跳转到详情页
      toDetail(row){
        this.$router.push({path: `/${this.model}/show/` + row.id})
      },
      handleClose(){
        this.rejectRefundProps.visible = false
        this.rejectApplyProps.visible = false
        this.rejectDeliveryProps.visible = false
        this.rejectFixProps.visible = false
        this.agreeApplyProps.visible = false
      },
      handleStatusChange(row) {
        let status;
        let _t = this;
        if (row.status.indexOf('启用') >= 0) {
          status = '禁用'
        } else {
          status = '启用'
        }
        this.$confirm(`确定${status}选中内容？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (status === '禁用') {
            disable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已禁用!'
              });
              _t.search(_t.page);
            })
          } else {
            enable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已启用!'
              });
              _t.search(_t.page);
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handlePageSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(1);
      },
      handlePageChange(page) {
        this.search(page);
      },
      handleSortChange(sort) {
        let key = sort.key;
        let order = sort.order;
        let asc = this.sort.asc;
        let desc = this.sort.desc;
        if (asc.indexOf(key) > -1) {
          let idx = asc.indexOf(key);
          asc.splice(idx, 1);
        }
        if (desc.indexOf(key) > -1) {
          let idx = desc.indexOf(key);
          desc.splice(idx, 1);
        }
        if (order !== "normal") {
          this.sort[order].push(key);
        }
        this.search(1);
      },
      searchBySearchItem(searchItems) {
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.searchItems,
            len = searchItemList.length;
          i < len;
          i++
        ) {
          keys.push(searchItemList[i].key);
        }
        for (let i in keys) {
          if (searchItems[keys[i]]) {
            this.extraParam[keys[i]] = searchItems[keys[i]];
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        this.search(1);
      },
      /*toCreate() {
        this.createProps.visible = true;
      },*/
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
            sort: _t.sort
          },
          [this.model]: _t.extraParam
        };
        if (
          param.pageable.sort.asc.length === 0 &&
          param.pageable.sort.desc.length === 0
        ) {
          delete param.pageable.sort;
        }
        search(param, res => {
          let data = res;
          _t.data = data;
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        let param = {[this.model]: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      handleTransportSelectList(list) {
        this.selectList = list;
      },
      //批量删除
      /*batchDelete() {
        this.broadcast("SiTable", "on-get-selectList");
        this.$nextTick(() => {
          let selectList = this.selectList;
          if (selectList.length === 0) {
            this.$notify.warning({
              title: "至少选择一条数据"
            });
            return;
          }
          this.$confirm('确定删除所选记录吗?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            del({ids: ids}, res => {
              _t.search(_t.page);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        });
      },*/
      //批量启用
      batchEnable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            enable({id: s.id}, res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //批量禁用
      batchDisable() {
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            disable({id: s.id}, res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },

      delete(id) {
        let _t = this;
        del({id: id}, res => {
          _t.search(_t.page);
        });
      },
      enable(id, url) {
        let _t = this;
        post(url, {id: id}, res => {
          _t.search(_t.page);
        });
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      // 双击进入详情页面
      // handleRowClick(row) {
      //   this.$router.push({path: `/afterSaleManage/show/` + row.id})
      // },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this.search(this.page);
      },
      onMenuChange(val) {
        console.log(val);
      },
      /*handleClick(command) {
        switch (command) {
          case '修改物流订单号':
            console.log('修改物流订单号');
            this.modifyOrderNumber()
            break;
          case '编辑':
            console.log('编辑');
            this.editId = this.selectList[0].id;
            this.editProps.visible = true;
            break;
          case '启用':
            console.log('启用');
            this.batchEnable();
            break;
          case '禁用':
            console.log('禁用')
            this.batchDisable();
            break;
        }
      },*/
      // 修改物流订单号
      modifyOrderNumber(){
        alert("尚未实现")
      },
      // 同意退款
      agreeRefund(){
        this.$alert('确认退款给该用户？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            /*this.$message({
              type: 'info',
              message: `action: ${ action }`
            });*/
          }
        });
      },
      // 拒绝退款
      rejectRefund(){
        this.rejectRefundProps.visible = true
      },
      // 拒绝申请
      rejectApply(){
        this.rejectApplyProps.visible = true
      },
      // 拒绝发货
      rejectDelivery(){
        this.rejectDeliveryProps.visible = true
      },
      // 拒绝维修
      rejectFix(){
        this.rejectFixProps.visible = true
      },
      // 同意申请
      agreeApply(){
        this.agreeApplyProps.visible = true
      },
      // 同意发货
      agreeDelivery(){
        this.$alert('确认同意发货？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            /*this.$message({
              type: 'info',
              message: `action: ${ action }`
            });*/
          }
        });
      },
      // 同意维修
      agreeFix() {
        this.$alert('确认同意维修？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            /*this.$message({
              type: 'info',
              message: `action: ${ action }`
            });*/
          }
        });
      }
    },
    mounted() {
      this.search(1);
      // this.findAllRoles();
    }
  };
</script>
<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-button+.el-button{
    margin-left: 2px;
  }
  .el-button--default:hover{
    color: #00a16c;
    border: 1px solid#00a16c;
    background: white;
  }
  .footor{
    margin:10px 30px;
    width: 90%;
    text-align: right;
  }
</style>
