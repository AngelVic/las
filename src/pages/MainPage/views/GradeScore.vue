<!-- 年级成绩 -->
<template>
    <div class='GradeScore'>
        <div class="filter">
            <el-form :inline="true" :model="filterForm" class="filter-form">
                <el-form-item label="专业:">
                    <el-select v-model="filterForm.major" placeholder="请选择专业">
                        <el-option label="专业1" value="major1"></el-option>
                        <el-option label="专业2" value="major2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级:">
                    <el-select v-model="filterForm.grade" placeholder="请选择年级">
                        <el-option label="2000级" value="2000"></el-option>
                        <el-option label="2001级" value="2001"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学期:">
                    <el-select v-model="filterForm.term" placeholder="请选择学期">
                        <el-option label="200001" value="200001"></el-option>
                        <el-option label="200002" value="200002"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
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
                        ></StasticCard>
                    </div>
                </div>
                <div class="column-2">
                    <div class="contentCard distribution">
                        <span class="cardTitle">成绩分布</span>
                        <span class="secTitle">年级学生绩点分布</span>
                        <div class="chartContainer">
                            <div id="distributionChart"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-2">
                <div class="column-1">
                    <div class="contentCard compare">
                        <div class="topLine">
                            <span class="cardTitle">年级-班级科目成绩对比</span>
                            <div class="ops">
                                <el-button class="ruleSet" type="text">优秀率规则</el-button>
                                <el-button class="ruleSet" type="text">及格分数线</el-button>
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
                    <div class="contentCard advantage">
                        <div class="topLine">
                            <span class="cardTitle">科目优势分析雷达图</span>
                            <el-select
                                v-model="advantageSubject"
                                multiple
                                collapse-tags
                                placeholder="选择显示的科目"
                            >
                                <el-option
                                v-for="subject in subjects"
                                :key="subject.id"
                                :label="subject.name"
                                :value="subject.id"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="chartContainer">
                            <div id="advantageChart"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import StasticCard from '../../../components/StasticCard.vue';
import { Pie, Radar } from '@antv/g2plot';

export default {
    name: 'GradeScore',
    components: {
        StasticCard
    },
    data () {
        return {
            filterForm: {
                major: '',
                grade: '',
                term: ''
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
            advantageSubject: []
        }
    },
    methods: {
        drawScoreDistribution() {
            const columnPlot = new Pie('distributionChart', {
                data: [
                    { type: '0≤x<1', value: 2 },
                    { type: '1≤x<2', value: 32 },
                    { type: '2≤x<3', value: 310 },
                    { type: '3≤x<4', value: 60 }
                ],
                angleField: 'value',
                colorField: 'type',
                radius: 0.9,
                label: {
                    content: ({type, value}) => {
                        return type + ', ' + value;
                    }
                },
            });

            columnPlot.render();
        },
        drawAdvantageRadar() {
            const data = [
                { id: 1, name: '高等数学', score: 75 },
                { id: 2, name: '软件工程', score: 88 },
                { id: 3, name: '基础电路与电子学基础电路与电子学（重修）', score: 62 },
            ];
            const radarPlot = new Radar('advantageChart', {
                data: data,
                xField: 'name',
                yField: 'score',
                meta: {
                    name: {
                        formatter: (value) => {
                            console.log(value);
                            // value为一个字符串
                            // 每5个字符添加一个 \n
                            // return添加完成的字符串
                            return '添加完成字符串';
                        }
                    }
                }
            });
            radarPlot.render();
        }
    },
    mounted() {
        this.drawScoreDistribution();
        this.drawAdvantageRadar();
    }
}
</script>
<style lang='scss' scoped>

.GradeScore {
    width: 100%;
}

.filter {
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    background-color: #fff;

    .filter-form {
        height: 32px;
    }
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
        height: 320px;

        .column-1 {
            display: flex;
            flex-wrap: wrap;
            width: 55%;

            .stastic {
                display: flex;
                width: 50%;
                height: 160px;
                padding: 8px;
                box-sizing: border-box;
            }
        }

        .column-2 {
            width: 45%;
            padding: 8px;
            box-sizing: border-box;

            .distribution {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;

                .secTitle {
                    margin-top: 8px;
                    margin-left: 8px;
                }

                .chartContainer {
                    width: 100%;
                    height: 100%;
                    margin-top: 16px;
                    margin-left: 8px;
                    
                    #distributionChart {
                        display: flex;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
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

            .advantage {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 360px;

                .topLine {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chartContainer {
                    width: 100%;
                    height: 100%;
                    margin-top: 16px;
                    margin-left: 8px;
                    
                    #advantageChart {
                        display: flex;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
}

</style>