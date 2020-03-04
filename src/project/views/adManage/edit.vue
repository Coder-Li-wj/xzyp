<template>
  <el-dialog
    title="广告详情"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="55%"
    :before-close="handleClose">

    <div style="font-weight: bold; font-size: 16px; margin-bottom: 20px">基本信息</div>

    <el-form ref="formValidate" label-width="150px" >
      <el-form-item label="广告位">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in adPositionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告标题">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="广告图片">
        <upload
          :max-size="5120"
          :limit="1"
        >
        </upload>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="finishTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="排序数字">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="广告类型">
        <el-radio v-model="radio" label="1">外部链接</el-radio>
        <el-radio v-model="radio" label="2">图文详情</el-radio>
        <el-radio v-model="radio" label="3">商品详情</el-radio>
      </el-form-item>
      <el-form-item label="外部链接" v-if="radio == '1'">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="图文详情" v-if="radio == '2'">
        <Editor :defaultContent="content" @on-change-content="onChangeEditor"/>
      </el-form-item>
      <el-form-item label="商品详情" v-if="radio == '3'">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>选择商品（单选）</span>
          </div>
          <div>
            <!--    搜索-->
            <el-col :span="24">
              <search
                style="width: 95%;margin: 10px auto"
                :search-items="searchItems"
                @on-search="searchBySearchItem"
              ></search>
            </el-col>
            <!--    表格-->
            <el-col :span="24">
              <el-table
                :data="data"
                style="width: 95%;margin:0 auto;"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="商品ID"
                >
                </el-table-column>
                <el-table-column
                  prop="nickname"
                  label="商品名称"
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="商品分类"
                >
                </el-table-column>
              </el-table>
            </el-col>
          </div>
        </el-card>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返回上一页</el-button>
      <el-button type="primary" @click="handleCommit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Search from "@/framework/components/search";
  import Editor from "@/framework/components/editor"
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  export default {
    name: "create",
    mixins:[emitter],
    components:{
      Upload, Editor, Search
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
        adPositionOptions:[
          {
            value: '选项1',
            label: '首页'
          }, {
            value: '选项2',
            label: '分类广告位'
          }, {
            value: '选项3',
            label: '启动项'
          }
        ],
        startTime:'',
        finishTime:'',
        content:'',
        searchItems: [
          {
            name: "商品分类",
            key: "phone",
            type: "string"
          },
          {
            name: "商品名称",
            key: "phone",
            type: "string"
          }
        ]
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
      //图文详情
      onChangeEditor(val) {
        this.content = val.html;
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
      handleSelectionChange(val) {
        this.selectList = val;
      },
    }
  }
</script>

<style scoped>

</style>
