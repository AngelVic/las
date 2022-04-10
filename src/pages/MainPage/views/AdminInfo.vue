<!-- 管理员信息 -->
<template>
    <div class='AdminInfo'>
        <div class="filter">
            <FilterBar
                v-if="showFilter"
                :sourceList="gradeMajorList"
                @on-filter="filter"
                :gradeFilter="true"
            ></FilterBar>
        </div>
        <div class="tableContent">
            <div class="contentCard">
                <div class="topLine">
                    <div class="left">
                        <span class="cardTitle">负责人信息</span>
                    </div>
                    <div class="right">
                        <el-input
                            v-model="adminSearch"
                            placeholder=" 搜索姓名 or 账号"
                            class="adminSearch"
                        >
                            <template #append>
                                <el-button :icon="Search"></el-button>
                            </template>
                        </el-input>
                        <el-button class="addBtn" type="primary" @click="createAdmin">添加负责人</el-button>
                    </div>
                </div>
                <div class="admintable">
                    <el-table :data="adminTable" style="width: 100%">
                        <el-table-column type="index" />
                        <el-table-column label="年级" sortable>
                            <template #default="scope">
                                <span>{{ scope.row.grade }}级</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="major" label="专业" sortable />
                        <el-table-column prop="principal" label="负责人" sortable />
                        <el-table-column prop="account" label="账号" sortable />
                        <el-table-column prop="time" label="账号生成时间" sortable />
                        <el-table-column label="操作">
                            <template #default>
                                <el-button type="text" @click="editAdmin">编辑</el-button>
                                <el-button type="text" @click="deleteAdmin">删除</el-button>
                                <el-button type="text" @click="resetAdmin">重置密码</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <AdminInfoDialog
            :adminInfoVisible="adminDialog.visible"
            @on-close="() => {this.adminDialog.visible = false}"
        ></AdminInfoDialog>
        <AdminCreateDialog
            :adminCreateVisible="createDialog.visible"
            @on-close="() => {this.createDialog.visible = false}"
            @on-success="() => {
                this.createDialog.visible = false;
                this.successDialog.visible = true;
            }"
        ></AdminCreateDialog>
        <AdminInfoSuccessDialog
            :adminInfoVisible="successDialog.visible"
            @on-close="() => {this.successDialog.visible = false}"
        ></AdminInfoSuccessDialog>
    </div>
</template>

<script>

import FilterBar from '../../../components/FilterBar';
import { Search } from '@element-plus/icons-vue';
import AdminInfoDialog from '../components/AdminInfoDialog';
import AdminCreateDialog from '../components/AdminCreateDialog';
import AdminInfoSuccessDialog from '../components/AdminInfoSuccessDialog';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getGradeMajor } from '@/common/request';
import { resParse } from '@/common/methods';

export default {
    name: 'AdminInfo',
    components: {
        FilterBar,
        AdminInfoDialog,
        AdminCreateDialog,
        AdminInfoSuccessDialog,
    },
    data () {
        return {
            showFilter: false,
            gradeMajorList: [],
            curFilter: {},
            adminTable: [
                {
                    grade: '2000',
                    major: '计算机',
                    principal: '你的名字',
                    account: '1111111111111',
                    time: '2000-02-02 11:11',
                }
            ],
            adminDialog: {
                visible: false
            },
            createDialog: {
                visible: false
            },
            successDialog:{
                visible:false
            },
            Search
        }
    },
    methods: {
        async filter(data) {
            console.log('adminInfo filter', data);
            this.curFilter = data;
            // 获取负责人列表
            // const adminListRes = await searchCounselor({

            // })
        },
        editAdmin() {
            this.adminDialog.visible = true;
        },
        createAdmin() {
            this.createDialog.visible = true;
        },
        deleteAdmin() {
            ElMessageBox.confirm(
                '是否删除负责人，删除后该账号将无法登录，且该账号负责的年级为无负责人状态？',
                '删除负责人',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'info',
                }
            )
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '删除失败',
                })
            })
        },
        resetAdmin() {
            ElMessageBox.confirm(
                '是否重置密码，重置后该账号的密码将被重置为“12345678”，需用新密码才可登录账号？',
                '重置密码',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'info',
                }
            )
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '重置成功',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '重置失败',
                })
            })
        }
    },
    async mounted() {
        // 筛选数据处理
        const gradeMajorRes = await getGradeMajor({});
        this.gradeMajorList = resParse('获取专业列表', gradeMajorRes);
        console.log('get gradeMajorList', this.gradeMajorList);
        this.showFilter = true;
    }
}
</script>
<style lang='scss' scoped>
.AdminInfo {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.tableContent {
    padding: 32px;
    box-sizing: border-box;

    .topLine {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        
        .right {
            display: flex;

            .addBtn {
                margin-left: 16px;
            }
        }
    }

    .admintable {
        margin-top: 16px;
    }
}
</style>