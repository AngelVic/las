<!-- 学生信息 -->
<template>
    <div class='StudentInfo' v-loading="pageLoading">
        <div class="filter">
            <FilterBar
                v-if="showFilter"
                @on-filter="filter"
                :gradeFilter="true"
                :termFilter="true"
                :classFilter="true"
                :sourceList="gradeMajorClassList"
            ></FilterBar>
        </div>
        <div class="mainContent">
            <div class="contentCard" v-loading="tableLoading">
                <div class="topLine">
                    <span class="cardTitle">学生信息</span>
                    <div class="search">
                        <el-autocomplete
                            class="searchInput"
                            v-model="studentSearch"
                            :fetch-suggestions="searchStudent"
                            placeholder="搜索学号 or 姓名"
                            @select="handelSearchSelect"
                            :disabled="studentSearchDisabled"
                            @clear="getStudentTable"
                            clearable
                        />
                    </div>
                </div>
                <div class="infoTable">
                    <el-table :data="studentTable" style="width: 100%">
                        <el-table-column type="index" />
                        <el-table-column prop="studentId" label="学号" />
                        <el-table-column prop="name" label="姓名" />
                        <el-table-column label="年级">
                            <template #default="scope">
                                <span>{{ scope.row.grade }}级</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="major" label="专业" />
                        <el-table-column prop="class" label="班级">
                            <template #default="scope">
                                <span>{{ scope.row.major }}{{ scope.row.className }}班</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="港澳台等特殊类型学生">
                            <template #default="scope">
                                <span v-if="scope.row.HMT">是</span>
                                <span v-else>否</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="dormitory" label="宿舍楼" />
                        <el-table-column prop="room" label="宿舍号" />
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-button type="text" @click="editStudent(scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <StudentInfoDialog
            v-if="infoDialog.visible"
            :studentInfoVisible="infoDialog.visible"
            :value="editingStudent"
            :gradeMajorClassList="gradeMajorClassList"
            @on-close="handelStudentInfoDialogClose"
        ></StudentInfoDialog>
    </div>
</template>

<script>

import FilterBar from '../../../components/FilterBar.vue';
import StudentInfoDialog from '../components/StudentInfoDialog';
import { getGradeMajorClass, getStudentSuggestion, getStudentInfoList } from '@/common/request';
import { majorGradeClassListParse, resParse, studentListParse, studentSuggestionParse } from '@/common/methods';
import { StrIsNumber } from '@/common/utils';
import { ElMessage } from 'element-plus';

export default {
    name: 'StudentInfo',
    components: {
        FilterBar,
        StudentInfoDialog
    },
    data () {
        return {
            showFilter: false,
            gradeMajorClassList: [],
            curFilter: {},
            studentTable: [],
            infoDialog: {
                visible: false
            },
            editingStudent: {},
            studentSearch: '',
            pageLoading: false,
            tableLoading: false,
        }
    },
    computed: {
        studentSearchDisabled: function() {
            return (this.curFilter.class === '')
        }
    },
    methods: {
        async filter(data) {
            this.tableLoading = true;
            console.log('file filter', data);
            this.curFilter = data;
            this.getStudentTable();
        },
        async getStudentTable() {
            const studentListRes = await getStudentInfoList({
                classId: this.curFilter.class,
            })
            const studentList = resParse('获取班级学生列表', studentListRes);
            this.studentTable = studentListParse(studentList, this.curFilter.grade, this.curFilter.major, this.curFilter.className, this.curFilter.class);
            this.tableLoading = false;
        },
        editStudent(data) {
            console.log('editing student', data);
            this.editingStudent = data;
            this.infoDialog.visible = true;
        },
        handelStudentInfoDialogClose() {
            this.infoDialog.visible = false;
            this.editingStudent = {};
            this.filter(this.curFilter);
        },
        async searchStudent(queryString, callback) {
            console.log('search student', queryString, callback);
            if(StrIsNumber(queryString) && queryString.length < 7) {
                return;
            }
            const suggestionRes = await getStudentSuggestion({
                key: queryString,
                classId: this.curFilter.class
            });
            const suggestionData = resParse('获取搜索建议', suggestionRes);
            callback(studentSuggestionParse(suggestionData));
        },
        async handelSearchSelect(value) {
            const studentListRes = await getStudentInfoList({
                classId: this.curFilter.class,
            })
            const studentList = resParse('获取班级学生列表', studentListRes);
            const parsedStudentTable = studentListParse(studentList, this.curFilter.grade, this.curFilter.major, this.curFilter.className, this.curFilter.class);
            console.log('student select', value, parsedStudentTable);
            const studentListItem = parsedStudentTable.find((cur) => {
                return cur.studentId === value.id;
            });
            if(studentListItem !== undefined) {
                this.studentTable = [studentListItem]
            }
            else {
                ElMessage.warning('该学生不存在当前班级');
            }
        },
    },
    async mounted() {
        this.pageLoading = true;
        // 筛选数据处理
        const gradeMajorClassRes = await getGradeMajorClass({});
        const gradeMajorClassData = resParse('获取专业班级列表', gradeMajorClassRes);
        this.gradeMajorClassList = majorGradeClassListParse(gradeMajorClassData);
        console.log('get gradeMajorClassList', this.gradeMajorClassList);
        this.showFilter = true;
        this.pageLoading = false;
    }
}
</script>
<style lang='scss' scoped>
.StudentInfo {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.mainContent {
    padding: 32px 32px;
    box-sizing: border-box;

    .topLine {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .infoTable {
        margin-top: 16px;
    }
}
</style>