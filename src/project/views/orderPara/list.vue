<template>
    <div>
      <el-card>
        <div slot="header">
          <span style="font-weight: bold">运费参数</span>
          <el-button type="text" icon="el-icon-edit" @click="handleEdit"></el-button>
        </div>
        <div>
          <el-form ref="form" label-width="100px">
            <el-form-item label="运费金额">
              {{ freightMoney }}
            </el-form-item>
            <el-form-item label="免运费金额">
              {{ freeFreightMoney }}
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <el-dialog title="收货地址" :visible.sync="dialogVisible">
        <el-form>
          <el-form-item label="活动名称">
            <el-input v-model="freightMoney" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input v-model="freeFreightMoney" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "list",
      data(){
          return{
            dialogVisible: false,
            freightMoney:'10.00',
            freeFreightMoney:'80.00'
          }
      },
      methods:{
        handleEdit(){
          this.dialogVisible = true
        }
      }
    }
</script>

<style scoped>

</style>
