<!-- 学生信息编辑弹窗 -->
<template>
    <el-dialog
        :model-value="studentInfoVisible"
        title="学生信息修改"
        @close="close"
        width="480px"
        destroy-on-close
    >
        <div class="topLine">
            <span>011111111</span>
            <span class="name">你的名字</span>
        </div>
        <el-form class="infoForm" :model="studentInfoForm">
            <el-form-item label="年级" required>
                <el-select
                    class="input" 
                    v-model="studentInfoForm.grade"
                >
                    <el-option
                        v-for="item in grades"
                        :key="item"
                        :label="`${item}级`"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专业" required>
                <el-select 
                    class="input" 
                    v-model="studentInfoForm.major"
                >
                    <el-option
                        v-for="item in majors"
                        :key="item"
                        :label="`${item}`"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级" required>
                <el-select
                    class="input" 
                    v-model="studentInfoForm.class"
                >
                    <el-option
                        v-for="item in classes"
                        :key="item"
                        :label="`${studentInfoForm.major}${item}班`"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="HMT" label="是否港澳台等特殊类型学生" required>
                <el-radio
                    class="HMTradio"
                    v-model="studentInfoForm.HMT"
                    :label="true"
                >是</el-radio>
                <el-radio
                    class="HMTradio"
                    v-model="studentInfoForm.HMT"
                    :label="false"
                >否</el-radio>
            </el-form-item>
            <span class="tip">特殊类型学生成绩及格线与普通学生不同，可在及格分数线中设置分数。</span>
            <div class="row">
                <el-form-item label="宿舍楼" required>
                    <el-input v-model="studentInfoForm.dormitory" />
                </el-form-item>
                <el-form-item class="room" label="宿舍号" required>
                    <el-input v-model="studentInfoForm.room" />
                </el-form-item>
            </div>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </template>
  </el-dialog>
</template>

<script>

export default {
    name: 'StudentInfoDialog',
    components: {},
    props: [
        'studentInfoVisible'
    ],
    data () {
        return {
            grades: [2000, 2001, 2002, 2008, 2021, 2022],
            majors: ['计算机', '软件工程', '大数据'],
            classes: [1, 2, 3, 4],
            studentInfoForm: {
                grade: 2018,
                major: '计算机',
                class: 1,
                HMT: true,
                dormitory: 33,
                room: 111
            }
        }
    },
    methods: {
        close() {
            this.$emit('onClose');
        },
        save() {
            this.$emit('onClose');
        }
    }
}
</script>
<style lang='scss' scoped>
.topLine {
    display: flex;
    align-items: center;
    margin: 16px 0 16px 0;
    font-size: 16px;
    line-height: 16px;
    font-weight: 600;

    .name {
        margin-left: 16px;
    }
}

.infoForm {
    margin-top: 16px;
    padding: 0 8px;
    box-sizing: border-box;

    .input {
        width: 100%;
        margin-left: 16px;
    }

    .HMT {
        margin-bottom: 0;
    }

    .tip {
        padding-left: 10px;
        font-size: 12px;
        color: #ababab;
    }

    .row {
        display: flex;
        margin-top: 18px;

        .room {
            margin-left: 16px;
        }
    }
}

.dialog-footer {
    display: flex;
    justify-content: center;
}
</style>