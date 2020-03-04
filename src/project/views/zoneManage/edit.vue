<template>
  <el-dialog
    title="专区管理"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">

    <el-tabs v-model="activeName">
      <el-tab-pane label="专区信息" name="first">
        <el-form ref="formValidate"label-width="150px">
          <el-form-item label="专区名称" prop="username" >
            <el-input v-model="zoneName"  placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="专区副标题" prop="username" >
            <el-input v-model="zoneSubtitle"  placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="专区主图" prop="username" >
            <upload
              :max-size="5120"
              :limit="1"
            >
            </upload>
          </el-form-item>
          <el-form-item label="专区轮播" prop="username" >
            <!--<upload
              :max-size="5120"
              :limit="2"
            >
            </upload>-->
            <div class="block">
              <!--          <span class="demonstration" style="padding: 0 200px"></span>-->
              <el-carousel height="360px" style="width: 50%;">
                <el-carousel-item v-for="item in swiperImage" :key="item">
                  <el-image
                    style="background-size: 100%"
                    :src=item
                    @click="imgVisible = true">
                  </el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-form-item>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="商品列表" name="second">
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
            <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="toCreate">新建</el-button>
            <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>
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
              width="100">
            </el-table-column>
            <el-table-column
              prop="realname"
              label="商品名称"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="商品分类"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="添加商品"
      :visible.sync="createGoodProps.visible"
      :modal-append-to-body='false'
      width="40%"
      :before-close="handleCloseAddGood">
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 95%;margin: 10px auto"
          :search-items="searchItemsAddGood"
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
            width="100">
          </el-table-column>
          <el-table-column
            prop="realname"
            label="商品ID"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="商品标题"
          >
          </el-table-column>
        </el-table>
      </el-col>
      <span slot="footer" class="dialog-footer">
    <el-button @click="createGoodProps.visible = false">取 消</el-button>
    <el-button type="primary" @click="createGoodProps.visible = false">确 定</el-button>
  </span>
    </el-dialog>

    <div slot="footer" class="dialog-footer">

      <el-button type="primary" @click="handleConfirm">确 定</el-button>
      <el-button type="info" @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Search from "@/framework/components/search";
  import Upload from "@/framework/components/upload";
  import { get } from '@/project/service/manager'
  export default {
    name: "edit",
    components:{
      Upload, Search
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },
      editId:{
        type:Number,
        default: 0
      }
    },
    data(){
      return{
        createGoodProps:{
          visible: false
        },
        activeName: 'first',
        zoneName:'',
        zoneSubtitle: "",
        searchItems: [
          {
            name: "商品名称",
            key: "realname",
            type: "string"
          },
          {
            name: "商品分类",
            key: "",
            type: "select",
            displayValue: [],
            value: []
          }
        ],
        searchItemsAddGood:[
          {
            name: "商品标题",
            key: "realname",
            type: "string"
          },
        ],
        swiperImage:["https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572941094.42616676.jpg","https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572941094.42616676.jpg"]
      }
    },
    computed:{
    },
    watch:{
      editId(val){
        this.get(val);
      }
    },
    methods:{
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleCloseAddGood(){
        this.createGoodProps.visible = false
      },
      handleConfirm(){

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
        this.createGoodProps.visible = true;
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
      /*batchEnable() {
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
    }
  }
</script>

<style scoped>

</style>
