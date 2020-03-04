<template>
  <el-dialog
    title="运费模板详情"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">
    <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">基本信息</div>

    <el-form ref="formValidate" label-width="150px" >
      <el-form-item label="模板名称">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="是否包邮">
        <el-radio v-model="radio" label="1">自定义运费</el-radio>
        <el-radio v-model="radio" label="2">卖家承担运费</el-radio>
      </el-form-item>
      <el-form-item label="运费方式">
        <el-checkbox v-model="courierCheck">快递</el-checkbox>
        <div>
          <span>默认运费</span>
          <el-input v-model="input.input1" style="width: 10%"></el-input>
          <span>件内</span>
          <el-input v-model="input.input2" style="width: 10%"></el-input>
          <span>元，每增加</span>
          <el-input v-model="input.input3" style="width: 10%"></el-input>
          <span>件，增加运费</span>
          <el-input v-model="input.input4" style="width: 10%"></el-input>
          <span>元</span>
        </div>
        <!--    快递表格-->
        <el-col :span="24">
          <el-table
            :data="courierData"
            style="width: 100%;margin:0 auto;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="运送到">
              <template slot-scope="scope">
                <span>{{ scope.row.transportArea }}</span>
                <el-button type="text" @click="handleCourierEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
            <el-table-column label="首件数(件)">
              <template slot-scope="scope">
                <el-input style="width: 100%;" v-model="scope.row.firstPiece"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="首费(元)">
              <template slot-scope="scope">
                <el-input style="width: 100%;" v-model="scope.row.firstPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="续件数(件)">
              <template slot-scope="scope">
                <el-input style="width: 100%;" v-model="scope.row.addPiece"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="续费(元)">
              <template slot-scope="scope">
                <el-input style="width: 100%;" v-model="scope.row.addPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              width="100">
              <template slot-scope="scope">
<!--                <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>-->
                <el-button type="text" size="small" @click="handleDisable(scope.row)">禁用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-checkbox v-model="mailCheck">指定条件包邮</el-checkbox>
        <div>
          <el-button type="text" @click="addFreeMailType">增加包邮类型</el-button>
        </div>
        <!--    指定条件包邮表格-->
        <el-col :span="24">
          <el-table
            :data="conditionData"
            style="width: 100%;margin:0 auto;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="运送到">
              <template slot-scope="scope">
                <span>{{ scope.row.transportArea }}</span>
                <el-button type="text" @click="handleConditionEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
            <el-table-column label="设置包邮条件">
              <template slot-scope="scope">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                <div style="padding-top: 5px" v-if="value == '选项1'">
                  <span>满</span>
                  <el-input v-model="settingPiece" style="width: 20%"></el-input>
                  <span>件以上 包邮</span>
                </div>
                <div style="padding-top: 5px" v-if="value == '选项2'">
                  <span>满</span>
                  <el-input v-model="settingPrice" style="width: 20%"></el-input>
                  <span>元以上 包邮</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <!--                <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>-->
                <el-button type="text" size="small" @click="handleDisable(scope.row)">禁用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-form-item>


    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返回上一页</el-button>
      <el-button type="primary" @click="handleCommit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  export default {
    name: "create",
    mixins:[emitter],
    components:{
      Upload
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      }
    },
    data(){
      return{
        radio: '1',
        checkList:["快递", "指定条件包邮"],
        form:{

        },
        courierCheck: false,
        mailCheck: false,
        input:{
          input1:'',
          input2:'',
          input3:'',
          input4:'',
        },
        courierData:[
          {transportArea:'未添加地区',firstPiece:'', firstPrice:'', addPiece:'', addPrice:''}
          ],
        conditionData:[
          {transportArea:'未添加地区', freeMailCondition:''}
        ],
        options: [{
          value: '选项1',
          label: '件数'
        }, {
          value: '选项2',
          label: '金额'
        },],
        value: '',
        settingPiece:'',
        settingPrice:''
      }
    },
    computed:{
    },
    methods:{
      /*关闭窗口事件*/
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
        this.active = 0
      },
      handleCommit(){
        this.$emit('on-dialog-commit');
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      /*handleStatusChange(row) {
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

      },*/
      // 快递表格里面的编辑按钮
      handleCourierEdit(){
        alert("弹出一个选择区域的控件")
      },
      // 快递表格里面的禁用操作
      handleDisable(row){
        alert("尚未实现")
      },
      // 增加包邮类型
      addFreeMailType(){

      },
      // 指定条件包邮表格里面的编辑按钮
      handleConditionEdit(){
        alert("弹出一个选择区域的控件")
      }
    }
  }
</script>

<style scoped>

</style>
