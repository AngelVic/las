<!-- 年级成绩 -->
<template>
    <div class='GradeScore'>
        <div class="filter">
            <FilterBar
                @on-filter="filter"
                :gradeFilter="true"
                :termFilter="true"
            ></FilterBar>
        </div>
        <div class="charts">
            <div class="row-1">
                <div class="column-1">
                    <div class="stastic" v-for="stastic in stasticList" :key="stastic.type">
                        <StasticCard
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
                    <GpaDistribution></GpaDistribution>
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
                        type="grade"
                        :major="curFilter.major"
                        :grade="curFilter.grade"
                        :term="curFilter.term"
                        position="gradeScore"
                    ></AdvantageRadar>
                </div>
            </div>
        </div>
        <IndicatorSetDialog
            :indicatorSetVisible="indicatorDialog.visible"
            :indicatorSetTab="indicatorDialog.tab"
            @on-close="() => {this.indicatorDialog.visible = false}"
        ></IndicatorSetDialog>
    </div>
</template>

<script>

import StasticCard from '../../../components/StasticCard';
import FilterBar from '../../../components/FilterBar';
import AdvantageRadar from '../../../components/AdvantageRadar';
import GpaDistribution from '../../../components/GpaDistribution';
import IndicatorSetDialog from '../components/IndicatorSetDialog';

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
            curFilter: {
                major: '',
                grade: '',
                term: '',
                class: ''
            },
            stasticList: [
                {
                    label: '总人数',
                    data: '999',
                    type: 'totalSize'
                },
                {
                    label: '挂科人数',
                    data: '23',
                    type: 'failSize',
                    rate: '3.48%',
                    description: '自上学期以来'
                },
                {
                    label: '优秀率',
                    data: '52.12%',
                    type: 'excellentRate',
                    rule: '优秀率规则',
                    rate: '3.48%',
                    description: '自上学期以来'
                },
                {
                    label: '及格率 (通过所有科目)',
                    data: '79.65%',
                    type: 'passRate',
                    rule: '及格分数线',
                    rate: '3.48%',
                    description: '自上学期以来'
                },
            ],
            subjects: [
                {
                    id: 1,
                    name: '高等数学'
                },
                {
                    id: 2,
                    name: '软件工程' 
                },
                {
                    id: 3,
                    name: '基础电路与电子学基础电路与电子学（重修）'
                }
            ],
            compareSubject: null,
            compareTable: [
                {
                    title: '年级',
                    size: 756,
                    gpaExcellent: 12.8,
                    average: '64',
                    failed: 8,
                    subjectExcellent: 18.9,
                    passed: 70.90
                },
                {
                    title: '计算机1班',
                    size: 756,
                    gpaExcellent: 11.8,
                    average: '64',
                    failed: 8,
                    subjectExcellent: 18.9,
                    passed: 70.90
                },
                {
                    title: '计算机2班',
                    size: 756,
                    gpaExcellent: 10.8,
                    average: '64',
                    failed: 8,
                    subjectExcellent: 18.9,
                    passed: 70.90
                },
                {
                    title: '计算机3班',
                    size: 756,
                    gpaExcellent: 9.8,
                    average: '64',
                    failed: 8,
                    subjectExcellent: 18.9,
                    passed: 70.90
                },
                {
                    title: '计算机4班',
                    size: 756,
                    gpaExcellent: 10.2,
                    average: '64',
                    failed: 8,
                    subjectExcellent: 18.9,
                    passed: 70.90
                },
                {
                    title: '计算机5班',
                    size: 756,
                    gpaExcellent: 22.7,
                    average: '64',
                    failed: 8,
                    subjectExcellent: 18.9,
                    passed: 70.90
                },
                {
                    title: '计算机6班',
                    size: 756,
                    gpaExcellent: 3.2,
                    average: '64',
                    failed: 8,
                    subjectExcellent: 18.9,
                    passed: 70.90
                },
            ],
            indicatorDialog: {
                visible: false,
                tab: 'excellent'
            }
        }
    },
    methods: {
        filter(data) {
            console.log('grade filter', data);
        },
        openIndicatorDialog(tab) {
            this.indicatorDialog.tab = tab;
            this.indicatorDialog.visible = true;
        }
    },
    mounted() {
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