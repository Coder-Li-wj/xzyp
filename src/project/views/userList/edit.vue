<template>
  <el-dialog
    title="编辑"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px">
      <el-form-item label="基本信息" style="font-weight: bolder; margin-left: -50px;">
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formValidate.phone"  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <!--<el-form-item label="密码" prop="password" >
        <el-input type="password" v-model="formValidate.password"></el-input>
      </el-form-item>-->
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formValidate.nickname" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar" v-if="isFinished">
        <Upload
          @on-transport-file-list="handleTransportFileList"
          :max-size="5120"
          :limit="1"
          :file-list="[formValidate.avatar]"
        >
        </Upload>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="formValidate.gender" label="男">男</el-radio>
        <el-radio v-model="formValidate.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="formValidate.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注信息" style="font-weight: bolder; margin-left: -50px;">
        <i class="el-icon-edit" @click="changeEdit"></i>
      </el-form-item>
      <el-form-item label="备注">
        <span v-show="!edit">{{formValidate.comment}}</span>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleClose('formValidate')">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('formValidate')">确 定</el-button>
      </el-form-item>

      <!--备注信息对话框-->
      <el-dialog title="备注" :visible.sync="dialogFormVisible" :modal = "false"  width="30%" top="10%">
        <el-form>
          <el-form-item>
            <el-input v-model="formValidate.comment" type="textarea" :row="2" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { addUserAndUpdate, findById} from '@/project/service/userList'

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
      },
      editId:{
        type:Number,
        default: 0
      },
      editPage:{
        type:Number,
        default: 0
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
        isFinished:false,
        dialogFormVisible:false,
        formValidate:{
          password:'',
          phone:'',
          nickname:'',
          avatar:'',
          gender:'',
          birthday:'',
          comment:''
        },
        ruleValidate: {
          /*password: [
            {
              required: true,
              message: "密码不能为空",
              trigger: "blur"
            },
            // { type: "password", message:"6-20位，支持字母、下划线、数字", trigger: "blur"}
          ],*/
          phone: [
            {
              required: true,
              message: "手机号不能为空",
              trigger: "blur"
            }
          ],
          avatar:[
            {
              required: true,
              message: "头像不能为空",
              trigger: "blur"
            }
          ],
        },
        active: 0,
        edit: false,
        originalEditMessage:'',
      }
    },
    computed:{
    },
    watch: {
      editId(val) {
        this.findById(val);
      }
    },
    methods:{
      /*关闭窗口事件*/
      handleClose(formName){
        // this.visible = false;
        this.$emit('on-dialog-close');
        // this.$refs[formName].resetFields();
      },
      handleConfirm(formName){
        this.broadcast('SiUpload','on-form-submit',() => {});//事件广播
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*let data = JSON.parse(JSON.stringify(this.formValidate))
            let id = this.editId*/
            if (this.formValidate.id != 0) {
              addUserAndUpdate({user: this.formValidate}, res => {
                console.log(res);
                this.$message.success('修改成功');
                this.$emit('on-edit-search',this.editPage);
              })
              this.$emit('on-dialog-close');
            }
            /*if(id != 0){
              data.id = id
              addUserAndUpdate({user:data}, res => {
                console.log(res)
                this.$message({message:"修改成功",type: 'success'})
                // this.$refs[formName].resetFields();
                this.fileList = []
                this.formValidate.comment = ""
                this.$emit('on-edit-search',this.editPage);
              })
              this.$emit('on-dialog-close');
            } else {
              return false;
            }*/
            /*if(id == 0) {
              addUserAndUpdate({user:data}, res => {
                console.log(res)
                this.$message({message:"新建成功",type: 'success'})
                // this.search(this.page)
                this.$refs[formName].resetFields();
                this.fileList = []
                this.formValidate.comment = ""
              })
              this.$emit('on-dialog-close');
            } else {
              return false;
            }*/
          }
        });
      },
      handleTransportFileList(fileList){
        console.log(fileList)
        this.formValidate.avatar = fileList[0].response.data;
        /*if(fileList[0].response.code =="200"){
          this.formValidate.avatar = 'http://120.79.38.151/attachment/' + fileList[0].response.data;
        }*/
      },
      changeEdit(){
        this.dialogFormVisible = true
        this.originalEditMessage = this.formValidate.comment
      },
      /*备注信息里面的取消按钮事件*/
      cancel(){
        this.formValidate.comment = this.originalEditMessage
        this.dialogFormVisible = false
      },
      /*备注信息里面的确定按钮事件*/
      confirm(){
        this.dialogFormVisible = false
      },
      findById(id) {
        this.isFinished = false;
        findById({id: id}, res => {
          // this.formValidate = res;
          let keys = Object.keys(res);
          // console.log(res)
          keys.map(key => {
            this.formValidate[key] = res[key];
          });
          this.isFinished = true;
        });
      }
    },
  }
</script>
<style scoped>

</style>
