<!-- 负责人信息修改 -->
<template>
    <el-dialog
        :model-value="adminInfoVisible"
        title="负责人信息修改"
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
                ></el-cascader>
            </el-form-item>
            <el-form-item label="姓名" required>
                <el-input v-model="adminInfoForm.name" />
            </el-form-item>
            <el-form-item label="账号" required>
                <el-input v-model="adminInfoForm.account" disabled />
                <span class="tip">账号为系统自动生成，无法进行修改。</span>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </template>
  </el-dialog>
</template>

<script>

import { parseGradeMajorData } from '@/common/utils';
import { updateAccount } from '@/common/request';
import { resParse } from '@/common/methods';
import { ElMessage } from 'element-plus';

export default {
    name: 'AdminInfoDialog',
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
        async save() {
            console.log('save', this.adminInfoForm);
            const changeRes = await updateAccount({
                gradeIdList: this.adminInfoForm.gradeClass.map(t => t[1]),
                name: this.adminInfoForm.name
            });
            const changeResult = resParse('修改辅导员信息', changeRes);
            if(changeResult!==null) {
                ElMessage.success('修改成功');
                this.$emit('onSuccess');
            }
        }
    },
    mounted() {
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