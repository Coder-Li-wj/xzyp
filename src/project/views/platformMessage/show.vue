<template>
    <div >
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>消息详情</span>
          </div>
          <div style="font-weight: bold; padding: 20px">基本信息</div>
          <div class="text item">
            <span class="text_label">推送方式</span>
            {{manager.username}}
          </div>
          <div class="text item">
            <span class="text_label">推送对象</span>
            {{manager.phone}}
            <!--    指定对象表格-->
            <el-col :span="24">
              <el-table
                :data="data"
                style="width: 50%;margin:0 auto;"
              >
                <el-table-column
                  prop="id"
                  type="index"
                  width="150"
                  label="序号"
                >
                </el-table-column>
                <el-table-column
                  prop="createAt"
                  label="User ID"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="手机号"
                >
                </el-table-column>
                <el-table-column
                  prop="nickname"
                  label="昵称"
                >
                </el-table-column>
              </el-table>
            </el-col>
          </div>
          <div class="text item">
            <span class="text_label">推送时间</span>
            {{manager.realname}}
          </div>
          <div class="text item">
            <span class="text_label">消息标题</span>
            {{manager.status}}
          </div>
          <div class="text item">
            <span class="text_label">图文内容</span>
            <Editor :defaultContent="detailContent" @on-change-content="onChangeDetailEditor"/>
          </div>
        </el-card>
      </el-col>
      <!--返回上一页按钮-->
      <el-button  style="margin: 20px 0 0 30px" v-on:click="backButton">返回上一页</el-button>
    </div>
</template>

<script>
  import Editor from "@/framework/components/editor"
  import {get, enable, disable} from '@/project/service/manager'
  import {search, count} from '@/project/service/role'
  import previewImg from '@/framework/components/previewImg/previewImg.vue'

  export default {
    name: "show",
    components: {
      Editor
    },
    data() {

      return {
        manager: {},

      }
    },
    created() {
      this.get();
      this.roleSearch();
    },
    methods: {
      /*详情页面返回上一页按钮*/
      backButton() {
        this.$router.back(-1)
      },
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
</style>
