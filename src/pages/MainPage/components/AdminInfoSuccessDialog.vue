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

export default {
    name: 'AdminInfoSuccessDialog',
    components: {},
    props: ['adminInfoVisible'],
    data () {
        return {
            gradeClassOptions: [
                {
                    value: 2000,
                    label: '2000级',
                    children: [
                        {
                            value: 'major1',
                            label: '计算机'
                        }
                    ]
                },
                {
                    value: 2020,
                    label: '2020级',
                    children: [
                        {
                            value: 'major1',
                            label: '计算机'
                        },
                        {
                            value: 'major2',
                            label: '软件工程'
                        }
                    ]
                },
                {
                    value: 2021,
                    label: '2021级',
                    children: [
                        {
                            value: 'major1',
                            label: '计算机'
                        },
                        {
                            value: 'major2',
                            label: '软件工程'
                        },
                        {
                            value: 'major3',
                            label: '大数据'
                        },
                    ]
                },
            ],
            gradeClassProps: {
                multiple: true,
            },
            adminInfoForm: {
                gradeClass: [
                    [2000, 'major1'],
                    [2020, 'major2']
                ],
                name: '你的名字',
                account: '111111111'
            }
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