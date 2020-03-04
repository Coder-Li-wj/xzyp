<template>
  <el-dialog
    title="商品详情"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="参数"></el-step>
      <el-step title="规格"></el-step>
      <el-step title="商品列表"></el-step>
    </el-steps>
    <!--    基本信息form1-->
    <el-form label-width="150px" v-if="active === 0" :model="form1">
      <span style="font-size: 18px; font-weight: bold; margin-left:30px">基本信息</span>
      <el-form-item label="商品分类">
        <el-input placeholder="关键字搜索" v-model="form1.goodType1"></el-input>
        <el-input placeholder="关键字搜索" v-model="form1.goodType2"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input placeholder="请输入" v-model="form1.goodName"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input placeholder="请输入" v-model="form1.subtitle"></el-input>
      </el-form-item>
      <el-form-item label="是否限购">
        <el-radio-group v-model="form1.limitPurchase">
          <el-radio label="否"></el-radio>
          <el-radio label="是"></el-radio>
          <el-input placeholder="请输入数量" v-model="form1.limitPurchaseNumber" v-show="form1.limitPurchase == '是' "></el-input>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品标签">
        <el-checkbox-group v-model="form1.goodTag">
          <el-checkbox label="爆款"></el-checkbox>
          <el-checkbox label="顺丰包邮"></el-checkbox>
          <el-checkbox label="热销"></el-checkbox>
          <el-checkbox label="抢购"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="服务标签">
        <el-checkbox-group v-model="form1.serviceTag">
          <el-checkbox label="七日包退"></el-checkbox>
          <el-checkbox label="180天保修"></el-checkbox>
          <el-checkbox label="顺丰包邮"></el-checkbox>
          <el-checkbox label="全国包邮"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="其他标签">
        <el-checkbox-group v-model="form1.otherTag">
          <el-checkbox label="正品自营"></el-checkbox>
          <el-checkbox label="全网通"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="原价">
        <el-input placeholder="请输入原价" v-model="form1.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="现价">
        <el-input placeholder="请输入现价" v-model="form1.presentPrice"></el-input>
      </el-form-item>
      <span style="font-size: 18px; font-weight: bold; margin-left:30px">支付信息</span>
      <el-form-item label="付款方式">
        <el-checkbox-group v-model="form1.payWay">
          <el-checkbox label="微信"></el-checkbox>
          <el-checkbox label="支付宝"></el-checkbox>
          <el-checkbox label="余额"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <span style="font-size: 18px; font-weight: bold; margin-left:30px">图文信息</span>
      <el-form-item label="商品主图视频">
        <upload
          type="file"
          :max-size="50000"
          :limit="100"
        >
        </upload>
      </el-form-item>
      <el-form-item label="商品主图">
        <upload
          :max-size="50000"
          :limit="50"
        >
        </upload>
      </el-form-item>
      <el-form-item>
        <span style="margin:0 20px 0 -100px">是否以第一张商品主图作为商品缩略图</span>
        <el-radio-group v-model="form1.beMainPicture">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
        <upload
          :max-size="50000"
          :limit="1" v-show="this.form1.beMainPicture == '否' ">
        </upload>
      </el-form-item>
      <el-form-item ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="120px"
                    v-if="active === 0" label="APP端图文详情" prop="content">
        <Editor :defaultContent="formValidate.content" @on-change-content="onChangeEditor"
                style="margin-bottom: 100px"/>
      </el-form-item>
    </el-form>

    <!--    参数form2-->
    <el-form label-width="150px" v-if="active === 1" :model="form2">
      <span style="font-size: 18px; font-weight: bold; margin-left:30px">商品参数</span>
      <el-form-item label="包装清单">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form2.packList">
        </el-input>
      </el-form-item>
      <el-form-item label="售后服务">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form2.afterSaleService">
        </el-input>
      </el-form-item>
      <span style="font-size: 18px; font-weight: bold; margin-left:30px">特有参数设置</span>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" round @click="createUniquePara">
          新增商品特有参数
        </el-button>
        <el-row type="flex" class="row-bg" v-for="(item, index) in form2.list" :key="index">
          <el-col :span="6">{{item.paraName}}</el-col>
          <el-col :span="6">{{item.paraValue}}</el-col>
          <el-col :span="6"><i class="el-icon-error" @click="iDelete(index)"></i></el-col>
        </el-row>
        <el-dialog title="提示" :visible.sync="form2.dialogFormVisible" width="30%" center :modal-append-to-body='false'>
          <el-form :model="form2">
            <el-form-item label="参数名">
              <el-input placeholder="请输入" v-model="form2.paraName"></el-input>
            </el-form-item>
            <el-form-item label="参数值">
              <el-input placeholder="请输入" v-model="form2.paraValue"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancelPara">取 消</el-button>
            <el-button type="primary" @click="handleConfirmPara">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <span style="font-size: 18px; font-weight: bold; margin-left:30px">通用参数设置</span>
      <el-form-item label="前置摄像头">
        <el-select v-model="form2.value1" placeholder="请选择">
          <el-option
            v-for="item in form2.frontCamera"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="后置摄像头">
        <el-select v-model="form2.value2" placeholder="请选择">
          <el-option
            v-for="item in form2.rearCamera"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!--    规格form3-->
    <el-form label-width="150px" v-if="active === 2" :model="form3">
      <p style="font-size: 18px; font-weight: bold; margin-left:0px; margin-bottom: 20px">商品规格（销售属性）</p>
      <span style="font-size: 18px; font-weight: bold; margin-left:30px">特殊规格设置</span>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" round @click="createUniqueSpec">
        新增商品特有规格
      </el-button>

        <div v-for="(uniqueSpecItem) in form3.specialSpecList">
          <span style="margin-right: 10%">{{uniqueSpecItem.specificationName}}</span>
          <span style="margin-right: 2%" v-for="(attrItem, attrIndex) in uniqueSpecItem.attrList">
            <el-button style="height: 10%; width: 10%;">
              {{attrItem}}
              <i class="el-icon-circle-close" style="margin-left: 5%" @click="deleteSpecialAttr(attrIndex, uniqueSpecItem)"></i>
            </el-button>
          </span>
          <el-button type="primary" icon="el-icon-plus" @click="addSpecialSpecAttr(uniqueSpecItem)"></el-button>
        </div>

        <!--添加特殊规格对话框-->
        <el-dialog title="提示" :visible.sync="form3.dialogFormVisible1" width="30%" center :modal-append-to-body='false'>
          <el-form label-width="100px" :model="form3">
            <el-form-item label="规格名">
              <el-input placeholder="请输入规格名" v-model="form3.specificationName"></el-input>
            </el-form-item>
            <el-form-item label="规格单位">
              <el-input placeholder="请输入" v-model="form3.specificationUnit"></el-input>
            </el-form-item>
            <el-form-item label="规格数据类型">
              <el-select v-model="form3.value" placeholder="请选择">
                <el-option
                  v-for="item in form3.dataType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancelSpec">取 消</el-button>
            <el-button type="primary" @click="handleConfirmSpec">确 定</el-button>
          </div>
        </el-dialog>
        <!--添加特殊规格属性对话框-->
        <el-dialog title="提示" :visible.sync="form3.dialogFormVisible2" width="20%" :modal-append-to-body='false'>
          <el-input v-model="form3.inputAttr"></el-input>
          <el-button @click="handleCancelAttr">取 消</el-button>
          <el-button type="primary" @click="handleConfirmAttr()">确 定</el-button>
        </el-dialog>
      </el-form-item>

      <span style="font-size: 18px; font-weight: bold; margin-left:30px">通用规格设置</span>
      <el-form-item>
        <div v-for="generalSpecItem in form3.generalSpecList">
          <span style="margin-right: 10%">{{generalSpecItem.specificationName}}</span>
          <span style="margin-right: 2%" v-for="(attrItem, attrIndex) in generalSpecItem.attrList">
                 <el-button style="height: 10%; width: 10%;">
                {{attrItem}}
                <i class="el-icon-circle-close" style="margin-left: 5%" @click="deleteGeneralAttr(generalSpecItem, attrIndex)"></i>
              </el-button>
          </span>
          <el-button type="primary" icon="el-icon-plus" @click="addGeneralSpecAttr"></el-button>
        </div>
<!--        添加通用规格的属性对话框-->
        <el-dialog title=" " :visible.sync="form3.dialogFormVisible3" width="40%" :modal-append-to-body='false'>
          <el-col :span="24" style="margin-top: 20px">
            <el-table
              :data="form3.attrForm"
              style="width: 90%;margin:0 auto;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="specValue"
                label="规格值"
              >
              </el-table-column>
              <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-link type="primary" @click="addToGeneralSpec(form3.attrForm.id)">添加</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancelAdd">取 消</el-button>
            <el-button type="primary" @click="handleConfirmAdd">确 定</el-button>
          </div>
        </el-dialog>

      </el-form-item>
    </el-form>

    <!--    商品列表form4-->
    <el-form label-width="150px" v-if="active === 3" :model="form4">
      <span style="font-size: 18px; font-weight: bold; margin-left:30px">商品销售规格</span>
      <!--    搜索-->
      <el-col :span="24">
        <search
          style="width: 90%;margin: 20px auto"
          :search-items="form4.searchItems"
          @on-search="searchBySearchItem"
        ></search>
      </el-col>
      <!--批量操作-->
      <el-row :gutter="0">
        <el-col :span="8">
          <span>市场价</span>
          <el-input style="width: 40%;" v-model="form4.marketPrice" placeholder="请输入"></el-input>
          <el-button type="primary" @click="batchSet">一键修改</el-button>
        </el-col>
        <el-col :span="8">
          <span>现价</span>
          <el-input style="width: 40%;" v-model="form4.nowPrice" placeholder="请输入"></el-input>
          <el-button type="primary" @click="batchCancel">一键修改</el-button>
        </el-col>
        <el-col :span="8">
          <span>库存</span>
          <el-input style="width: 40%;" v-model="form4.repertory" placeholder="请输入"></el-input>
          <el-button type="primary" @click="batchCancel">一键修改</el-button>
        </el-col>
      </el-row>
      <!--    SKU列表-->
      <el-col :span="24">
        <el-table
          :data="form4.skuTable"
          style="width: 95%;margin:30px auto;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="spu"
            label="SPU"
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
            prop="memory"
            label="内存"
          >
          </el-table-column>
          <el-table-column
            prop="network"
            label="网络"
          >
          </el-table-column>
          <el-table-column
            prop="marketPrice"
            label="市场价"
          >
            <el-input style="width: 110%;" placeholder="请输入"></el-input>
          </el-table-column>
          <el-table-column
            prop="nowPrice"
            label="现价"
          >
            <el-input style="width: 110%;" placeholder="请输入"></el-input>
          </el-table-column>
          <el-table-column
            prop="repertory"
            label="库存"
          >
            <el-input style="width: 110%;" placeholder="请输入"></el-input>
          </el-table-column>
          <el-table-column
            label="SPU图片"
            fixed="right"
            align="center"
            width="150"
          >
            <div style="display: flex; justify-content: space-around; background-color: #fff" >
              <el-image
                style="width: 30%; height: 30%"
                :src="form4.imageSrc"
                v-show="form4.imageSrc != ' '"
              ></el-image>
              <el-button v-show="form4.imageSrc != ' '" type="primary" style="padding: 5px 15px; height: 25px;" round @click="uploadTableImage">修改</el-button>
              <el-button v-show="form4.imageSrc == ' '" type="primary" style="padding: 5px 15px; height: 25px;" round @click="uploadTableImage">上传</el-button>
            </div>
          </el-table-column>
        </el-table>
        <!--        SKU列表里面上传或修改图片对话框-->
        <el-dialog title="添加图片" :visible.sync="form4.dialogFormVisible4" :modal-append-to-body='false' width="30%">
          <el-form>
            <el-form-item label="相册查找">
              <el-input placeholder="输入图片ID"></el-input>
            </el-form-item>
            <el-form-item label="本地上传">
              <upload
                :max-size="50000"
                :limit="100"
              >
              </upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancelUpload">取 消</el-button>
            <el-button type="primary" @click="handleConfirmUpload">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-form>

    <div style="text-align: center">
      <el-button type="info" @click="pre" v-if="active>0">上一步</el-button>
      <el-button type="info" @click="next" v-if="active<3">下一步</el-button>
      <el-button type="info" @click="handleSubmit" v-if="active==3">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import {save} from '@/project/service/manager'
  import Editor from "@/framework/components/editor"
  import Search from "@/framework/components/search";
  import {search, count, del, enable, disable} from '@/project/service/manager'

  export default {
    name: "dialog",
    mixins: [emitter],
    components: {
      Upload, Editor, Search
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      }
    },
    data() {
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
      return {
        formValidate: {
          title: '',
          content: '',
          scope: '',
          type: this.messageType,
          createAt: "2019-11-30 17:15:39"
        },
        ruleValidate: {
          title: [{required: true, message: '不能为空', trigger: 'blur'}],
          subtitle: [{required: true, message: '不能为空', trigger: 'blur'}],
        },
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
        form1: {
          goodType1: '',
          goodType2: '',
          limitPurchase: '否',
          limitPurchaseNumber: null,
          goodName: '',
          subtitle: '',
          goodTag: [],
          serviceTag: [],
          otherTag: [],
          originalPrice: '',
          presentPrice: '',
          payWay: [],
          dialogImageUrl: '',
          dialogVisible: false,
          beMainPicture: ''
        },
        form2: {
          packList: '',
          afterSaleService: '',
          dialogFormVisible: false,
          paraName: '',
          paraValue: '',
          list: [{paraName: '无线充电', paraValue: '有'}],
          frontCamera: [
            {value: '选项1', label: '8000W'},
            {value: '选项2', label: '5000W'},
            {value: '选项3', label: '3000W'}
          ],
          rearCamera: [
            {value: '选项1', label: '8000W'},
            {value: '选项2', label: '5000W'},
            {value: '选项3', label: '3000W'}
          ],
          value1: '',
          value2: '',
        },
        form3: {
          dialogFormVisible1: false,
          specificationName: '',
          specificationUnit: '',
          dataType: [
            {value: '选项1', label: '文本型'},
            {value: '选项2', label: '数值型'},
            {value: '选项3', label: '日期型'}
          ],
          value: '',
          specialSpecList: [
            {specificationName: '颜色', attrList: ['红色', '黑色', '白色']},
          ],
          inputAttr: '',
          dialogFormVisible2: false,
          uniqueSpecItem:'',
          generalSpecList: [
            {specificationName: '成色', attrList: ['66成']}
          ],
          dialogFormVisible3:false,
          attrForm:[
            {id:1, specValue: '99成'},
            {id:2, specValue: '88成'},
            {id:3, specValue: '77成'}
          ],
          selectList:[]
        },
        form4: {
          searchItems: [
            {
              name: "颜色",
              key: "color",
              type: "string"
            },
            {
              name: "运行内存",
              key: "runMemory",
              type: "string"
            },
            {
              name: "内存",
              key: "memory",
              type: "string"
            },
            {
              name: "网络",
              key: "network",
              type: "string"
            }
          ],
          marketPrice:'',
          nowPrice:'',
          repertory:'',
          skuTable:[
            {spu:'124', color:'黑色', runMemory:'4GB', memory:'128GB', network:'全网通'},
            {spu:'452', color:'白色', runMemory:'6GB', memory:'128GB', network:'电信'},
            {spu:'457', color:'红色', runMemory:'8GB', memory:'128GB', network:'全网通'},
            {spu:'567', color:'白色', runMemory:'4GB', memory:'128GB', network:'移动+电信'},
            {spu:'545', color:'黑色', runMemory:'8GB', memory:'128GB', network:'全网通'}
          ],
          imageSrc:'https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=2061622183,376047458&fm=74&app=80&f=JPEG&size=f121,121?sec=1880279984&t=d519a6df82b0616fc68118a1a853de76',
          // imageSrc:' '
          dialogFormVisible4: false
        },
        active: 0,
      }
    },
    computed: {},
    methods: {
      handleClose() {
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleTransportFileList(fileList) {
        console.log(fileList);
      },
      // 步骤条上一步
      pre() {
        if (this.active-- < 0) this.active = 0;
      },
      // 步骤条下一步
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      // 步骤条提交事件
      handleSubmit(){
        this.$emit('on-dialog-submit')
      },
      //图文详情
      onChangeEditor(val) {
        this.form1.formValidate.contet = val.html;
      },
      // 新增商品特有参数事件
      createUniquePara() {
        this.form2.dialogFormVisible = true
        this.form2.paraName = ''
        this.form2.paraValue = ''
      },
      // 新增商品特有参数对话框的取消事件
      handleCancelPara() {
        this.form2.dialogFormVisible = false
      },
      // 新增商品特有参数对话框的确定事件
      handleConfirmPara() {
        if (this.form2.paraName != '') {//判断参数名和参数值是否不为空
          this.form2.list.push({paraName: this.form2.paraName, paraValue: this.form2.paraValue})
        } else {//参数名或参数值为空时弹出提示
          this.$message.error('请正确输入特有参数');
        }
        this.form2.dialogFormVisible = false
      },
      // 特有参数设置删除事件
      iDelete(index) {
        // alert(index)
        this.form2.list.splice(index, 1)
      },
      // 新增商品特有规格事件
      createUniqueSpec() {
        this.form3.dialogFormVisible1 = true
        this.form3.specificationName = ''
        this.form3.specificationUnit = ''
      },
      // 新增商品特有规格对话框的取消事件
      handleCancelSpec() {
        this.form3.dialogFormVisible1 = false
      },
      // 新增商品特有规格对话框的确定事件
      handleConfirmSpec() {
        if (this.form3.specificationName != '' && this.form3.paraValue != '') {//判断规格名是否不为空
          this.form3.specialSpecList.push({specificationName: this.form3.specificationName, attrList: []})
        } else {//规格名为空时弹出提示
          this.$message.error('请正确输入特有参数');
        }
        this.form3.dialogFormVisible1 = false
      },
      // 特殊规格设置的属性添加事件
      addSpecialSpecAttr(uniqueSpecItem) {
        this.uniqueSpecItem = uniqueSpecItem
        this.form3.dialogFormVisible2 = true
      },
      // 新增特殊规格属性的取消事件
      handleCancelAttr() {
        this.form3.dialogFormVisible2 = false
      },
      // 新增特殊规格属性的确定事件
      handleConfirmAttr() {
        console.log(this.uniqueSpecItem.attrList)
        if (this.form3.inputAttr != '') {//判断属性输入是否不为空
          this.uniqueSpecItem.attrList.push(this.form3.inputAttr)
        } else {//规格名为空时弹出提示
          this.$message.error('请正确输入特有参数');
        }
        this.form3.inputAttr = ''
        this.form3.dialogFormVisible2 = false
      },
      // 删除所点击特殊规格的属性
      deleteSpecialAttr(index, uniqueSpecItem){
        this.uniqueSpecItem = uniqueSpecItem
        this.uniqueSpecItem.attrList.splice(index, 1)
      },
      // 点击添加选择通用规格的属性
      addGeneralSpecAttr(){
        this.form3.dialogFormVisible3 = true
      },
      handleSelectionChange(val) {
        this.form3.selectList = val;
        // console.log(val)
      },
      // 将选择通用规格属性的对话框里面的属性添加到通用规格属性中
      addToGeneralSpec(tableId){
        this.form3.generalSpecList[0].attrList.push(this.form3.attrForm[0].specValue)
      },
      // 通用规格属性添加对话框的取消事件
      handleCancelAdd(){
        this.form3.dialogFormVisible3 = false
      },
      // 通用规格属性添加对话框的确定事件
      handleConfirmAdd(){
        this.form3.dialogFormVisible3 = false
      },
      // 删除所点击通用规格的属性
      deleteGeneralAttr(generalSpecItem, attrIndex){
        // this.uniqueSpecItem = uniqueSpecItem
        generalSpecItem.attrList.splice(attrIndex, 1)
      },
      //商品列表中搜索事件
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
      // SKU列表里面上传或修改图片事件
      uploadTableImage(){
        this.form4.dialogFormVisible4 = true
      },
      // SKU列表里面上传或修改图片对话框的取消事件
      handleCancelUpload(){
        this.form4.dialogFormVisible4 = false
      },
      // SKU列表里面上传或修改图片对话框的确定事件
      handleConfirmUpload(){
        this.form4.dialogFormVisible4 = false
      }
    },

  }
</script>

<style scoped>
.batchOperation{
  display: flex;

}
</style>
