<template>
  <el-dialog
    title="平台优惠券详情"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="form" :model="form" label-width="120px">
      <div style="font-weight: bold;">基本信息</div>
      <el-form-item label="优惠券名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="可发放总数">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="每人限领">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.value1"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券有效期">
        <div>
          <el-radio v-model="form.couponTime" label="1">天数限制</el-radio>
          <el-radio v-model="form.couponTime" label="2">日期限制</el-radio>
        </div>
        <el-input v-model="form.dayMunberLimit" placeholder="请输入天数" v-if="this.form.couponTime == '1'"></el-input>
        <el-date-picker
          v-model="form.dateLimit"
          type="datetime"
          placeholder="选择日期时间"
          v-if="this.form.couponTime == '2'">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="领取方式">
        <div>
          <el-radio v-model="form.receiveWay" label="1">免费领取</el-radio>
          <el-radio v-model="form.receiveWay" label="2">卡密领取</el-radio>
        </div>
        <el-input v-model="form.camiloReceive" placeholder="请输入卡密" v-if="this.form.receiveWay == '2'"></el-input>
      </el-form-item>
      <div style="font-weight: bold;">活动规则</div>
      <el-form-item label="优惠形式">
        <div>
          <el-radio v-model="form.preferentialForm" label="1">满减优惠</el-radio>
          <el-radio v-model="form.preferentialForm" label="2">指定商品</el-radio>
          <el-radio v-model="form.preferentialForm" label="3">指定类型</el-radio>
          <el-radio v-model="form.preferentialForm" label="4">指定规格</el-radio>
        </div>
        <!--选择满减优惠内容-->
        <div v-if="this.form.preferentialForm == '1'">
          <el-form-item label="使用条件">
            <el-input v-model="form.useCondition" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="优惠面额">
            <el-input v-model="form.preferentialCount" placeholder="请输入数字"></el-input>
          </el-form-item>
        </div>
        <!--选择指定商品内容-->
        <div v-if="this.form.preferentialForm == '2'">
                <!--按钮和分页-->
          <el-col :span="24">
            <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="addGood">添加</el-button>
          </el-col>
                <!--表格-->
          <el-col :span="24">
            <el-table
              :data="data"
              style="width: 100%;margin:0 auto;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="username"
                label="商品ID"
              >
              </el-table-column>
              <el-table-column
                prop="realname"
                label="商品标题"
              >
              </el-table-column>
              <el-table-column
                fixed="right"
                align="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
                <!--添加商品弹框-->
          <el-dialog
            title="添加商品"
            :visible.sync="addGoodProps.dialogVisible"
            :modal-append-to-body='false'
            width="40%"
            :before-close="handleCloseGood">
            <!--搜索-->
            <el-col :span="24">
              <search
                style="width: 95%;margin: 10px auto"
                :search-items="searchItemsGood"
                @on-search="searchBySearchItem"
              ></search>
            </el-col>
            <!--表格-->
            <el-col :span="24">
              <el-table
                :data="data"
                style="width: 100%;margin:0 auto;"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="商品ID"
                >
                </el-table-column>
                <el-table-column
                  prop="realname"
                  label="商品标题"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  align="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addGoodProps.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGoodProps.dialogVisible = false">确 定</el-button>
          </span>
          </el-dialog>
        </div>
        <!--选择指定类型内容-->
        <div v-if="this.form.preferentialForm == '3'">
          <!--按钮和分页-->
          <el-col :span="24">
            <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="addType">添加</el-button>
          </el-col>
          <!--表格-->
          <el-col :span="24">
            <el-table
              :data="data"
              style="width: 100%;margin:0 auto;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="username"
                label="类型ID"
              >
              </el-table-column>
              <el-table-column
                prop="realname"
                label="商品类型"
              >
              </el-table-column>
              <el-table-column
                fixed="right"
                align="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <!--添加类型弹框-->
          <el-dialog
            title="添加商品"
            :visible.sync="addTypeProps.dialogVisible"
            :modal-append-to-body='false'
            width="40%"
            :before-close="handleCloseType">
            <!--搜索-->
            <el-col :span="24">
              <search
                style="width: 95%;margin: 10px auto"
                :search-items="searchItemsType"
                @on-search="searchBySearchItem"
              ></search>
            </el-col>
            <!--表格-->
            <el-col :span="24">
              <el-table
                :data="data"
                style="width: 100%;margin:0 auto;"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="商品ID"
                >
                </el-table-column>
                <el-table-column
                  prop="realname"
                  label="商品类型"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  align="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addTypeProps.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addTypeProps.dialogVisible = false">确 定</el-button>
          </span>
          </el-dialog>
        </div>
        <!--选择指定规格内容-->
        <div v-if="this.form.preferentialForm == '4'">
            <el-input v-model="form.sku" placeholder="请输入SKU"></el-input>
        </div>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Search from "@/framework/components/search";
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  export default {
    name: "dialog",
    mixins:[emitter],
    components:{
      Upload, Search
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      }
    },
    data(){
      /*const validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("登录密码不能为空"));
        } else {
          if (this.formValidate.password !== "") {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField("confirmPassword");
          }
          callback();
        }
      };*/
      /*const validatePassCheck = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("再次输入你的密码"));
        } else if (value !== this.formValidate.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      };*/
      /*const validateFileList = (rule, value, callback) => {
        if (this.formValidate.fileList.length === 0) {
          callback("头像不能为空");
        } else {
          callback();
        }
      };*/
      return{
        /*formValidate:{
          status:'启用',
          username:'',
          password:'',
          realname:'',
          phone:'',
          email:'',
          comment:''
        },*/
        /*ruleValidate: {
          username: [
            {
              required: true,
              message: "账号不能为空",
              trigger: "blur"
            }
          ],
          password: [
            { required: true,  message: "不能为空", trigger: "blur" }
          ],

          realname: [
            {
              required: true,
              message: "姓名不能为空",
              trigger: "blur"
            }
          ],
          phone: [
            {
              required: true,
              message: "手机号不能为空",
              trigger: "blur"
            }
          ],
          email: [
            {
              required: true,
              message: "邮箱不能为空",
              trigger: "blur"
            },
            { type: "email", message: "邮箱格式不对", trigger: "blur" }
          ],


        },*/
        addGoodProps:{
          dialogVisible: false
        },
        addTypeProps:{
          dialogVisible: false
        },
        form:{
          couponTime:'1',
          dayMunberLimit:'',
          dateLimit:'',
          receiveWay:'1',
          camiloReceive:'',
          preferentialForm:'1',
          useCondition:'',
          preferentialCount:'',
          menu: {
            visible: false
          },
          sku:''
        },
        searchItemsGood:[
          {
            name: "商品标题",
            key: "goodTitle",
            type: "string"
          },
        ],
        searchItemsType:[
          {
            name: "商品类型",
            key: "goodType",
            type: "string"
          },
        ]
      }
    },
    computed:{
    },
    methods:{
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleConfirm(){
        this.broadcast('SiUpload','on-form-submit',() => {});
        console.log('11111');
        save(this.formValidate,res => {

        })
      },
      handleTransportFileList(fileList){
        console.log(fileList);
      },
      addGood(){
        this.addGoodProps.dialogVisible = true
      },
      handleCloseGood(){
        this.addGoodProps.dialogVisible = false
      },
      addType(){
        this.addTypeProps.dialogVisible = true
      },
      handleCloseType(){
        this.addTypeProps.dialogVisible = false
      },
      handleSelectionChange(val) {
        this.selectList = val;
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
    }
  }
</script>

<style scoped>

</style>
