<!-- 创建负责人弹窗 -->
<template>
    <el-dialog
        :model-value="adminCreateVisible"
        title="负责人添加"
        @close="close"
        width="480px"
        destroy-on-close
    >
        <el-form class="infoForm" :model="adminCreateForm">
            <el-form-item label="年级专业" required>
                <el-cascader
                    :props="gradeClassProps"
                    v-model="adminCreateForm.gradeClass"
                    :options="gradeClassOptions"
                    placeholder="请选择年级专业"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="姓名" required>
                <el-input v-model="adminCreateForm.name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="save" :disabled="saveDisabled">添加</el-button>
            </span>
        </template>
  </el-dialog>
</template>

<script>
import { parseGradeMajorData } from '@/common/utils';
import { createAccount } from '@/common/request';
import { resParse } from '@/common/methods';

export default {
    name: 'AdminCreateDialog',
    components: {},
    props: ['adminCreateVisible', 'gradeMajorList'],
    data () {
        return {
            gradeClassOptions: [],
            gradeClassProps: {
                multiple: true,
            },
            adminCreateForm: {
                gradeClass: [],
                name: ''
            }
        }
    },
    methods: {
        close() {
            this.$emit('onClose');
        },
        async save() {
            console.log('save', this.adminCreateForm);
            const createRes = await createAccount({
                gradeIdList: this.adminCreateForm.gradeClass.map(t => t[1]),
                name: this.adminCreateForm.name
            });
            const createResult = resParse('创建辅导员账号', createRes)
            if(createResult!==null) {
                this.$emit('onSuccess', {
                    account: createResult
                });
            }
        }
    },
    computed: {
        saveDisabled: function() {
            return (this.adminCreateForm.gradeClass.length===0 || this.adminCreateForm.name==='')
        }
    },
    mounted() {
        console.log('create dialog get', this.gradeMajorList);
        this.gradeClassOptions = parseGradeMajorData(this.gradeMajorList);
        console.log('parseGradeMajorData', this.gradeClassOptions);
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