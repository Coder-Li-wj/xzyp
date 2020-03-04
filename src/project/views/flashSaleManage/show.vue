<template>
    <div >
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>活动信息</span>
          </div>
          <div class="text item">
            <span class="text_label">状态</span>
            {{manager.username}}
          </div>
          <div class="text item">
            <span class="text_label">活动时间段</span>
            {{manager.phone}}
          </div>
          <div class="text item">
            <span class="text_label">活动时间</span>
            {{manager.realname}}
          </div>

          <el-table
            :data="data"
            style="width: 95%"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-image
                  style="width: 50px; height: 50px"
                  :src="scope.row.image"
                  fit="fit"></el-image>
              </template>
            </el-table-column>
            <el-table-column
              prop="goodId"
              label="商品ID"
            >
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
              type="index"
              label="排序"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-button style="margin:50px auto auto 100px" @click="backButton">返回上一页</el-button>
    </div>
</template>

<script>
  import {get, enable, disable} from '@/project/service/manager'
  import {search, count} from '@/project/service/role'
  import previewImg from '@/framework/components/previewImg/previewImg.vue'

  export default {
    name: "show",
    components: {
      previewImg
    },
    data() {
      return {
        data:[],
        manager: {},
      }
    },
    created() {

    },
    methods: {
      // 返回上一页按钮
      backButton(){
        this.$router.back(-1)
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .text_label{
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .clearfix{
    position: relative;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 92%;
    margin: 20px;
    display: inline-block;
  }
  .box-card-large{
    width: 92%;
    display: inline-block;
    margin: 20px;
  }
  .el-button--text{
    color: #3e5265;
  }
  .el-button--mini{
    padding: 4px 12px;
  }
  .table-button{
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
