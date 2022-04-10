<!-- 年级成绩对比 -->
<template>
    <div class='GradeCompare'>
        <div class="filter">
            <FilterBar
                v-if="showFilter"
                @on-filter="filter"
                :subjectFilter="true"
                :sourceList="majorList"
            ></FilterBar>
        </div>
        <div class="compareContent">
            <div class="row-1">
                <div class="column-1">
                    <div class="contentCard tableCard">
                        <div class="topLine">
                            <span class="cardTitle">科目成绩分析对比-年级对比</span>
                            <div class="ops">
                                <el-button class="ruleSet" type="text">优秀率规则</el-button>
                                <el-button class="ruleSet" type="text">及格分数线</el-button>
                            </div>
                        </div>
                        <div class="gradeScoreTable">
                            <el-table
                                :data="gradeCompareTable"
                                :default-sort="{ prop: 'title', order: 'descending' }"
                                height="296px"
                                style="width: 100%"
                                empty-text="-"
                            >
                                <el-table-column prop="title" label="年级" sortable fixed />
                                <el-table-column prop="size" label="总人数" sortable />
                                <el-table-column
                                    prop="gpaExcellent"
                                    label="绩点优秀率"
                                    width="120"
                                    sortable
                                >
                                    <template #default="scope">
                                        <span>{{ scope.row.gpaExcellent }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="average" label="平均分" sortable />
                                <el-table-column prop="failed" label="挂科人数" width="108" sortable />
                                <el-table-column
                                    prop="subjectExcellent"
                                    label="科目优秀率"
                                    width="120"
                                    sortable
                                >
                                    <template #default="scope">
                                        <span>{{ scope.row.subjectExcellent }}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="passed" label="及格率" width="108" sortable>
                                    <template #default="scope">
                                        <span>{{ scope.row.passed }}%</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="column-2">
                    <div class="contentCard scoreLineCard">
                        <span class="cardTitle">科目成绩分析对比-年级对比</span>
                        <div class="ScoreLine">
                            <div id="compareLineContainer" ref="compareLineContainer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import FilterBar from '../../../components/FilterBar';
import { Line } from '@antv/g2plot';
import { getAdminMajor, getGradeScore } from '@/common/request';
import { gradeScoreCompareParse, gradeScoreListParse, majorListParse, resParse } from '@/common/methods';

export default {
    name: 'GradeCompare',
    components: {
        FilterBar
    },
    data () {
        return {
            showFilter: false,
            majorList: [],
            curFilter: {},
            gradeCompareTable: [],
            gradeCompareData: []
        }
    },
    methods: {
        async filter(data) {
            console.log('grade compare filter', data);
            this.curFilter = data;
            const gradeScoreRes = await getGradeScore({
                majorId: this.curFilter.majorId,
                courseId: this.curFilter.course
            });
            const gradeScoreData = resParse('获取年级成绩列表', gradeScoreRes);
            this.gradeCompareTable = gradeScoreListParse(gradeScoreData);
            this.gradeCompareData = gradeScoreCompareParse(gradeScoreData);
            this.drawCompareLine();
        },
        drawCompareLine() {
            const line = new Line('compareLineContainer', {
                data: this.gradeCompareData,
                xField: 'year',
                yField: 'value',
                seriesField: 'type',
                point: {
                    size: 3,
                    shape: 'diamond',
                    style: {
                        fill: 'white',
                        stroke: '#000',
                        lineWidth: 2,
                    },
                },
            });

            line.render();
        }
    },
    async mounted() {
        const majorListRes = await getAdminMajor({
            'admin-account': localStorage.getItem('account')
        })
        const majorListData = resParse('获取专业列表', majorListRes);
        this.majorList = majorListParse(majorListData);
        this.showFilter = true;
    }
}
</script>
<style lang='scss' scoped>
.GradeCompare {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.compareContent {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;

    .row-1 {
        display: flex;
        width: 100%;

        .column-1 {
            width: 65%;
            padding: 16px;
            box-sizing: border-box;

            .tableCard {
                height: 360px;

                .topLine {
                    display: flex;
                    justify-content: space-between;

                    .ruleSet {
                        margin-left: 8px;
                    }
                }

                .gradeScoreTable {
                    margin-top: 16px;
                }
            }
        }

        .column-2 {
            width: 35%;
            padding: 16px;
            box-sizing: border-box;

            .scoreLineCard {
                height: 360px;
            }

            .ScoreLine {
                display: flex;
                width: 100%;
                height: 100%;
                padding: 16px;
                box-sizing: border-box;

                #compareLineContainer {
                    display: flex;
                    justify-content: flex-start;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>