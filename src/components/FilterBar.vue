<!-- 头部筛选 -->
<template>
    <div class="filterBar">
        <el-form :inline="true" :model="filterForm" class="filter-form">
            <el-form-item label="专业:">
                <el-select class="formInput" v-model="filterForm.major" placeholder="请选择专业" @change="handelMajorSelect">
                    <el-option v-for="major in majorList" :key="major" :label="major" :value="major"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="gradeFilter" label="年级:">
                <el-select class="formInput" v-model="filterForm.grade" placeholder="请选择年级" @change="handelGradeSelect" :disabled="filterForm.major === ''">
                    <el-option v-for="grade in gradeList" :key="grade" :label="grade" :value="grade"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="termFilter" label="学期:">
                <el-select class="formInput" v-model="filterForm.term" placeholder="请选择学期" :disabled="termSelectDisabled">
                    <el-option v-for="term in termList" :key="term" :label="term" :value="term"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="classFilter" label="班级:">
                <el-select class="formInput" v-model="filterForm.class" placeholder="请选择班级" :disabled="classSelectDisabled">
                    <el-option v-for="classItem in classList" :key="classItem.id" :label="classItem.name" :value="classItem.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="subjectFilter" label="科目:">
                <el-select class="formInput" v-model="filterForm.subject" placeholder="请选择科目">
                    <el-option label="科目1" value="subject1"></el-option>
                    <el-option label="科目2" value="subject2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="filter" :disabled="filterDisabled">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

const FILTER_FORM_PROPS = {
    grade: 'gradeFilter',
    term: 'termFilter',
    class: 'classFilter',
    subject: 'subjectFilter'
};

import { getTermByGrade } from '@/common/utils';

export default {
    name: 'FilterBar',
    components: {},
    props: [
        'gradeFilter',
        'termFilter',
        'classFilter',
        'subjectFilter',
        'sourceList',
    ],
    data () {
        return {
            filterForm: {
                major: '',
                grade: '',
                term: '',
                class: '',
                subject: ''
            },
            termList: [201601, 201602, 201701, 201702, 201801, 201802, 201901, 201902, 202001, 202002],
            gradeList: [],
            majorList: [],
            classList: []
        }
    },
    methods: {
        filter() {
            console.log('filter', this.filterForm);
            let extra = {};
            if(this.gradeFilter) {
                const gradeMajor = this.sourceList.find(element => {
                    return (element.majorName===this.filterForm.major && element.grade===this.filterForm.grade)
                })
                extra = {
                    ...extra,
                    gradeMajorId: gradeMajor.id
                }
            }
            this.$emit('onFilter', {
                ...this.filterForm,
                ...extra
            });
        },
        handelMajorSelect(value) {
            if(this.gradeFilter) {
                this.filterForm.grade = '';
                this.filterForm.term = '';
                this.filterForm.class = '';
                this.filterForm.subject = '';
                const gradeSet = new Set();
                this.sourceList.forEach(element => {
                    if(element.majorName === value)
                        gradeSet.add(element.grade);
                });
                this.gradeList = Array.from(gradeSet);
            }
        },
        handelGradeSelect(value) {
            this.filterForm.term = '';
            this.filterForm.class = '';
            this.filterForm.subject = '';
            if(this.termFilter) {
                this.termList = getTermByGrade(value);
            }
            if(this.classFilter) {
                this.filterForm.class = '';
                const classSet = new Set();
                this.sourceList.forEach(element => {
                    if(element.grade === value && element.majorName === this.filterForm.major)
                        classSet.add({
                            id: element.classId,
                            name: element.name
                        });
                });
                this.classList = Array.from(classSet);
            }
        }
    },
    computed: {
        filterDisabled() {
            const keys = Object.keys(this.filterForm);
            for(let i=0; i<keys.length; i++) {
                if(keys[i] === 'major' && this.filterForm.major === '')
                    return true;
                else {
                    const propKey = FILTER_FORM_PROPS[keys[i]];
                    if(this.$props[propKey]) {
                        if(this.filterForm[keys[i]] === '')
                            return true;
                    }
                }
            }
            return false;
        },
        termSelectDisabled() {
            if(this.gradeFilter)
                return (this.filterForm.grade === '')
            else
                return (this.filterForm.major === '')
        },
        classSelectDisabled() {
            if(this.termFilter)
                return (this.filterForm.term === '')
            else
                return (this.filterForm.grade === '')
        }
    },
    mounted() {
        console.log('mount filter')
        if(this.gradeFilter) {
            const majorSet = new Set();
            this.sourceList.forEach(element => {
                majorSet.add(element.majorName);
            });
            this.majorList = Array.from(majorSet);
        }
    }
}
</script>
<style lang='scss' scoped>
.filterBar {
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

    .formInput {
        width: 160px;
    }
}
</style>