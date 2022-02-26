<!-- 头部筛选 -->
<template>
    <div class="filterBar">
        <el-form :inline="true" :model="filterForm" class="filter-form">
            <el-form-item label="专业:">
                <el-select v-model="filterForm.major" placeholder="请选择专业">
                    <el-option label="专业1" value="major1"></el-option>
                    <el-option label="专业2" value="major2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="gradeFilter" label="年级:">
                <el-select v-model="filterForm.grade" placeholder="请选择年级">
                    <el-option label="2000级" value="2000"></el-option>
                    <el-option label="2001级" value="2001"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="termFilter" label="学期:">
                <el-select v-model="filterForm.term" placeholder="请选择学期">
                    <el-option label="200001" value="200001"></el-option>
                    <el-option label="200002" value="200002"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="classFilter" label="班级:">
                <el-select v-model="filterForm.class" placeholder="请选择班级">
                    <el-option label="1班" value="1"></el-option>
                    <el-option label="2班" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="filter">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'FilterBar',
    components: {},
    props: [
        'gradeFilter',
        'termFilter',
        'classFilter'
    ],
    data () {
        return {
            filterForm: {
                major: '',
                grade: '',
                term: '',
                class: ''
            },
        }
    },
    methods: {
        filter() {
            console.log('filter', this.filterForm);
            this.$emit('onFilter', this.filterForm);
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
}
</style>