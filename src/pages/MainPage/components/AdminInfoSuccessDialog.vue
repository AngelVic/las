<!-- 负责人信息添加成功 -->
<template>
    <el-dialog
        :model-value="adminInfoVisible"
        title="添加成功"
        @close="close"
        width="480px"
        destroy-on-close
    >
        <el-form class="infoForm" :model="adminInfoForm">
            <el-form-item label="年级专业" required>
                <el-cascader
                    :props="gradeClassProps"
                    v-model="adminInfoForm.gradeClass"
                    :options="gradeClassOptions"
                    disabled
                ></el-cascader>
            </el-form-item>
            <el-form-item label="姓名" required>
                <el-input v-model="adminInfoForm.name" disabled />
            </el-form-item>
            <el-form-item label="账号" required>
                <el-input v-model="adminInfoForm.account" disabled />
                <span class="tip">账号为系统自动生成，无法进行修改。</span>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="close">关闭</el-button>
            </span>
        </template>
  </el-dialog>
</template>

<script>

import { parseGradeMajorData } from '@/common/utils';

export default {
    name: 'AdminInfoSuccessDialog',
    components: {},
    props: ['adminInfoVisible', 'value', 'gradeMajorList'],
    data () {
        return {
            gradeClassOptions: [],
            gradeClassProps: {
                multiple: true,
            },
            adminInfoForm: {}
        }
    },
    methods: {
        close() {
            this.$emit('onClose');
        },
        save() {
            console.log('save', this.adminInfoForm);
            this.$emit('onClose');
        }
    },
    mounted() {
        console.log('AdminInfoSuccessDialog mounted', this.gradeMajorList, this.value)
        this.gradeClassOptions = parseGradeMajorData(this.gradeMajorList);
        console.log('parse', this.gradeClassOptions)
        this.adminInfoForm = this.value;
    }
}
</script>
<style lang='scss' scoped>
.infoForm {
    margin-top: 16px;

    .tip {
        font-size: 12px;
        color: #aaaaaa;
    }
}

.dialog-footer {
    display: flex;
    justify-content: center;
}
</style>