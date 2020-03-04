<template>
  <div>
    <el-dialog
      title="报名活动"
      :visible.sync="dialogVisible"
      :modal-append-to-body='false'
      width="60%"
      :before-close="handleClose">
      <el-row class="page">
        <!--    按钮-->
        <el-col :span="24">
          <div style="width: 95%;margin: 10px auto;">
            <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="toCreate">新建</el-button>
            <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>
            <!--<el-dropdown :trigger="'click'" @command="handleClick" size="medium" @visible-change="onMenuChange">
              <el-button icon="el-icon-menu" style="background:#3e5265;color: white ">更多操作<i :class="menu.visible?'el-icon-caret-top':'el-icon-caret-bottom'"></i></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
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
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>-->
            <!--<div class="pager-group">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, jumper, prev, next"
                :total="total">
              </el-pagination>
            </div>-->
          </div>
        </el-col>
        <div style="font-weight: bold">活动商品</div>
        <!--    搜索-->
        <el-col :span="24">
          <search
            style="width: 95%;margin: 10px auto"
            :search-items="searchItems"
            @on-search="searchBySearchItem"
          ></search>
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
              prop="goodName"
              label="商品名称"
            >
            </el-table-column>
            <el-table-column
              prop="goodType"
              label="商品分类"
            >
            </el-table-column>
            <el-table-column
              prop="color"
              label="颜色"
            >
            </el-table-column>
            <el-table-column
              prop="memory"
              label="内存"
            >
            </el-table-column>
            <el-table-column
              prop="marketPrice"
              label="市场价(元)"
            >
            </el-table-column>
            <el-table-column
              prop="nowPrice"
              label="现价(元)"
            >
            </el-table-column>
            <el-table-column
              prop="activityPrice"
              label="活动价(元)"
            >
            </el-table-column>
            <el-table-column
              prop="remainInventory"
              label="剩余库存"
            >
            </el-table-column>
            <el-table-column
              prop="activityInventory"
              label="活动库存"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <!--              <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>-->
                <el-link type="primary" size="small" @click="handleModify(scope.row)">修改</el-link>
                <span>|</span>
                <el-link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>


<!--    新建商品-->
    <el-dialog
      title="添加商品"
      :visible.sync="createGood.dialogVisible"
      :modal-append-to-body='false'
      width="50%"
      :before-close="handleCloseCreate">
      <el-steps :active="active" finish-status="success">
        <el-step></el-step>
        <el-step></el-step>
        <el-step></el-step>
      </el-steps>
      <!--第一步-->
      <div v-if="active == 0">
        <!--    搜索-->
        <el-col :span="24">
          <search
            style="width: 95%;margin: 10px auto"
            :search-items="searchItemGoodStep1"
            @on-search="searchBySearchItem"
          ></search>
        </el-col>
        <!--    表格-->
        <el-col :span="24">
          <el-table
            :data="searchGoodData"
            style="width: 95%;margin:0 auto;"
            @selection-change="handleSelectGood"
          >
            <el-table-column
              type="selection"
              width="55"
            >
            </el-table-column>
            <el-table-column
              prop="goodId"
              label="商品ID"
            >
            </el-table-column>
            <el-table-column
              prop="goodTitle"
              label="商品标题"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </div>
      <!--第二步-->
      <div v-if="active == 1">

        <div style="padding: 20px 0 ">{{ selectItemName }}</div>
        <!--    搜索-->
        <el-col :span="24">
          <search
            style="width: 95%;margin: 10px auto"
            :search-items="searchItemGoodStep2"
            @on-search="searchBySearchItem"
          ></search>
        </el-col>
        <!--    表格-->
        <el-col :span="24">
          <el-table
            :data="data"
            style="width: 95%;margin:0 auto;"
            @selection-change="handleSelectGood"
          >
            <el-table-column
              type="selection"
              width="55"
            >
            </el-table-column>
            <el-table-column
              prop="color"
              label="颜色"
            >
            </el-table-column>
            <el-table-column
              prop="runMemory"
              label="运行内存"
            >
            </el-table-column>
            <el-table-column
              prop="marketPrice"
              label="市场价(元)"
            >
            </el-table-column>
            <el-table-column
              prop="nowPrice"
              label="现价(元)"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </div>
      <!--第三步-->
      <div v-if="active == 2">
        <div style="padding: 20px 0 ">{{ selectItemName }}</div>
        <!--    表格-->
        <el-col :span="24">
          <el-table
            :data="data2"
            style="width: 95%;margin:0 auto;"
            @selection-change="handleSelectGood"
          >
            <el-table-column
              type="selection"
              width="55"
            >
            </el-table-column>
            <el-table-column
              prop="color"
              label="颜色"
            >
            </el-table-column>
            <el-table-column
              prop="memory"
              label="内存"
            >
            </el-table-column>
            <el-table-column
              prop="marketPrice"
              label="市场价(元)"
            >
            </el-table-column>
            <el-table-column
              prop="nowPrice"
              label="现价(元)"
            >
            </el-table-column>
            <el-table-column
              label="活动价格(元)"
            >
              <template slot-scope="scope">
                <el-input v-model="activityPrice" placeholder="请输入" style="width: 80%"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="inventory"
              label="商品库存"
            >
            </el-table-column>
            <el-table-column
              prop="activityInventory"
              label="活动库存"
            >
              <template slot-scope="scope">
                <el-input v-model="activityInventory" placeholder="请输入" style="width: 80%"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </div>

<!--      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="createGood.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="next" v-if="this.active < 2">下一步</el-button>
        <el-button type="primary" @click="createGood.dialogVisible = false" v-if="this.active == 2">确定</el-button>
      </span>
    </el-dialog>

<!--    修改商品-->
    <el-dialog
      title="修改商品"
      :visible.sync="modifyGood.dialogVisible"
      :modal-append-to-body='false'
      width="50%"
      :before-close="handleCloseModify">
      <!--    表格-->
      <el-col :span="24">
        <el-table
          :data="data2"
          style="width: 95%;margin:0 auto;"
          @selection-change="handleSelectGood"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="color"
            label="颜色"
          >
          </el-table-column>
          <el-table-column
            prop="memory"
            label="内存"
          >
          </el-table-column>
          <el-table-column
            prop="marketPrice"
            label="市场价(元)"
          >
          </el-table-column>
          <el-table-column
            prop="nowPrice"
            label="现价(元)"
          >
          </el-table-column>
          <el-table-column
            label="活动价格(元)"
          >
            <template slot-scope="scope">
              <el-input v-model="activityPrice" placeholder="请输入" style="width: 80%"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="inventory"
            label="商品库存"
          >
          </el-table-column>
          <el-table-column
            prop="activityInventory"
            label="活动库存"
          >
            <template slot-scope="scope">
              <el-input v-model="activityInventory" placeholder="请输入" style="width: 80%"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <span slot="footer" class="dialog-footer">
    <el-button @click="modifyGood.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyGood.dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Search from "@/framework/components/search";
  import Upload from "@/framework/components/upload";
  import Editor from "@/framework/components/editor"
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  import {search, count, del, enable, disable} from '@/project/service/manager'
  export default {
    name: "addActivityGood",
    model: "manager",
    mixins:[emitter],
    components:{
      Upload, Editor, Search
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      }
    },
    data() {
      return {
        model: "manager",
        createGood:{
          dialogVisible: false
        },
        modifyGood:{
          dialogVisible: false
        },
        menu: {
          visible: false
        },
        editId: 0,//编辑id
        data: [
          {goodName:"华为mate20"}
        ],
        selectList: [],
        sort: {asc: [], desc: []},
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        searchItems: [
          {
            name: "商品名称",
            key: "username",
            type: "string"
          },
          {
            name: "商品分类",
            key: "realname",
            type: "string"
          }
        ],
        searchItemGoodStep1: [
            {
              name: "商品标题",
              key: "goodName",
              type: "string"
            }
          ],
        active: 0,
        searchGoodData:[
          {goodId:5644654, goodTitle:'华为P20'},
          {goodId:3154641, goodTitle:'华为Mate20'},
          {goodId:9668451, goodTitle:'小米MIX'},
        ],
        selectItemName:'',
        searchItemGoodStep2: [
          {
            name: "颜色",
            key: "color",
            type: "string"
          },
          {
            name: "运行内存",
            key: "runMemory",
            type: "string"
          }
        ],
        data2:[
          {color:'黑色'}
        ],
        activityPrice:'',
        activityInventory:''
      };
    },
    computed:{
    },
    methods:{
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleCloseCreate(){
        this.createGood.dialogVisible = false
      },
      handleCloseModify(){
        this.modifyGood.dialogVisible = false
      },
      handleConfirm(){
        this.$emit('on-dialog-confirm');
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
      toCreate() {
        this.createGood.dialogVisible = true;
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
     /* batchEnable() {
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
      },*/
      //批量禁用
      /*batchDisable() {
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
      },*/

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
      handleSelectGood(val){
        this.selectList = val;
        if(this.selectList.length > 1){
          this.selectList.pop()
        }
        this.selectItemName = this.selectList[0].goodTitle
      },
      /*handleRowClick(row) {
        this.$router.push({path: '/manager/show/' + row.id})
      },*/
      /*handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },*/
      /*handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this.search(this.page);
      },*/
      onMenuChange(val) {
        console.log(val);
      },
      /*handleClick(command) {
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
      }*/
      handleModify(){
        this.modifyGood.dialogVisible = true
      },
      handleDelete(){

      },
      next() {
        if (this.active++ > 2) this.active = 0;
      }
    }
  }
</script>

<style scoped>

</style>
