<!-- 班级成绩 -->
<template>
    <div class='ClassScore'>
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
        <div class="charts">
            <div class="row-1">
                <div class="column-1">
                    <AdvantageRadar
                        type="class"
                        :subjects="subjects"
                        :value="averageScore"
                        position="classScore"
                    ></AdvantageRadar>
                </div>
                <div class="column-2">
                    <GpaDistribution type="class" :value="gpaDistribution" @betweenChange="onGpaBetweenChange"></GpaDistribution>
                </div>
                <div class="column-3">
                    <div class="contentCard compare">
                        <span class="cardTitle">年级-班级对比</span>
                        <div class="chartContainer">
                            <div id="compareChart" ref="compareContainer"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-2">
                <div class="contentCard scoreCard">
                    <div class="topLine">
                        <span class="cardTitle">班级成绩（黄底中括号内的成绩为该同学的补考成绩）</span>
                        <el-autocomplete
                            class="searchInput"
                            v-model="scoreSearch"
                            placeholder="搜索学号 or 姓名"
                            :fetch-suggestions="searchStudent"
                            :trigger-on-focus="false"
                            @select="handelSearchSelect"
                            :disabled="studentSearchDisabled"
                        >
                        </el-autocomplete>
                    </div>
                    <el-table
                        :data="scoreData"
                        :default-sort="{ prop: 'studentId', order: 'descending' }"
                        style="width: 100%"
                    >
                        <el-table-column prop="studentId" label="学号" sortable fixed />
                        <el-table-column prop="name" label="姓名" fixed />
                        <el-table-column prop="gpa" label="学期绩点" sortable fixed />
                        <el-table-column
                            v-for="subject in subjects"
                            :key="subject.id"
                            :label="subject.name"
                            sortable
                        >
                            <template #default="scope">
                                <span
                                    :style="{color: getScoreColor(scope, subject.id)}"
                                >{{ getScoreWithId(scope, subject.id) }}</span>
                                <span
                                    v-if="getScoreStateWithId(scope, subject.id) === 'failed'"
                                > ({{ getSecScoreWithId(scope, subject.id) }})</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <StudentScoreDialog
            v-if="scoreDialog.visible"
            :studentScoreVisible="scoreDialog.visible"
            :subjects="subjects"
            :id="selectedStudent.id"
            :term="curFilter.term"
            :classId="curFilter.class"
            :major="curFilter.major"
            :gradeMajorId="curFilter.gradeMajorId"
            :score="selectedStudent.scores"
            :gpa="selectedStudent.gpa"
            @on-close="handelStudentDialogClose"
        ></StudentScoreDialog>
    </div>
</template>

<script>

import FilterBar from '../../../components/FilterBar';
import AdvantageRadar from '../../../components/AdvantageRadar';
import GpaDistribution from '../../../components/GpaDistribution';
import StudentScoreDialog from '../components/StudentScoreDialog'
import { Column } from '@antv/g2plot';
import { Search } from '@element-plus/icons-vue'
import { getClassGradeRate, getClassRadarChart, getClassScorePieChart, getClassScoretList, getClassSubjectList, getGradeMajorClass, getStudentSuggestion } from '@/common/request';
import { averageScoreParse, classGradeRateParse, classScoreListParse, majorGradeClassListParse, resParse, studentSuggestionParse, subjectsParse } from '@/common/methods';
import { parsePieData, StrIsNumber } from '@/common/utils';

const SCORE_COLOR = {
    normal: '#303133',
    failed: '#f56c6c'
}

export default {
    name: 'ClassScore',
    components: {
        FilterBar,
        AdvantageRadar,
        GpaDistribution,
        StudentScoreDialog
    },
    data () {
        return {
            showFilter: false,
            curFilter: {
                gradeMajorId: '',
                term: '',
                class: ''
            },
            gradeMajorClassList: [],
            scoreData: [],
            scoreDialog: {
                visible: false
            },
            scoreSearch: '',
            gpaDistribution: [],
            subjects: [],
            averageScore: [],
            classGradeRate: [],
            stackedColumnPlot: {},
            selectedStudent: {
                id: 1,
                gpa: 0,
                scores: []
            },
            Search
        }
    },
    computed: {
        studentSearchDisabled: function() {
            return (this.curFilter.class === '')
        }
    },
    methods: {
        async filter(data) {
            console.log('class filter', data);
            this.curFilter = data;
            // 科目列表获取
            const subjectListRes = await getClassSubjectList({
                classId: this.curFilter.class,
                term: this.curFilter.term
            })
            const subjectListData = resParse('获取科目列表', subjectListRes);
            this.subjects = subjectsParse(subjectListData);
            console.log('get subjects', this.subjects);
            // 优势雷达数据
            this.updateRadarChart();
            // 饼图数据处理
            this.updatePieChart(1);
            // 年级班级对比数据
            const rateRes = await getClassGradeRate({
                classId: this.curFilter.class,
                term: this.curFilter.term
            })
            const rateData = resParse('获取优秀及格率', rateRes);
            this.classGradeRate = classGradeRateParse(rateData);
            this.updateCompare();
            // 成绩列表
            const scoreListRes = await getClassScoretList({
                classId: this.curFilter.class,
                term: this.curFilter.term
            })
            const scoreListData = resParse('获取班级成绩列表', scoreListRes);
            this.scoreData = classScoreListParse(scoreListData, this.subjects);
            console.log('dealed scoreData', this.scoreData)
        },
        async updateRadarChart() {
            const radarChartRes = await getClassRadarChart({
                classId: this.curFilter.class,
                term: this.curFilter.term
            })
            const chartData = resParse('获取班级平均分', radarChartRes);
            this.averageScore = averageScoreParse(chartData);
            console.log('average data', this.averageScore);
        },
        async updatePieChart(between) {
            const pieChartRes = await getClassScorePieChart({
                extent: between,
                classId: this.curFilter.class,
                term: this.curFilter.term
            })
            const chartData = resParse('获取班级绩点分布', pieChartRes);
            this.gpaDistribution = parsePieData(chartData, between);
        },
        drawCompare() {
            const data = this.classGradeRate;

            this.stackedColumnPlot = new Column('compareChart', {
                data,
                isGroup: true,
                xField: 'xData',
                yField: 'yData',
                seriesField: 'type',
                label: {
                    // 可手动配置 label 数据标签位置
                    position: 'middle', // 'top', 'middle', 'bottom'
                    // 可配置附加的布局方法
                    layout: [
                    // 柱形图数据标签位置自动调整
                    { type: 'interval-adjust-position' },
                    // 数据标签防遮挡
                    { type: 'interval-hide-overlap' },
                    // 数据标签文颜色自动调整
                    { type: 'adjust-color' },
                    ],
                },
            });

            this.stackedColumnPlot.render();
        },
        updateCompare() {
            this.stackedColumnPlot.update({
                data: this.classGradeRate
            })
        },
        getScoreWithId(scope, id) {
            return scope.row.scores[`${id}`].score;
        },
        getSecScoreWithId(scope, id) {
            return scope.row.scores[`${id}`].secScore;
        },
        getScoreStateWithId(scope, id) {
            return scope.row.scores[`${id}`].state;
        },
        getScoreColor(scope, id) {
            if(scope.row.scores[`${id}`].state == 'failed') {
                return SCORE_COLOR['failed'];
            } else {
                return SCORE_COLOR['normal'];
            }
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
        handelSearchSelect(value) {
            this.selectedStudent.id = value.id;
            const selectData = Array.from(this.scoreData.values()).find(t => {
                return t.studentId === value.id
            });
            console.log('selectedStudent', selectData)
            this.selectedStudent.scores = selectData.scores;
            this.selectedStudent.gpa = selectData.gpa;
            this.scoreDialog.visible = true;
        },
        handelStudentDialogClose() {
            this.scoreDialog.visible = false;
            this.selectedStudent = {};
            this.filter(this.curFilter);
        },
        onGpaBetweenChange(between) {
            this.updatePieChart(between);
        }
    },
    async mounted() {
        // 筛选数据处理
        const gradeMajorClassRes = await getGradeMajorClass({});
        console.log('await getGradeMajorClass', gradeMajorClassRes);
        const gradeMajorClassData = resParse('获取专业班级列表', gradeMajorClassRes);
        this.gradeMajorClassList = majorGradeClassListParse(gradeMajorClassData);
        console.log('get gradeMajorClassList', this.gradeMajorClassList);
        this.showFilter = true;
        this.drawCompare();
    }
}
</script>
<style lang='scss' scoped>
.ClassScore {
    width: 100%;
}

.charts {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;

    .row-1 {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 376px;

        .column-1,
        .column-2,
        .column-3 {
            display: flex;
            width: 33%;
            padding: 8px;
            box-sizing: border-box;
        }

        .compare {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 360px;

            .chartContainer {
                width: 100%;
                height: 100%;
                margin-top: 16px;
                margin-left: 8px;
                
                #compareChart {
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .row-2 {
        display: flex;
        width: 100%;
        margin-bottom: 24px;
        padding: 8px;
        box-sizing: border-box;

        .scoreCard {
            width: 100%;

            .topLine {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .searchInput {
                    width: 240px;
                }
            }
        }
    }
}
</style>