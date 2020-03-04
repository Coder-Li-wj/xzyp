<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="formValidate" label-width="150px" >
      <el-form-item label="启用状态">
        <el-radio v-model="radio" label="1">启用</el-radio>
        <el-radio v-model="radio" label="2">禁用</el-radio>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input type="password" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="排序数字">
        <el-input placeholder="请输入数字"></el-input>
      </el-form-item>
      <el-form-item label="分类描述">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <upload
          @on-transport-file-list="handleTransportFileList"
          :max-size="5120"
          :limit="3"
        >
        </upload>
      </el-form-item>
      <el-form-item label="首页图片">
        <upload
          @on-transport-file-list="handleTransportFileList"
          :max-size="5120"
          :limit="3"
        >
        </upload>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleFirstEditConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  export default {
    name: "edit",
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
        radio: '1',
        form:{

        }
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
      // 一级分类编辑页面的确定事件
      handleFirstEditConfirm(){
        this.$emit('on-dialog-confirm');
      },
      handleTransportFileList(fileList){
        console.log(fileList);
      },
    }
  }
</script>

<style scoped>

</style>
