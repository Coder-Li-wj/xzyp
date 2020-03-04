<template>
  <el-dialog
    title="猜你喜欢设置"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="50%"
    :before-close="handleClose">

    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
    </el-steps>

    <el-form ref="form" label-width="100px" v-if="active == '0'">
      <div style="font-weight: bold;">基本信息</div>
      <el-form-item label="组合名称">
        <el-input placeholder="请输入" v-model="combinationName"></el-input>
      </el-form-item>
      <div>
        <!--按钮-->
        <el-col :span="24">
          <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="addGood">添加商品</el-button>
        </el-col>
        <!--表格-->
        <el-col :span="24">
          <el-table
            :data="data"
            style="width: 100%;margin:0 auto;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="username"
              label="商品ID"
            >
            </el-table-column>
            <el-table-column
              prop="realname"
              label="商品名称"
            >
            </el-table-column>
            <el-table-column
              prop="username"
              label="商品分类"
            >
            </el-table-column>
            <el-table-column
              prop="realname"
              label="现价(元)"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="realname"
              label="销量"
              sortable
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              align="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <!--添加商品弹框-->
        <el-dialog
          title="提示"
          :visible.sync="addGoodProps.dialogVisible"
          :modal-append-to-body='false'
          width="40%"
          :before-close="handleCloseGood">
          <!--搜索-->
          <el-col :span="24">
            <search
              style="width: 95%;margin: 10px auto"
              :search-items="searchItems"
              @on-search="searchBySearchItem"
            ></search>
          </el-col>
          <!--表格-->
          <el-col :span="24">
            <el-table
              :data="data"
              style="width: 100%;margin:0 auto;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="100">
              </el-table-column>
              <el-table-column
                prop="realname"
                label="商品名称"
              >
              </el-table-column>
            </el-table>
          </el-col>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addGoodProps.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGoodProps.dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>

    </el-form>

    <el-form ref="form" label-width="100px" v-if="active == '1'">
      <el-form-item label="选择模块">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in modelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择分类">
        <el-cascader
          v-model="value"
          :options="categoryOptions"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button style="margin-top: 12px;" @click="handleCommit" v-if="active == '1'">提交</el-button>
      <el-button style="margin-top: 12px;" @click="backButton" v-if="active == '1'">返回上一步</el-button>
      <el-button style="margin-top: 12px;" @click="next" v-if="active == '0'">下一步</el-button>
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
    mixins: [emitter],
    components: {
      Upload, Search
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        addGoodProps: {
          dialogVisible: false
        },
        active:'0',
        combinationName: '',
        form: {
          menu: {
            visible: false
          },
        },
        searchItems:[
          {
            name: "商品名称",
            key: "goodTitle",
            type: "string"
          },
        ],
        value:'',
        modelOptions:[
          {
            value: '选项1',
            label: '结算页面'
          }, {
            value: '选项2',
            label: '种草资讯'
          }
        ],
        categoryOptions:[
          {
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
            }
            ]
          },
        ]
      }
    },
    computed: {},
    methods: {
      handleClose() {
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleConfirm() {
        this.broadcast('SiUpload', 'on-form-submit', () => {
        });
        console.log('11111');
        save(this.formValidate, res => {

        })
      },
      handleTransportFileList(fileList) {
        console.log(fileList);
      },
      addGood() {
        this.addGoodProps.dialogVisible = true
      },
      handleCloseGood() {
        this.addGoodProps.dialogVisible = false
      },
      handleSelectionChange(val) {
        this.selectList = val;
      },
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
              _t.search(_t.page);
            })
          } else {
            enable({id: row.id}, res => {
              _t.$message({
                type: 'success',
                message: '已启用!'
              });
              _t.search(_t.page);
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

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
      // 下一步
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      // 反回上一步
      backButton(){
        this.active = '0'
      },
      // 提交
      handleCommit(){
        this.$emit('on-dialog-commit');
        this.active = '0'
      }
    }
  }
</script>

<style scoped>

</style>
