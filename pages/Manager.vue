<template>
    <div class="manage_page fillcontain">
        <el-row style="height:100%;">
            <el-col :span="4" style="min-height:100%;background-color:#324057;">
                <el-menu :default-active="defaultActive" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-document"></i>MybatisPLUS</template>
                        <el-menu-item index="/manager/test-map">代码自动生成</el-menu-item>
                    </el-submenu>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-document"></i>地图</template>
                        <el-menu-item index="">我的地图</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height:100%;overflow:auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    computed:{
        defaultActive:function(){
            
            return this.$route.path;
        }
    }
}
</script>

