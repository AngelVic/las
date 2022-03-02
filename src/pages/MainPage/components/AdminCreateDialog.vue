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
                <el-button type="primary" @click="save">添加</el-button>
            </span>
        </template>
  </el-dialog>
</template>

<script>

export default {
    name: 'AdminCreateDialog',
    components: {},
    props: ['adminCreateVisible'],
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
        save() {
            console.log('save', this.adminCreateForm);
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