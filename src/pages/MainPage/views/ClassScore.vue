<!-- 班级成绩 -->
<template>
    <div class='ClassScore'>
        <div class="filter">
            <FilterBar
                @on-filter="filter"
                :gradeFilter="true"
                :termFilter="true"
                :classFilter="true"
            ></FilterBar>
        </div>
        <div class="charts">
            <div class="row-1">
                <div class="column-1">
                    <AdvantageRadar
                        type="class"
                        :major="curFilter.major"
                        :grade="curFilter.grade"
                        :term="curFilter.term"
                        :class="curFilter.class"
                        position="classScore"
                    ></AdvantageRadar>
                </div>
                <div class="column-2">
                    <GpaDistribution type="class"></GpaDistribution>
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
                        <el-input
                            class="searchInput"
                            v-model="scoreSearch"
                            placeholder="搜索学号 or 姓名"
                        >
                            <template #append>
                                <el-button :icon="Search" @click="searchStudent"></el-button>
                            </template>
                        </el-input>
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
                            v-for="subject in subjectList"
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
            :studentScoreVisible="scoreDialog.visible"
            @on-close="() => {this.scoreDialog.visible = false}"
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
            curFilter: {
                major: '',
                grade: '',
                term: '',
                class: ''
            },
            scoreData: [
                {
                    id: 0,
                    studentId: '100000000',
                    name: '姓名1',
                    gpa: 2.5,
                    scores: {
                        sub1: {
                            id: 1,
                            name: '高等数学',
                            state: 'normal',
                            score: 76
                        },
                        sub2: {
                            id: 2,
                            name: '概率论',
                            state: 'failed',
                            score: 52,
                            secScore: 62
                        },
                        sub3: {
                            id: 3,
                            name: '软件工程',
                            state: 'normal',
                            score: 88
                        }
                    }
                }
            ],
            subjectList: [
                {
                    id: 1,
                    name: '高等数学'
                },
                {
                    id: 3,
                    name: '软件工程'
                },
                {
                    id: 2,
                    name: '概率论'
                }
            ],
            scoreDialog: {
                visible: false
            },
            scoreSearch: '',
            Search
        }
    },
    methods: {
        filter(data) {
            console.log('class filter', data);
            this.curFilter = data;
        },
        drawCompare() {
            const data = [
                {
                    type: '班级',
                    xData: '优秀率',
                    yData: 11,
                },
                {
                    type: '班级',
                    xData: '及格率',
                    yData: 92,
                },
                {
                    type: '年级',
                    xData: '优秀率',
                    yData: 13,
                },
                {
                    type: '年级',
                    xData: '及格率',
                    yData: 98,
                },
            ];

            const stackedColumnPlot = new Column('compareChart', {
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

            stackedColumnPlot.render();
        },
        getScoreWithId(scope, id) {
            return scope.row.scores[`sub${id}`].score;
        },
        getSecScoreWithId(scope, id) {
            return scope.row.scores[`sub${id}`].secScore;
        },
        getScoreStateWithId(scope, id) {
            return scope.row.scores[`sub${id}`].state;
        },
        getScoreColor(scope, id) {
            if(scope.row.scores[`sub${id}`].state == 'failed') {
                return SCORE_COLOR['failed'];
            } else {
                return SCORE_COLOR['normal'];
            }
        },
        searchStudent() {
            console.log('search student', this.scoreSearch);
            this.scoreDialog.visible = true;
        }
    },
    mounted() {
        // this.$ref.compareContainer.innerHTML = null;
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