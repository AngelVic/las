<!-- 年级成绩 -->
<template>
    <div class='GradeScore' v-loading="pageLoading">
        <div class="filter">
            <FilterBar
                v-if="showFilter"
                @on-filter="filter"
                :gradeFilter="true"
                :termFilter="true"
                :sourceList="gradeMajorList"
            ></FilterBar>
        </div>
        <div class="charts">
            <div class="row-1">
                <div class="column-1">
                    <div class="stastic" v-for="stastic in stasticList" :key="stastic.type">
                        <StasticCard
                            v-loading="loadingStastic"
                            :label="stastic.label"
                            :data="stastic.data"
                            :rate="stastic.rate"
                            :type="stastic.type"
                            :description="stastic.description"
                            :rule="stastic.rule"
                            @on-set="(tab) => { this.openIndicatorDialog(tab) }"
                        ></StasticCard>
                    </div>
                </div>
                <div class="column-2">
                    <GpaDistribution
                        v-loading="loadingDistribution"
                        type="grade"
                        :value="gpaDistribution"
                        @betweenChange="onGpaBetweenChange"
                    ></GpaDistribution>
                </div>
            </div>
            <div class="row-2">
                <div class="column-1">
                    <div class="contentCard compare">
                        <div class="topLine">
                            <span class="cardTitle">年级-班级科目成绩对比</span>
                            <div class="ops">
                                <el-button
                                    class="ruleSet"
                                    type="text"
                                    @click="openIndicatorDialog('excellent')"
                                >优秀率规则</el-button>
                                <el-button
                                    class="ruleSet"
                                    type="text"
                                    @click="openIndicatorDialog('pass')"
                                >及格分数线</el-button>
                                <el-select
                                    v-model="compareSubject"
                                    placeholder="请选择科目"
                                    size="small"
                                    @change="onCompareSubjectSelect"
                                >
                                    <el-option
                                        v-for="subject in subjects"
                                        :key="subject.id"
                                        :label="subject.name"
                                        :value="subject.id"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="table">
                            <el-table
                                v-loading="loadingTable"
                                :data="compareTable"
                                :default-sort="{ prop: 'title', order: 'descending' }"
                                height="296px"
                                style="width: 100%"
                                empty-text="-"
                            >
                                <el-table-column prop="title" label="班级" sortable fixed />
                                <el-table-column prop="size" label="总人数" />
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
                                <el-table-column prop="average" label="平均分" />
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
                    <AdvantageRadar
                        v-loading="loadingRadar"
                        type="grade"
                        :subjects="subjects"
                        :value="averageScore"
                        position="gradeScore"
                    ></AdvantageRadar>
                </div>
            </div>
        </div>
        <IndicatorSetDialog
            :indicatorSetVisible="indicatorDialog.visible"
            :indicatorSetTab="indicatorDialog.tab"
            @on-close="() => {this.indicatorDialog.visible = false}"
            @on-save="handelIndicatorSave"
        ></IndicatorSetDialog>
    </div>
</template>

<script>

import StasticCard from '../../../components/StasticCard';
import FilterBar from '../../../components/FilterBar';
import AdvantageRadar from '../../../components/AdvantageRadar';
import GpaDistribution from '../../../components/GpaDistribution';
import IndicatorSetDialog from '../components/IndicatorSetDialog';
import { getGradeBasic, getGradeMajor, getGradeScorePieChart, getGradeScoreRadarChart, getGradeSubjectList, getScoreGradeClass } from '@/common/request';
import { averageScoreParse, gradeClassScoreParse, subjectsParse, resParse, basicGradeDataParse } from '@/common/methods';
import { parsePieData } from '@/common/utils';
import { ElMessage } from 'element-plus'

export default {
    name: 'GradeScore',
    components: {
        StasticCard,
        FilterBar,
        AdvantageRadar,
        GpaDistribution,
        IndicatorSetDialog
    },
    data () {
        return {
            showFilter: false,
            curFilter: {
                gradeMajorId: '',
                term: '',
            },
            gradeMajorList: [],
            stasticList: [
                {
                    label: '总人数',
                    data: '-',
                    type: 'totalSize'
                },
                {
                    label: '挂科人数',
                    data: '-',
                    type: 'failSize',
                    rate: '-',
                    description: ''
                },
                {
                    label: '优秀率',
                    data: '-',
                    type: 'excellentRate',
                    rule: '优秀率规则',
                    rate: '-',
                    description: ''
                },
                {
                    label: '及格率 (通过所有科目)',
                    data: '-',
                    type: 'passRate',
                    rule: '及格分数线',
                    rate: '-',
                    description: ''
                },
            ],
            subjects: [],
            compareSubject: null,
            compareTable: [],
            indicatorDialog: {
                visible: false,
                tab: 'excellent'
            },
            gpaDistribution: [],
            averageScore: [],
            loadingStastic: false,
            loadingDistribution: false,
            loadingTable: false,
            loadingRadar: false,
            pageLoading: false,
        }
    },
    methods: {
        async filter(data) {
            console.log('grade filter', data);
            this.loadingStastic = true;
            this.loadingDistribution = true;
            this.loadingRadar = true;
            this.loadingTable = true;
            this.curFilter = data;
            // 年级成绩
            // const gradeScoreData = scoreData.find(element => (element.classNum === 0));
            // this.compareTable = gradeClassScoreParse(scoreData);
            // 科目列表获取
            const subjectListRes = await getGradeSubjectList({
                gradeId: this.curFilter.gradeMajorId,
                term: this.curFilter.term
            })
            const subjectListData = resParse('获取科目列表', subjectListRes);
            this.subjects = subjectsParse(subjectListData);
            this.loadingTable = false;
            // 饼图数据处理
            this.updatePieChart(1);
            // 雷达图数据处理
            this.updateRadarChart();
            // 统计数据以及对比列表处理
            const infoRes = await getGradeBasic({
                gradeId: this.curFilter.gradeMajorId,
                term: this.curFilter.term,
            })
            const infoData = resParse('获取成绩概览', infoRes);
            const infoDataParsed = basicGradeDataParse(infoData);
            this.stasticList = [
                {
                    label: '总人数',
                    data: infoDataParsed.totalNum,
                    type: 'totalSize'
                },
                {
                    label: '挂科人数',
                    data: infoDataParsed.failNum,
                    type: 'failSize',
                    rate: infoDataParsed.failSizeCompare,
                    description: '自上学期以来'
                },
                {
                    label: '优秀率',
                    data: infoDataParsed.excellentRate,
                    type: 'excellentRate',
                    rule: '优秀率规则',
                    rate: infoDataParsed.excellentRateComapre,
                    description: '自上学期以来'
                },
                {
                    label: '及格率 (通过所有科目)',
                    data: infoDataParsed.pass,
                    type: 'passRate',
                    rule: '及格分数线',
                    rate: infoDataParsed.passRateCompare,
                    description: '自上学期以来'
                },
            ];
            this.loadingStastic = false;
        },
        openIndicatorDialog(tab) {
            this.indicatorDialog.tab = tab;
            this.indicatorDialog.visible = true;
        },
        async updatePieChart(between) {
            const pieChartRes = await getGradeScorePieChart({
                extent: between,
                gradeId: this.curFilter.gradeMajorId,
                term: this.curFilter.term
            })
            const chartData = resParse('获取年级绩点分布', pieChartRes);
            this.gpaDistribution = parsePieData(chartData, between);
            this.loadingDistribution = false;
        },
        async updateRadarChart() {
            const radarChartRes = await getGradeScoreRadarChart({
                gradeId: this.curFilter.gradeMajorId,
                term: this.curFilter.term
            })
            const chartData = resParse('获取年级平均分', radarChartRes);
            this.averageScore = averageScoreParse(chartData);
            console.log('average data', this.averageScore);
            this.loadingRadar = false;
        },
        onGpaBetweenChange(between) {
            this.updatePieChart(between);
        },
        async onCompareSubjectSelect(subject) {
            // 对比列表更新
            this.loadingTable = true;
            const scoreRes = await getScoreGradeClass({
                gradeId: this.curFilter.gradeMajorId,
                term: this.curFilter.term,
                courseId: subject
            });
            const scoreData = resParse('获取成绩概览', scoreRes);
            this.compareTable = gradeClassScoreParse(scoreData);
            this.loadingTable = false;
        },
        handelIndicatorSave() {
            this.indicatorDialog.visible = false;
            ElMessage.success('修改成功');
            this.filter(this.curFilter);
        }
    },
    async mounted() {
        // 筛选数据处理
        this.pageLoading = true;
        const gradeMajorRes = await getGradeMajor({});
        this.gradeMajorList = resParse('获取专业列表', gradeMajorRes);
        console.log('get gradeMajorList', this.gradeMajorList);
        this.showFilter = true;
        this.pageLoading = false;
    }
}
</script>
<style lang='scss' scoped>

.GradeScore {
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
        width: 100%;
        height: 376px;

        .column-1 {
            display: flex;
            flex-wrap: wrap;
            width: 55%;

            .stastic {
                display: flex;
                width: 50%;
                height: 50%;
                padding: 8px;
                box-sizing: border-box;
            }
        }

        .column-2 {
            width: 45%;
            padding: 8px;
            box-sizing: border-box;
        }
    }

    .row-2 {
        display: flex;
        width: 100%;
        margin-bottom: 24px;

        .column-1 {
            width: 65%;
            padding: 8px;
            box-sizing: border-box;

            .compare {
                width: 100%;
                height: 360px;

                .topLine {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .ops {
                        display: flex;
                        align-items: center;
                        .ruleSet {
                            margin: 0 8px 0 0;
                        }
                    }
                }
            }
        }
        
        .column-2 {
            width: 35%;
            padding: 8px;
            box-sizing: border-box;
        }
    }
}

</style>