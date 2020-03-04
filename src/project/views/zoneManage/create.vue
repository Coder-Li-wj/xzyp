<template>
  <el-dialog
    title="专区管理"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="40%"
    :before-close="handleClose">

    <el-form ref="formValidate"label-width="150px">

      <el-form-item label="专区名称" prop="username" >
        <el-input v-model="zoneName"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="专区副标题" prop="username" >
        <el-input v-model="zoneSubtitle"  placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="专区主图" prop="username" >
        <upload
          :max-size="5120"
          :limit="1"
        >
        </upload>
      </el-form-item>
      <el-form-item label="专区轮播" prop="username" >
        <!--<upload
          :max-size="5120"
          :limit="2"
        >
        </upload>-->
        <div class="block">
          <!--          <span class="demonstration" style="padding: 0 200px"></span>-->
          <el-carousel height="360px" style="width: 50%;">
            <el-carousel-item v-for="item in swiperImage" :key="item">
              <el-image
                style="background-size: 100%"
                :src=item
                @click="imgVisible = true">
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/framework/components/upload";
  import emitter from '@/framework/mixins/emitter'
  import { save } from '@/project/service/manager'
  export default {
    name: "dialog",
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
      return{
        zoneName:'',
        zoneSubtitle:'',
        swiperImage:["https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572941094.42616676.jpg","https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1572941094.42616676.jpg"]

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
      }
    }
  }
</script>

<style scoped>

</style>
