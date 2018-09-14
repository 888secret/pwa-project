<template>
    <div>
        <head-top></head-top>
        <section>
            <header class="section_title">数据库表列表</header>
            <div class="search-content">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-input placeholder="请输入表名称" v-model="name" class="input-with-select">
                            <el-button slot="append" icon="search" @click="search"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" @click="getTableSelection">生成代码</el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" @click="testConnect">连接数据库</el-button>
                    </el-col>
                    
                </el-row>
            </div>
            <div class="table-container">
                <el-table
                  :data="tableData"
                  border
                  @selection-change="handleSelectionChange"
                  height="400"
                  style="width:100%">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="tableName"
                    label="表名"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="tableComments"
                    label="表注释">
                  </el-table-column>
                </el-table>
            </div>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[10,20,40]"
                  :page-size="pageSize"
                  :current-page="pageNum"
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </div>
            
            <el-dialog
              title="代码自动生成"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              
              <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="表名称">
                      <el-input v-model="form.tableName" placeholder="多个表之间用‘，’分隔" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="表前缀">
                      <el-input v-model="form.tablePrefix" placeholder="多个表前缀间用‘，’分隔，生成的类不包括表前缀"></el-input>
                  </el-form-item>
                  <el-form-item label="输出路径">
                      <el-input v-model="form.outputDir"></el-input>
                  </el-form-item>
                  <el-form-item label="模块名称">
                      <el-input v-model="form.moduleName"></el-input>
                  </el-form-item>
                  
              </el-form>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible=false">取消</el-button>
                  <el-button type="primary" @click="createCode">确定</el-button>
              </span>
            </el-dialog>

            <el-dialog
              title="数据库连接测试"
              :visible.sync="dialogVisible2"
              size="mini">
              <el-form ref="form" :model="dbtest" label-width="120px">
                  <el-form-item label="数据库类型">
                      <el-select v-model="dbtest.dbtype" clearable placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="URL">
                      <el-input v-model="dbtest.url"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名">
                      <el-input v-model="dbtest.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                      <el-input v-model="dbtest.password"></el-input>
                  </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                  <el-button >测试连接</el-button>
                  <el-button type="primary">确定</el-button>
              </span>
            </el-dialog>
        </section>
    </div>
</template>

<script>
import headTop from '../../components/HeadTop'
import {genCode,getTableCount,getTableList} from '@/api/getData'
export default {
    data(){
        return {
            total: 0,
            tableData: [],
            pageSize:10,
            pageNum: 1,
            name: '',
            dialogVisible:false,
            dialogVisible2:false,
            form:{
                tableName:null,
                tablePrefix:null,
                outputDir:null,
                moduleName:null
            },
            multipleSelection:[],
            options:[{
                value:'oracle',
                label:'oracle'
            },{
                value:'mysql',
                label:'mysql'
            },{
                value:'sqlserver',
                label:'sqlserver'
            }],
            dbtest:{
                dbtype:'',
                url:'',
                username:'',
                password:''

            }

        }
    },
    components:{
        headTop,
    },
    methods:{
        async getOrders(){
            
            const res=await getTableList({pageNum:this.pageNum,pageSize:this.pageSize,name:this.name});
            if(res.code==0){
                this.tableData=res.data.list;
                this.total=res.data.total;
            }else{
                this.$message.error('获取数据失败！');
            }
        },
        handleSizeChange(pageSize){
            this.pageSize=pageSize;
            this.getOrders();
        },
        handleCurrentChange(pageNum){
            
            this.pageNum=pageNum;
            this.getOrders();
        },
        indexMethod(index){
            return index;
        },
        search(){
           this.getOrders();
        },
        handleClose(done){
            this.$confirm('确认关闭？')
              .then(_ => {
                  done();
              })
              .catch(_ => {});
        },
        getTableSelection(){
            this.dialogVisible=true;
        },
        testConnect(){
            this.dialogVisible2=true;
        },
        handleSelectionChange(val){
            this.multipleSelection=val;
            var arr=[];
            this.multipleSelection.forEach(row => {
                arr.push(row.tableName);
            });
            this.form.tableName=arr.join(',');
        },
        async createCode(){
            try{
                await genCode(this.form);
                this.$message('生成代码成功！');
                
            }catch(e){
                this.$message.error('获取数据失败！');
            }
           
            this.dialogVisible=false;
        }
    },
    created(){
        this.pageNum=1;
        this.getOrders();
    }
}
</script>
<style lang="less">
@import '../style/mixin';
.table-container{
    padding:20px;
}
.search-content{
    padding:20px;
}
.section_title{
   text-align: center;
}
</style>
