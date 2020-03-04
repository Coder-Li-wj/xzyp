<template>
  <div>
    <div style="width: 95%;margin: 10px auto;">
      <el-button icon="el-icon-notebook-2" >导出Excel</el-button>
      <el-button icon="el-icon-notebook-2" type="primary">导入Excel批量发货</el-button>
      <el-button icon="el-icon-notebook-2" @click="exportHistory" type="primary">导出历史</el-button>
      <el-button icon="el-icon-notebook-2" >下载导入模板</el-button>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待发货" name="first">
        <!--    搜索-->
        <el-col :span="24">
          <search
            style="width: 95%;margin: 10px auto"
            :search-items="toDelivery.searchItems"
            @on-search="searchBySearchItem"
          ></search>
        </el-col>
        <!--    分页-->
        <el-col :span="24">
          <div style="width: 95%;margin: 10px auto;">
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
        <!--    订单列表-->
        <el-col :span="24">
          <el-card class="box-card" v-for="item in toDelivery.orderList" :key="item">
            <div slot="header" style="display: flex" >
              <span style="width: 20%">订单号：{{ item.orderNumber }}</span>
              <span style="width: 20%">下单时间：{{ item.orderTime }}</span>
              <span style="width: 60%">订单来源：{{ item.orderSource }}</span>
            </div>
            <el-row>
              <el-col :span="8">
                <div style="display: flex">
                  <el-image
                    style="width: 100px; height: 100px; margin-right: 15px"
                    :src="item.url"
                    fit="fit"></el-image>
                  <span>
                    <div style="font-weight: bold">{{item.goodName}}</div>
                    <span>规格：</span>{{ item.specification }}
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>User ID:</div>
                {{ item.userId }}
                <div>收货信息:</div>
                {{ item.getGoodInfo }}
              </el-col>
              <el-col :span="4">
                <el-button type="text" @click="deliverGood">发货</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-tab-pane>

      <el-tab-pane label="发货中" name="second">
        <!--    搜索-->
        <el-col :span="24">
          <search
            style="width: 95%;margin: 10px auto"
            :search-items="beingDelivery.searchItems"
            @on-search="searchBySearchItem"
          ></search>
        </el-col>
        <!--    分页-->
        <el-col :span="24">
          <div style="width: 95%;margin: 10px auto;">
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
        <!--    订单列表-->
        <el-col :span="24">
          <el-card class="box-card" v-for="item in beingDelivery.orderList" :key="item">
            <div slot="header" style="display: flex" >
              <span style="width: 20%">订单号：{{ item.orderNumber }}</span>
              <span style="width: 20%">下单时间：{{ item.orderTime }}</span>
              <span style="width: 60%">订单来源：{{ item.orderSource }}</span>
            </div>
            <el-row>
              <el-col :span="8">
                <div style="display: flex">
                  <el-image
                    style="width: 100px; height: 100px; margin-right: 15px"
                    :src="item.url"
                    fit="fit"></el-image>
                  <span>
                    <div style="font-weight: bold">{{item.goodName}}</div>
                    <span>规格：</span>{{ item.specification }}
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>User ID:</div>
                {{ item.userId }}
                <div>收货信息:</div>
                {{ item.getGoodInfo }}
              </el-col>
              <el-col :span="4">
                <el-button type="text" @click="beingCheckLogistics">查看物流</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-tab-pane>

      <el-tab-pane label="已收货" name="third">
        <!--    搜索-->
        <el-col :span="24">
          <search
            style="width: 95%;margin: 10px auto"
            :search-items="beingDelivery.searchItems"
            @on-search="searchBySearchItem"
          ></search>
        </el-col>
        <!--    分页-->
        <el-col :span="24">
          <div style="width: 95%;margin: 10px auto;">
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
        <!--    订单列表-->
        <el-col :span="24">
          <el-card class="box-card" v-for="item in getDelivery.orderList" :key="item">
            <div slot="header" style="display: flex" >
              <span style="width: 20%">订单号：{{ item.orderNumber }}</span>
              <span style="width: 20%">下单时间：{{ item.orderTime }}</span>
              <span style="width: 60%">订单来源：{{ item.orderSource }}</span>
            </div>
            <el-row>
              <el-col :span="8">
                <div style="display: flex">
                  <el-image
                    style="width: 100px; height: 100px; margin-right: 15px"
                    :src="item.url"
                    fit="fit"></el-image>
                  <span>
                    <div style="font-weight: bold">{{item.goodName}}</div>
                    <span>规格：</span>{{ item.specification }}
                  </span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>User ID:</div>
                {{ item.userId }}
                <div>收货信息:</div>
                {{ item.getGoodInfo }}
              </el-col>
              <el-col :span="4">
                <el-button type="text" @click="getCheckLogistics">查看物流</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-tab-pane>
    </el-tabs>

    <delivery
      :dialog-visible="deliveryProps.visible"
      @on-dialog-close="handleClose"
      @on-dialog-confirm="handleConfirm"
    />
    <being-check-logistics
      :dialog-visible="beingCheckProps.visible"
      @on-dialog-close="handleClose"
      @on-dialog-confirm="handleConfirm"
    />
    <get-check-logistics
      :dialog-visible="getCheckProps.visible"
      @on-dialog-close="handleClose"
      @on-dialog-confirm="handleConfirm"
    />
  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import Delivery from './delivery'
  import BeingCheckLogistics from "./beingCheckLogistics";
  import GetCheckLogistics from "./getCheckLogistics";

  // import ICreate from "./create"
  // import IEdit from "./edit"
  import {post} from "@/framework/http/request";
  import Emitter from '@/framework/mixins/emitter'
  import {search, count, del, enable, disable} from '@/project/service/user'

  export default {
    mixins: [Emitter],
    data() {
      return {
        model: "orderDelivery",
        deliveryProps: {
          visible: false
        },
        beingCheckProps: {
          visible: false
        },
        getCheckProps: {
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
        activeName:'first',
        toDelivery:{//待发货的变量
          searchItems: [
            {
              name: "订单号",
              key: "orderNumber",
              type: "string"
            },
            /*{
              name: "User ID",
              key: "userId",
              type: "string"
            },*/
            {
              name: "用户手机号",
              key: "userPhone",
              type: "string"
            },
            {
              name: "收货人姓名",
              key: "consigneeName",
              type: "string"
            },
            {
              name: "收货人手机号",
              key: "consigneePhone",
              type: "string"
            },
            {
              name: "下单时间",
              key: "accessAt",
              type: "daterange",
            },
            {
              name: "售后订单号",
              key: "afterSaleOrderNumber",
              type: "string"
            }
          ],
          orderList:[
            {
              orderNumber:5465465465,
              orderTime:"9012-12-25",
              orderSource:'销售订单',
              url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              goodName:"华为P30",
              specification:"白色",
              userId:"Apache",
              getGoodInfo:"广东省广州市天河区 棠安路188号，紫小鲸，13789008090"
            },
            {
              orderNumber:5465465465,
              orderTime:"9012-12-25",
              orderSource:'售后订单（售后订单号：86484131212）',
              url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              goodName:"华为Mate20",
              specification:"白色",
              userId:"Apache",
              getGoodInfo:"广东省广州市天河区 棠安路188号，紫小鲸，13789008090"
            },
            {
              orderNumber:5465465465,
              orderTime:"9012-12-25",
              orderSource:'销售订单',
              url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              goodName:"华为Nova5",
              specification:"白色",
              userId:"Apache",
              getGoodInfo:"广东省广州市天河区 棠安路188号，紫小鲸，13789008090"
            }
          ]
        },
        beingDelivery:{//发货中的变量
          searchItems: [
            {
              name: "订单号",
              key: "orderNumber",
              type: "string"
            },
            {
              name: "User ID",
              key: "userId",
              type: "string"
            },
            {
              name: "用户手机号",
              key: "userPhone",
              type: "string"
            },
            {
              name: "收货人姓名",
              key: "consigneeName",
              type: "string"
            },
            {
              name: "收货人手机号",
              key: "consigneePhone",
              type: "string"
            },
            {
              name: "下单时间",
              key: "accessAt",
              type: "date",
            }
          ],
          orderList:[
            {
              orderNumber:5465465465,
              orderTime:"9012-12-25",
              orderSource:'销售订单',
              url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              goodName:"小米mix",
              specification:"黑色",
              userId:"Apache",
              getGoodInfo:"广东省广州市天河区 棠安路188号，紫小鲸，13789008090"
            },
            {
              orderNumber:5465465465,
              orderTime:"9012-12-25",
              orderSource:'销售订单',
              url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              goodName:"小米note",
              specification:"红色",
              userId:"Apache",
              getGoodInfo:"广东省广州市天河区 棠安路188号，紫小鲸，13789008090"
            }
          ]
        },
        getDelivery:{//已收货的变量
          searchItems: [
            {
              name: "订单号",
              key: "orderNumber",
              type: "string"
            },
            {
              name: "User ID",
              key: "userId",
              type: "string"
            },
            {
              name: "用户手机号",
              key: "userPhone",
              type: "string"
            },
            {
              name: "收货人姓名",
              key: "consigneeName",
              type: "string"
            },
            {
              name: "收货人手机号",
              key: "consigneePhone",
              type: "string"
            },
            {
              name: "下单时间",
              key: "accessAt",
              type: "date",
            }
          ],
          orderList:[
            {
              orderNumber:5465465465,
              orderTime:"9012-12-25",
              orderSource:'销售订单',
              url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              goodName:"苹果phone",
              specification:"白色",
              userId:"Apache",
              getGoodInfo:"广东省广州市天河区 棠安路188号，紫小鲸，13789008090"
            },
            {
              orderNumber:5465465465,
              orderTime:"9012-12-25",
              orderSource:'销售订单',
              url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
              goodName:"苹果pad",
              specification:"白色",
              userId:"Apache",
              getGoodInfo:"广东省广州市天河区 棠安路188号，紫小鲸，13789008090"
            }
          ]
        }
      };
    },
    computed: {
      route() {
        return this.$route;
      }
    },
    components: {
      Search, Delivery, BeingCheckLogistics, GetCheckLogistics
    },
    methods: {
      // 更多操作里面的编辑操作
      handleEdit() {
        this.editId = this.selectList[0].id
        this.editProps.visible = true;
      },
      // 表格里面的禁用或启用操作
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
      // 搜索事件
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
      // 新建按钮的点击事件
      toCreate() {
        this.createProps.visible = true;
      },
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
      batchDelete() {
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
      },
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
      handleClose() {
        this.deliveryProps.visible = false;
        this.beingCheckProps.visible = false
        this.getCheckProps.visible = false
      },
      handleConfirm(){
        this.deliveryProps.visible = false;
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      handleRowClick(row) {
        this.$router.push({path: `/${this.model}/show/` + row.id})
      },
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
      handleClick(command) {
        switch (command) {
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
      },
      // 待发货的点击发货事件
      deliverGood(){
        this.deliveryProps.visible = true
      },
      // 发货中的查看物流事件
      beingCheckLogistics(){
        this.beingCheckProps.visible = true
      },
      // 已收货的查看物流事件
      getCheckLogistics(){
        this.getCheckProps.visible = true
      },
      // 导出历史的点击事件
      exportHistory(){
        this.$router.push({path: `/orderDelivery/exportManage/`})
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
