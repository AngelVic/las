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
                                <el-button :icon="Search" @click="searchAdmin"></el-button>
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
                            <template #default="scope">
                                <el-button type="text" @click="editAdmin(scope.row.account)">编辑</el-button>
                                <el-button type="text" @click="deleteAdmin(scope.row.account)">删除</el-button>
                                <el-button type="text" @click="resetAdmin(scope.row.account)">重置密码</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <AdminInfoDialog
            v-if="adminDialog.visible"
            :adminInfoVisible="adminDialog.visible"
            :value="adminDialog.data"
            :gradeMajorList="gradeMajorList"
            @on-close="() => {this.adminDialog.visible = false}"
            @on-success="handelChangeSuccess"
        ></AdminInfoDialog>
        <AdminCreateDialog
            v-if="createDialog.visible"
            :adminCreateVisible="createDialog.visible"
            :gradeMajorList="gradeMajorList"
            @on-close="() => {this.createDialog.visible = false}"
            @on-success="handelCreateSuccess"
        ></AdminCreateDialog>
        <AdminInfoSuccessDialog
            v-if="successDialog.visible"
            :adminInfoVisible="successDialog.visible"
            :value="successDialog.data"
            :gradeMajorList="gradeMajorList"
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
import { deleteAccount, getAdminGradeMajor, searchCounselor, resetAccount, getAccountDetail } from '@/common/request';
import { accountDetailParse, adminListParse, resParse } from '@/common/methods';

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
            adminTable: [],
            adminDialog: {
                visible: false,
                data: {}
            },
            createDialog: {
                visible: false
            },
            successDialog:{
                visible: false,
                data: {}
            },
            adminSearch: '',
            Search
        }
    },
    methods: {
        async filter(data) {
            console.log('adminInfo filter', data);
            this.curFilter = data;
            // 获取负责人列表
            const adminListRes = await searchCounselor({
                gradeId: this.curFilter.gradeMajorId
            });
            const adminListData = resParse('获取负责人列表', adminListRes);
            this.adminTable = adminListParse(adminListData, this.curFilter.grade, this.curFilter.major);
            console.log('admin list parsed', this.adminTable);
        },
        async editAdmin(id) {
            console.log('edit', id);
            const accountDetailRes = await getAccountDetail({
                account: id
            });
            const accountDetaiData = resParse('获取辅导员详情', accountDetailRes);
            this.adminDialog.data = accountDetailParse(accountDetaiData);
            this.adminDialog.visible = true;
        },
        createAdmin() {
            this.createDialog.visible = true;
        },
        deleteAdmin(id) {
            ElMessageBox.confirm(
                '是否删除负责人，删除后该账号将无法登录，且该账号负责的年级为无负责人状态？',
                '删除负责人',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'info',
                }
            )
            .then(async () => {
                console.log('reset', id);
                const deleteRes = await deleteAccount({
                    account: id
                });
                resParse('辅导员账号删除', deleteRes);
                if(deleteRes.code === 200){
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    })
                    this.filter(this.curFilter);
                }
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消',
                })
            })
        },
        resetAdmin(id) {
            ElMessageBox.confirm(
                '是否重置密码，重置后该账号的密码将被重置为“12345678”，需用新密码才可登录账号？',
                '重置密码',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'info',
                }
            )
            .then(async () => {
                console.log('reset', id);
                const resetRes = await resetAccount({
                    account: id
                });
                resParse('辅导员密码重置', resetRes);
                if(resetRes.code === 200){
                    ElMessage({
                        type: 'success',
                        message: '重置成功',
                    });
                    this.filter(this.curFilter);
                }
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消',
                })
            })
        },
        async handelCreateSuccess(account) {
            console.log('create account success', account);
            const accountDetailRes = await getAccountDetail({
                account: account.account
            });
            const accountDetaiData = resParse('获取辅导员详情', accountDetailRes);
            this.successDialog.data = accountDetailParse(accountDetaiData);
            this.createDialog.visible = false;
            this.successDialog.visible = true;
            this.filter(this.curFilter);
        },
        async handelChangeSuccess() {
            this.adminDialog.visible = false;
            this.filter(this.curFilter);
        },
        async searchAdmin() {
            const adminListRes = await searchCounselor({
                gradeId: this.curFilter.gradeMajorId,
                key: this.adminSearch
            });
            const adminListData = resParse('获取负责人列表', adminListRes);
            this.adminTable = adminListParse(adminListData, this.curFilter.grade, this.curFilter.major);
        }
    },
    async mounted() {
        // 筛选数据处理
        const gradeMajorRes = await getAdminGradeMajor({});
        this.gradeMajorList = resParse('获取专业列表', gradeMajorRes);
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