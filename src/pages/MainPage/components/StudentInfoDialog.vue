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
            <span>{{parsedStudentId}}</span>
            <span class="name">{{studentInfoForm.name}}</span>
        </div>
        <el-form class="infoForm" :model="studentInfoForm" ref="infoFormRef" :rules="formRules">
            <el-form-item label="专业" prop="major">
                <el-select 
                    class="input" 
                    v-model="studentInfoForm.major"
                    @change="handelMajorChange"
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
            <el-form-item label="年级" prop="grade">
                <el-select
                    class="input" 
                    v-model="studentInfoForm.grade"
                    @change="handelGradeChange"
                    placeholder="请选择年级"
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
            <el-form-item label="班级" prop="class">
                <el-select
                    class="input" 
                    v-model="studentInfoForm.class"
                    placeholder="请选择班级"
                >
                    <el-option
                        v-for="item in classes"
                        :key="item.id"
                        :label="`${studentInfoForm.major}${item.name===0?'无归属':item.name}班`"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="HMT" label="是否港澳台等特殊类型学生" prop="HMT">
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
                <el-form-item label="宿舍楼" prop="dormitory">
                    <el-input v-model="studentInfoForm.dormitory" />
                </el-form-item>
                <el-form-item class="room" label="宿舍号" prop="room">
                    <el-input v-model="studentInfoForm.room" />
                </el-form-item>
            </div>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="save(this.$refs.infoFormRef)">保存</el-button>
            </span>
        </template>
  </el-dialog>
</template>

<script>
import { updateStudent } from '@/common/request';
import { resParse } from '@/common/methods';
import { ElMessage } from 'element-plus'
import { completeStudentId } from '@/common/utils'

export default {
    name: 'StudentInfoDialog',
    components: {},
    props: [
        'studentInfoVisible',
        'value',
        'gradeMajorClassList'
    ],
    data () {
        return {
            grades: [],
            majors: [],
            classes: [],
            studentInfoForm: {},
            formRules: {
                major: [
                    { required: true, message: '请选择专业', trigger: 'blur' },
                ],
                grade: [
                    { required: true, message: '请选择年级', trigger: 'blur' },
                ],
                class: [
                    { required: true, message: '请选择班级', trigger: 'blur' },
                ],
                HMT: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                dormitory: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                room: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
            },
        }
    },
    computed: {
        parsedStudentId() {
            return completeStudentId(this.studentInfoForm.studentId)
        }
    },
    methods: {
        close() {
            this.$emit('onClose');
        },
        async save(formRef) {
            await formRef.validate();
            const changeRes = await updateStudent({
                "building": this.studentInfoForm.dormitory,
                "isSpecial": this.studentInfoForm.HMT,
                "room": this.studentInfoForm.room,
                "studentId": this.studentInfoForm.studentId,
                "classId": this.studentInfoForm.class,
            });
            console.log('changeRes', changeRes);
            resParse('修改学生信息', changeRes);
            if(changeRes.code===200) {
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
                this.$emit('onClose');
            }
        },
        updateGradeList(major) {
            const gradeSet = new Set();
            this.gradeMajorClassList.forEach(element => {
                if(element.majorName === major)
                    gradeSet.add(element.grade);
            });
            this.grades = Array.from(gradeSet);
        },
        updateClassList(major, grade) {
            const classSet = new Set();
            this.gradeMajorClassList.forEach(element => {
                if(element.grade === grade && element.majorName === major)
                    classSet.add({
                        id: element.classId,
                        name: element.name
                    });
            });
            this.classes = Array.from(classSet);
        },
        handelMajorChange(major) {
            this.studentInfoForm.grade = null;
            this.studentInfoForm.class = null;
            this.updateGradeList(major);
        },
        handelGradeChange(grade) {
            this.studentInfoForm.class = null;
            this.updateClassList(this.studentInfoForm.major, grade);
        }
    },
    mounted() {
        // 专业年级班级数据处理
        const majorSet = new Set();
        this.gradeMajorClassList.forEach(element => {
            majorSet.add(element.majorName);
        });
        this.majors = Array.from(majorSet);
        this.updateGradeList(this.value.major);
        this.updateClassList(this.value.major, this.value.grade);
        this.studentInfoForm = this.value;
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