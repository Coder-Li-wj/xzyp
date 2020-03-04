<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="45%"
    :before-close="handleClose">

    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
<!--        基本信息-->
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="formValidate" label-width="150px" >
            <el-form-item label="启用状态">
              <el-radio v-model="basicInfo.radio" label="1">启用</el-radio>
              <el-radio v-model="basicInfo.radio" label="2">禁用</el-radio>
            </el-form-item>
            <el-form-item label="所属父类别">
              <el-select v-model="basicInfo.parentCategory" placeholder="请选择">
                <el-option
                  v-for="item in basicInfo.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类名称" v-model="basicInfo.classifyName">
              <el-input type="password" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="排序数字" v-model="basicInfo.sortDigital">
              <el-input placeholder="请输入数字"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" v-model="basicInfo.classifyDescribe">
              <el-input placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <upload
                :max-size="5120"
                :limit="3"
              >
              </upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
<!--        通用规格管理-->
        <el-tab-pane label="通用规格管理" name="second">
          <el-row class="page">
            <!--    搜索-->
            <el-col :span="24">
              <search
                style="width: 95%;margin: 10px auto"
                :search-items="specManage.searchItems"
                @on-search="searchBySearchItemSpec"
              ></search>
            </el-col>
            <!--    按钮和分页-->
            <el-col :span="24">
              <div style="width: 95%;margin: 10px auto;">
                <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="toCreateSpec">新建</el-button>
                <!--        <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>-->
                <el-dropdown :trigger="'click'" @command="handleClickSpec" size="medium" @visible-change="onMenuChange">
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
                      @click.stop="handleSpecEdit"
                    >
                      编辑
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <div class="pager-group">
                  <el-pagination
                    @size-change="handleSizeChangeSpec"
                    @current-change="handleCurrentChangeSpec"
                    :current-page="specManage.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="specManage.pageSize"
                    layout="total, sizes, jumper, prev, next"
                    :total="specManage.total">
                  </el-pagination>
                </div>
              </div>
            </el-col>
            <!--    表格-->
            <el-col :span="24">
              <el-table
                :data="specManage.specData"
                style="width: 95%;margin:0 auto;"
                @selection-change="handleSelectionChange"
                row-key="id"
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="specName"
                  label="规格名"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  align="right"
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-link @click.stop="handleStatusChange(scope.row)" type="primary" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-link>
                    <el-link @click.stop="addChooseListSpec" type="primary" size="small">加入筛选列表</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <!--新建规格名弹出的对话框-->
          <el-dialog title="基本信息" :visible.sync="specManage.createSpecName.dialogVisible" width="30%" :modal-append-to-body='false'>
            <el-form label-width="100px">
              <el-form-item label="规格名">
                <el-input placeholder="请输入" v-model="specManage.specificationName"></el-input>
              </el-form-item>
              <el-form-item label="规格单位">
                <el-input placeholder="请输入" v-model="specManage.specificationUnit"></el-input>
              </el-form-item>
              <el-form-item label="规格数据类型">
                <el-select v-model="specManage.value" placeholder="请选择">
                  <el-option
                    v-for="item in specManage.dataType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="规格描述">
                <el-input placeholder="请输入" v-model="specManage.specificationDescribe"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancelSpecName">取 消</el-button>
            <el-button type="primary" @click="handleConfirmSpecName">确 定</el-button>
            </span>
          </el-dialog>
          <!--编辑规格名弹出的对话框-->
          <el-dialog title="编辑通用规格详情" :visible.sync="specManage.editSpecName.dialogVisible" :modal-append-to-body='false'>
            <el-form label-width="100px">
              <span style="font-size: 18px; font-weight: bold; margin-left:5px">基本信息</span>
              <el-form-item label="规格名">
                <el-input placeholder="请输入" v-model="specManage.specificationName"></el-input>
              </el-form-item>
              <el-form-item label="规格单位">
                <el-input placeholder="请输入" v-model="specManage.specificationUnit"></el-input>
              </el-form-item>
              <el-form-item label="规格数据类型">
                <el-select v-model="specManage.value" placeholder="请选择">
                  <el-option
                    v-for="item in specManage.dataType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="规格描述">
                <el-input placeholder="请输入" v-model="specManage.specificationDescribe"></el-input>
              </el-form-item>
              <span style="font-size: 18px; font-weight: bold; margin-left:5px">详细信息</span>
              <el-form-item label="规格选项">
                <el-button type="primary">启用</el-button>
                <el-button>禁用</el-button>
                <el-button type="primary" @click="createSpecValue">新增规格值</el-button>
              </el-form-item>
              <el-form-item>
                <el-table
                  :data="specManage.specValueData"
                  style="width: 90%;margin:0 auto;"
                  @selection-change="handleSelectionChange"
                  row-key="id">
                  <el-table-column
                    type="selection"
                    width="55"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="createSpecValue"
                    label="规格值"
                  >
                  </el-table-column>
                  <!--<el-table-column
                    prop="status"
                    label="状态"
                  >
                  </el-table-column>-->
                  <el-table-column
                    fixed="right"
                    align="right"
                    label="操作"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-link @click.stop="editSpecValue(scope.row)" type="primary" size="small">编辑</el-link>
                      <el-link @click.stop="handleStatusChange(scope.row)" type="primary" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>

            <!--新建规格值-->
            <el-dialog
              width="30%"
              title="新建规格值"
              :visible.sync="specManage.editSpecName.addInnerVisible"
              append-to-body>
              规格值<el-input v-model="specManage.createSpecValue" placeholder="请输入" style="margin-left: 20px"></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelCreateSpecValue">取 消</el-button>
                <el-button type="primary" @click="confirmCreateSpecValue">确 定</el-button>
              </div>
            </el-dialog>

            <!--编辑规格值-->
            <el-dialog
              width="30%"
              title="新建规格值"
              :visible.sync="specManage.editSpecName.editInnerVisible"
              append-to-body>
              规格值<el-input v-model="specManage.editSpecValue" placeholder="请输入" style="margin-left: 20px"></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEditSpecValue">取 消</el-button>
                <el-button type="primary" @click="confirmEditSpecValue">确 定</el-button>
              </div>
            </el-dialog>

            <div slot="footer" class="dialog-footer">
              <el-button @click="handleCancelSpecValue">取 消</el-button>
              <el-button type="primary" @click="handleCommitSpecValue">提交</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
<!--        通用参数管理-->
        <el-tab-pane label="通用参数管理" name="third">
          <el-row class="page">
            <!--    搜索-->
            <el-col :span="24">
              <search
                style="width: 95%;margin: 10px auto"
                :search-items="paraManage.searchItems"
                @on-search="searchBySearchItemPara"
              ></search>
            </el-col>
            <!--    按钮和分页-->
            <el-col :span="24">
              <div style="width: 95%;margin: 10px auto;">
                <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="toCreatePara">新建</el-button>
                <!--        <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>-->
                <el-dropdown :trigger="'click'" @command="handleClickPara" size="medium" @visible-change="onMenuChange">
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
                      @click.stop="handleParaEdit"
                    >
                      编辑
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <div class="pager-group">
                  <el-pagination
                    @size-change="handleSizeChangePara"
                    @current-change="handleCurrentChangePara"
                    :current-page="paraManage.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="paraManage.pageSize"
                    layout="total, sizes, jumper, prev, next"
                    :total="paraManage.total">
                  </el-pagination>
                </div>
              </div>
            </el-col>
            <!--    表格-->
            <el-col :span="24">
              <el-table
                :data="paraManage.paraData"
                style="width: 95%;margin:0 auto;"
                @selection-change="handleSelectionChange"
                row-key="id"
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="paraName"
                  label="规格名"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  align="right"
                  label="操作"
                  width="150">
                  <template slot-scope="scope">
                    <el-link @click.stop="handleStatusChange(scope.row)" type="primary" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-link>
                    <el-link @click.stop="addChooseListPara" type="primary" size="small">加入筛选列表</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <!--新建参数名弹出的对话框-->
          <el-dialog title="基本信息" :visible.sync="paraManage.createParaName.dialogVisible" width="30%" :modal-append-to-body='false'>
            <el-form label-width="100px">
              <el-form-item label="参数名">
                <el-input placeholder="请输入" v-model="paraManage.specificationName"></el-input>
              </el-form-item>
              <el-form-item label="参数单位">
                <el-input placeholder="请输入" v-model="paraManage.specificationUnit"></el-input>
              </el-form-item>
              <el-form-item label="参数数据类型">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in paraManage.dataType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="参数描述">
                <el-input placeholder="请输入" v-model="paraManage.specificationDescribe"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancelParaName">取 消</el-button>
            <el-button type="primary" @click="handleConfirmParaName">确 定</el-button>
            </span>
          </el-dialog>
          <!--编辑参数名弹出的对话框-->
          <el-dialog title="编辑通用参数详情" :visible.sync="paraManage.editParaName.dialogVisible" :modal-append-to-body='false'>
            <el-form label-width="100px">
              <span style="font-size: 18px; font-weight: bold; margin-left:5px">基本信息</span>
              <el-form-item label="参数名">
                <el-input placeholder="请输入" v-model="paraManage.specificationName"></el-input>
              </el-form-item>
              <el-form-item label="参数单位">
                <el-input placeholder="请输入" v-model="paraManage.specificationUnit"></el-input>
              </el-form-item>
              <el-form-item label="参数数据类型">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in paraManage.dataType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="参数描述">
                <el-input placeholder="请输入" v-model="paraManage.specificationDescribe"></el-input>
              </el-form-item>
              <span style="font-size: 18px; font-weight: bold; margin-left:5px">详细信息</span>
              <el-form-item label="参数选项">
                <el-button type="primary">启用</el-button>
                <el-button>禁用</el-button>
                <el-button type="primary" @click="createParaValue">新增参数值</el-button>
              </el-form-item>
              <el-form-item>
                <el-table
                  :data="paraManage.paraValueData"
                  style="width: 90%;margin:0 auto;"
                  @selection-change="handleSelectionChange"
                  row-key="id">
                  <el-table-column
                    type="selection"
                    width="55"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="createParaValue"
                    label="参数值"
                  >
                  </el-table-column>
                  <!--<el-table-column
                    prop="status"
                    label="状态"
                  >
                  </el-table-column>-->
                  <el-table-column
                    fixed="right"
                    align="right"
                    label="操作"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-link @click.stop="editParaValue(scope.row)" type="primary" size="small">编辑</el-link>
                      <el-link @click.stop="handleStatusChange(scope.row)" type="primary" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>

            <!--新建参数值-->
            <el-dialog
              width="30%"
              title="新建参数值"
              :visible.sync="paraManage.editParaName.addInnerVisible"
              append-to-body>
              参数值<el-input v-model="paraManage.createParaValue" placeholder="请输入" style="margin-left: 20px"></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelCreateParaValue">取 消</el-button>
                <el-button type="primary" @click="confirmCreateParaValue">确 定</el-button>
              </div>
            </el-dialog>

            <!--编辑参数值-->
            <el-dialog
              width="30%"
              title="新建参数值"
              :visible.sync="paraManage.editParaName.editInnerVisible"
              append-to-body>
              参数值<el-input v-model="paraManage.createParaValue" placeholder="请输入" style="margin-left: 20px"></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEditParaValue">取 消</el-button>
                <el-button type="primary" @click="confirmEditParaValue">确 定</el-button>
              </div>
            </el-dialog>

            <div slot="footer" class="dialog-footer">
              <el-button @click="handleCancelParaValue">取 消</el-button>
              <el-button type="primary" @click="handleCommitParaValue">提交</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </template>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSecondEditConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  import Search from "@/framework/components/search"
  import {search, count, del, enable, disable} from '@/project/service/user'

  export default {
    name: "secondEdit",
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
      const validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("登录密码不能为空"));
        } else {
          if (this.formValidate.password !== "") {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField("confirmPassword");
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("再次输入你的密码"));
        } else if (value !== this.formValidate.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      };
      const validateFileList = (rule, value, callback) => {
        if (this.formValidate.fileList.length === 0) {
          callback("头像不能为空");
        } else {
          callback();
        }
      };
      return{
        formValidate:{
          status:'启用',
          password:'',
          phone:'',
          sex:''
        },
        activeName: 'first',
        basicInfo:{//基本信息绑定的变量
          radio: '1',
          parentCategory:'',
          options:[
            {value:'选项1', label:'华为手机'},
            {value:'选项2', label:'小米手机'},
            {value:'选项3', label:'笔记本'},
            {value:'选项4', label:'智能穿戴'}
          ],
          classifyName:'',
          sortDigital:'',
          classifyDescribe:'',
        },
        specManage:{//通用规格管理绑定的变量
          createSpecName:{
            dialogVisible:false
          },
          editSpecName:{
            dialogVisible:false,
            addInnerVisible:false,
            editInnerVisible:false
          },
          searchItems: [
            {
              name: "规格名称",
              key: "specName",
              type: "string"
            },
            {
              name: "状态",
              key: "status",
              type: "select",
              displayValue: ["禁用", "启用"],
              value: ["禁用", "启用"]
            }
          ],
          pageSize: 10,
          page: 1,
          total: 0,
          specData:[
            /*{paraName:"内存", status:'启用'},
            {paraName:"成色", status:'启用'},
            {paraName:"显卡", status:'禁用'},
            {paraName:"运行内存", status:'启用'},
            {paraName:"成色", status:'禁用'}*/
          ],
          specificationName:'',
          specificationUnit:'',
          specificationDescribe:'',
          dataType: [
            {value: '选项1', label: '文本型'},
            {value: '选项2', label: '数值型'},
            {value: '选项3', label: '日期型'}
          ],
          value: '',
          createSpecValue:'',
          editSpecValue:'',
          specValueData:[{createSpecValue:"99成", status:'启用'},{createSpecValue:"88成", status:'启用'}],
        },
        paraManage:{//通用参数管理绑定的变量
          createParaName:{
            dialogVisible:false
          },
          editParaName:{
            dialogVisible:false,
            addInnerVisible:false,
            editInnerVisible:false
          },
          searchItems: [
            {
              name: "参数名称",
              key: "paraName",
              type: "string"
            },
            {
              name: "状态",
              key: "status",
              type: "select",
              displayValue: ["禁用", "启用"],
              value: ["禁用", "启用"]
            }
          ],
          pageSize: 10,
          page: 1,
          total: 0,
          paraData:[
            /*{specName:"内存", status:'启用'},
            {specName:"成色", status:'启用'},
            {specName:"显卡", status:'禁用'},
            {specName:"运行内存", status:'启用'},
            {specName:"成色", status:'禁用'}*/
          ],
          specificationName:'',
          specificationUnit:'',
          specificationDescribe:'',
          dataType: [
            {value: '选项1', label: '文本型'},
            {value: '选项2', label: '数值型'},
            {value: '选项3', label: '日期型'}
          ],
          value: '',
          paraValue:'',
          createParaValue:'',
          editParaValue:'',
          paraValueData:[{createParaValue:"99成", status:'启用'},{createParaValue:"88成", status:'启用'}],
        },
        menu: {
          visible: false
        },
        selectList: [],
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
      // 二级分类编辑页面的确定事件
      handleSecondEditConfirm(){
        this.$emit('on-dialog-confirm');
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 通用规格管理搜索事件
      searchBySearchItemSpec(searchItems) {
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.specManage.searchItems,
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
      // 通用参数管理搜索事件
      searchBySearchItemPara(searchItems) {
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.paraManage.searchItems,
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
      onMenuChange(val) {
        console.log(val);
      },
      // 通用规格管理的分页事件
      handleCurrentChangeSpec(val) {
        this.specManage.page = val;
        this.search(this.specManage.page);
      },
      // 通用参数管理的分页事件
      handleCurrentChangePara(val) {
        this.paraManage.page = val;
        this.search(this.paraManage.page);
      },
      // 通用规格管理的分页事件
      handleSizeChangeSpec(pageSize) {
        this.specManage.pageSize = pageSize;
        this.search(this.specManage.page);
      },
      // 通用参数管理的分页事件
      handleSizeChangePara(pageSize) {
        this.paraManage.pageSize = pageSize;
        this.search(this.paraManage.page);
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
      // 通用规格管理的更多操作
      handleClickSpec(command) {
        switch (command) {
          case '编辑':
            console.log('编辑');
            this.editId = this.selectList[0].id;
            this.specManage.editSpecName.dialogVisible = true
            this.handleSpecEdit()
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
      // 通用参数管理的更多操作
      handleClickPara(command) {
        switch (command) {
          case '编辑':
            console.log('编辑');
            this.editId = this.selectList[0].id;
            this.paraManage.editParaName.dialogVisible = true
            this.handleParaEdit()
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
              _t.search(_t.specManage.page);
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
              _t.search(_t.specManage.page);
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
      // 表格的操作中状态切换
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
              _t.search(_t.specManage.page);
            })
          } else {
            enable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已启用!'
              });
              _t.search(_t.specManage.page);
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },



      //通用规格管理的加入筛选列表
      addChooseListSpec(){
        alert("尚未实现")
      },
      // 通用规格管理的新建事件
      toCreateSpec() {
        this.specManage.createSpecName.dialogVisible = true;
      },
      // 新建规格名弹出的对话框中的确定事件
      handleConfirmSpecName(){
        this.specManage.specData.push({specName: this.specManage.specificationName, status:'启用'})
        this.specManage.specificationName = ''
        this.specManage.createSpecName.dialogVisible = false;
      },
      // 新建规格名弹出的对话框中的取消事件
      handleCancelSpecName(){
        this.specManage.createSpecName.dialogVisible = false;
      },
      // 通用规格管理的规格编辑事件
      handleSpecEdit(){
        this.specManage.editSpecName.dialogVisible = true
      },
      // 编辑通用规格详情中的编辑规格值
      editSpecValue(){
        this.specManage.editSpecName.editInnerVisible = true
      },
      // 编辑通用规格详情中的新建规格值
      createSpecValue(){
        this.specManage.editSpecName.addInnerVisible = true
      },
      // 编辑规格值弹出的对话框的提交事件
      handleCommitSpecValue(){
        this.specManage.editSpecName.dialogVisible = false;
      },
      // 编辑规格值弹出的对话框的取消事件
      handleCancelSpecValue(){
        this.specManage.editSpecName.dialogVisible = false;
      },
      // 新建规格值弹出的对话框的确定事件
      confirmCreateSpecValue(){
        if(this.specManage.createSpecValue != ''){
          this.specManage.specValueData.push({createSpecValue:this.specManage.createSpecValue, status:"禁用"})
          this.specManage.createSpecValue = ''
        }
        this.specManage.editSpecName.addInnerVisible = false
      },
      // 新建规格值弹出的对话框的取消事件
      cancelCreateSpecValue(){
        this.specManage.editSpecName.addInnerVisible = false
      },
      // 编辑规格值弹出的对话框的确定事件
      confirmEditSpecValue(){
        this.specManage.editSpecName.editInnerVisible = false
      },
      // 编辑规格值弹出的对话框的取消事件
      cancelEditSpecValue(){
        this.specManage.editSpecName.editInnerVisible = false
      },



      //通用参数管理的加入筛选列表
      addChooseListPara(){
        alert("尚未实现")
      },
      // 通用规格管理的新建事件
      toCreatePara() {
        this.paraManage.createParaName.dialogVisible = true;
      },
      // 新建参数名弹出的对话框中的确定事件
      handleConfirmParaName(){
        this.paraManage.paraData.push({paraName: this.paraManage.specificationName, status:'启用'})
        this.paraManage.specificationName = ''
        this.paraManage.createParaName.dialogVisible = false;
      },
      // 新建参数名弹出的对话框中的取消事件
      handleCancelParaName(){
        this.paraManage.createParaName.dialogVisible = false;
      },
      // 通用参数管理的规格编辑事件
      handleParaEdit(){
        this.paraManage.editParaName.dialogVisible = true
      },
      // 编辑通用参数详情中的编辑规格值
      editParaValue(){
        this.paraManage.editParaName.editInnerVisible = true
      },
      // 编辑通用参数详情中的新建规格值
      createParaValue(){
        this.paraManage.editParaName.addInnerVisible = true
      },
      // 编辑参数值弹出的对话框的提交事件
      handleCommitParaValue(){
        this.paraManage.editParaName.dialogVisible = false;
      },
      // 编辑参数值弹出的对话框的取消事件
      handleCancelParaValue(){
        this.paraManage.editParaName.dialogVisible = false;
      },
      // 新建参数值弹出的对话框的确定事件
      confirmCreateParaValue(){
        if(this.paraManage.createParaValue != ''){
          this.paraManage.paraValueData.push({createParaValue:this.paraManage.createParaValue, status:"禁用"})
          this.paraManage.createParaValue = ''
        }
        this.paraManage.editParaName.addInnerVisible = false
      },
      // 新建参数值弹出的对话框的取消事件
      cancelCreateParaValue(){
        this.paraManage.editParaName.addInnerVisible = false
      },
      // 编辑参数值弹出的对话框的确定事件
      confirmEditParaValue(){
        this.paraManage.editParaName.editInnerVisible = false
      },
      // 编辑规格值弹出的对话框的取消事件
      cancelEditParaValue(){
        this.paraManage.editParaName.editInnerVisible = false
      },
    }
  }
</script>

<style scoped>

</style>
