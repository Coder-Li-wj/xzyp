<template>
    <div>
      <el-card>
        <div slot="header">
          <span style="font-weight: bold; font-size: 20px">基本参数</span>
        </div>

        <span style="font-weight: bold">基本信息</span>
        <el-button type="text" icon="el-icon-edit" @click="handleEdit1"></el-button>

        <div>
          <el-form ref="form" label-width="150px">
            <el-form-item label="平台联系电话">
              {{ platformPhone }}
            </el-form-item>
          </el-form>
        </div>

          <span style="font-weight: bold">快递接口</span>
          <el-button type="text" icon="el-icon-edit" @click="handleEdit2"></el-button>
        <div>
          <el-form ref="form" label-width="150px">
            <el-form-item label="公司编号">
              {{ companyNumber }}
            </el-form-item>
            <el-form-item label="授权秘钥">
              {{ authorizeKey }}
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <el-dialog title="设置" :visible.sync="dialogVisible1" width="30%">
        <el-form>
          <el-form-item label="平台联系电话">
            <el-input v-model="platformPhone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="设置" :visible.sync="dialogVisible2" width="30%">
        <el-form>
          <el-form-item label="公司编号">
            <el-input v-model="companyNumber" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="授权秘钥">
            <el-input v-model="authorizeKey" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "list",
      data(){
          return{
            dialogVisible1: false,
            dialogVisible2: false,
            platformPhone:'1258012580',
            companyNumber:'1234567890',
            authorizeKey:'123-456-789'
          }
      },
      methods:{
        handleEdit1(){
          this.dialogVisible1 = true
        },
        handleEdit2(){
          this.dialogVisible2 = true
        }
      }
    }
</script>

<style scoped>

</style>
