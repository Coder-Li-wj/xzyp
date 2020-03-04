<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="formValidate" label-width="150px">

      <el-form-item label="所属推荐" prop="username" >
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        {{  }}
      </el-form-item>
      <el-form-item>
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
            style="width: 50%;margin:0 auto;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="username"
              label="商品名称"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-form-item>
      <el-form-item label="首页封面图">
        <upload
          :max-size="5120"
          :limit="1"
        >
        </upload>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="sort" placeholder="请输入排序"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">返回上一页</el-button>
      <el-button type="primary" @click="handleConfirm">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Search from "@/framework/components/search";
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  export default {
    name: "dialog",
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
      return{
        options: [{
          value: '选项1',
          label: '首页推荐'
        }, {
          value: '选项2',
          label: '新品推荐'
        }],
        sort:'',
        searchItems: [
          {
            name: "商品名称",
            key: "username",
            type: "string"
          }
        ]
      }
    },
    computed:{
    },
    methods:{
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleConfirm(){
        this.broadcast('SiUpload','on-form-submit',() => {});

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
