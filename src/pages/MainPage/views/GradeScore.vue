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
                <div class="colum-1">
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
                </div>
            </div>
            <div class="row-2">
                <div class="colum-1">
                </div>
                <div class="column-2">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import StasticCard from '../../../components/StasticCard.vue';

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
            ]
        }
    },
    methods: {

    }
}
</script>
<style lang='scss' scoped>

.GradeScore {
    display: flex;
    flex-direction: column;
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
    height: 100%;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;

    .row-1 {
        display: flex;
        width: 100%;

        .colum-1 {
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
    }
}

</style>