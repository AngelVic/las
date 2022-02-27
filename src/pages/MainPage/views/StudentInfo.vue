<!-- 学生信息 -->
<template>
    <div class='StudentInfo'>
        <div class="filter">
            <FilterBar
                @on-filter="filter"
                :gradeFilter="true"
                :termFilter="true"
                :classFilter="true"
            ></FilterBar>
        </div>
        <div class="mainContent">
            <div class="contentCard">
                <div class="topLine">
                    <span class="cardTitle">学生信息</span>
                    <div class="search"></div>
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
                                <span>{{ scope.row.major }}{{ scope.row.class }}班</span>
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
                            <template #default>
                                <el-button type="text" @click="editStudent">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import FilterBar from '../../../components/FilterBar.vue'

export default {
    name: 'StudentInfo',
    components: {
        FilterBar
    },
    data () {
        return {
            curFilter: {},
            studentTable: [
                {
                    studentId: '000000000',
                    name: '你的名字',
                    grade: '2018',
                    major: '计算机',
                    class: '1',
                    HMT: true,
                    dormitory: '11',
                    room: '111'
                },
                {
                    studentId: '000000000',
                    name: '你的名字',
                    grade: '2018',
                    major: '计算机',
                    class: '1',
                    HMT: false,
                    dormitory: '11',
                    room: '111'
                }
            ],
        }
    },
    methods: {
        filter(data) {
            console.log('file filter', data);
            this.curFilter = data;
        },
        editStudent() {}
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

    .infoTable {
        margin-top: 16px;
    }
}
</style>