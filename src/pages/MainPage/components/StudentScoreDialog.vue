<!-- 学生成绩弹窗 -->
<template>
    <el-dialog
        :model-value="studentScoreVisible"
        title="学生个人成绩"
        @close="close"
        width="80%"
        destroy-on-close
    >
        <div class="dialogContent">
            <div class="studentInfo">
                <div class="row-1">
                    <span>{{parsedStudentId}}</span>
                    <span class="name">{{studentInfo.name}}</span>
                    <el-button type="text" class="changeBtn" @click="changeStudent" :disabled="studentEditable">修改学生信息</el-button>
                </div>
                <div class="row-2">
                    <div class="HMT">
                        <span>是否港澳台等特殊类型学生:</span>
                        <el-radio
                            class="HMTradio"
                            v-model="studentInfo.HMT"
                            :label="true"
                            :disabled="!studentEditable"
                        >是</el-radio>
                        <el-radio
                            class="HMTradio"
                            v-model="studentInfo.HMT"
                            :label="false"
                            :disabled="!studentEditable"
                        >否</el-radio>
                    </div>
                    <div class="class">
                        <span>班级:</span>
                        <el-select
                            class="classInput" 
                            v-model="studentInfo.classId"
                            size="small"
                            :disabled="!studentEditable"
                        >
                            <el-option
                                v-for="item in classes"
                                :key="item.value"
                                :label="`${studentInfo.major}${item.label}班`"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="dormitory">
                        <span>宿舍楼:</span>
                        <el-input class="dormitoryInput" v-model="studentInfo.dormitory" size="small" :disabled="!studentEditable" />
                    </div>
                    <div class="room">
                        <span>宿舍号:</span>
                        <el-input class="roomInput" v-model="studentInfo.room" size="small" :disabled="!studentEditable" />
                    </div>
                    <div class="save">
                        <el-button type="text" v-if="studentEditable" @click="save">保存</el-button>
                    </div>
                </div>
                <div class="row-3">
                    <span>特殊类型学生成绩及格线与普通学生不同，可在及格分数线中设置分数。</span>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="scoreTable">
                <div class="title">
                    <span>个人成绩（括号内为补考后成绩）</span>
                </div>
                <div class="tableContent">
                    <el-table
                        :data="studentInfo.scoreData"
                        style="width: 100%"
                    >
                        <el-table-column prop="classRank" label="班级排名" />
                        <el-table-column prop="gradeRank" label="年级排名" />
                        <el-table-column prop="gpa" label="学期绩点" />
                        <el-table-column
                            v-for="subject in subjects"
                            :key="subject.id"
                            :label="subject.name"
                            sortable
                        >
                            <template #default="scope">
                                <span
                                    :style="{color: getScoreColor(scope, subject.id)}"
                                >{{ getScoreWithId(scope, subject.id) }}</span>
                                <span
                                    v-if="getScoreStateWithId(scope, subject.id) === 'failed'"
                                > ({{ getSecScoreWithId(scope, subject.id) }})</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="charts">
                <div class="column-1">
                    <AdvantageRadar
                        type="grade"
                        :subjects="subjects"
                        :value="studentInfo.scoreData[0].scores"
                        positon="studentScore"
                    ></AdvantageRadar>
                </div>
                <div class="column-2">
                    <GpaChangeLine :value="studentInfo.gpaList"></GpaChangeLine>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { getStudentScore, searchClass, updateStudent } from '@/common/request'
import AdvantageRadar from '../../../components/AdvantageRadar'
import GpaChangeLine from '../../../components/GpaChangeLine'
import { classListParse, resParse, studentDetailParse } from '@/common/methods'
import { ElMessage } from 'element-plus';
import { completeStudentId } from '@/common/utils'

const SCORE_COLOR = {
    normal: '#303133',
    failed: '#f56c6c'
}

export default {
    name: 'StudentScoreDialog',
    components: {
        AdvantageRadar,
        GpaChangeLine
    },
    props: [
        'studentScoreVisible',
        'id',
        'term',
        'classId',
        'major',
        'gradeMajorId',
        'score',
        'gpa'
    ],
    data () {
        return {
            studentInfo: {
                studentId: '',
                scoreData:[
                    {
                        scores:[]
                    }
                ],
                gpaList: []
            },
            studentEditable: false,
            classes: [],
            subjects: []
        }
    },
    computed: {
        parsedStudentId() {
            return completeStudentId(this.studentInfo.studentId)
        }
    },
    methods: {
        close() {
            this.$emit('onClose');
        },
        changeStudent() {
            this.studentEditable = true;
        },
        async save() {
            this.studentEditable = false;
            console.log('new info', this.studentInfo)
            const changeRes = await updateStudent({
                "building": this.studentInfo.dormitory,
                "isSpecial": this.studentInfo.HMT,
                "room": this.studentInfo.room,
                "studentId": this.studentInfo.studentId,
                "class": this.studentInfo.classId
            });
            const changeResult = resParse('修改学生信息', changeRes);
            if(changeResult!==null) {
                ElMessage.success('修改成功');
            }
        },
        getScoreWithId(scope, id) {
            return scope.row.scores[`${id}`]?.score;
        },
        getSecScoreWithId(scope, id) {
            return scope.row.scores[`${id}`]?.secScore;
        },
        getScoreStateWithId(scope, id) {
            return scope.row.scores[`${id}`]?.state;
        },
        getScoreColor(scope, id) {
            if(scope.row.scores[`${id}`]?.state == 'failed') {
                return SCORE_COLOR['failed'];
            } else {
                return SCORE_COLOR['normal'];
            }
        },
    },
    async mounted() {
        console.log('mounted student score dialog', this.gradeMajorId);
        // 获取班级列表
        const classListRes = await searchClass({
            gradeId: this.gradeMajorId
        });
        const classListData = resParse('获取专业下属班级', classListRes);
        this.classes = classListParse(classListData);
        // 获取学生信息
        const studentDetailRes = await getStudentScore({
            studentId: this.id,
            term: this.term
        });
        const studentDetailData = resParse('获取学生详情', studentDetailRes);
        this.studentInfo = studentDetailParse(
            studentDetailData,
            this.subjects,
            this.classId,
            this.major,
            this.gpa,
            this.score
        );
        const socreObj = this.studentInfo.scoreData[0].scores;
        const newSubjects = [];
        for(let i in socreObj) {
            newSubjects.push({
                id: socreObj[i].id,
                name: socreObj[i].name,
            })
        }
        this.subjects = newSubjects;
        console.log('studentInfo', this.studentInfo);
    }
}
</script>
<style lang='scss' scoped>
.dialogContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.studentInfo {
    display: flex;
    flex-direction: column;
    width: 100%;

    .row-1 {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;

        .name {
            margin-left: 16px;
        }

        .changeBtn {
            margin-left: 16px;
        }
    }

    .row-2 {
        display: flex;
        align-items: center;

        .HMT {
            display: flex;
            align-items: center;

            .HMTradio {
                margin: 0 0 0 8px;
            }
        }

        .class {
            display: flex;
            align-items: center;
            margin-left: 16px;

            .classInput {
                width: 128px;
                margin-left: 8px;
            }
        }

        .dormitory {
            display: flex;
            align-items: center;
            margin-left: 16px;

            .dormitoryInput {
                width: 48px;
                margin-left: 8px;
            }
        }

        .room {
            display: flex;
            align-items: center;
            margin-left: 16px;

            .roomInput {
                width: 48px;
                margin-left: 8px;
            }
        }

        .save {
            margin-left: 24px;
        }
    }

    .row-3 {
        margin-top: 8px;
        font-size: 12px;
        color: #ababab;
    }
}

.scoreTable {

    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px 16px 8px 16px;
    box-sizing: border-box;
    box-shadow: #c7c7c7 1px 1px 20px;

    .title {
        font-size: 14px;
        color: #8898aa;
    }

    .tableContent {
        margin-top: 16px;
    }
}

.charts {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    width: 100%;

    .column-1 {
        flex: 4;
        width: 40%;
    }

    .column-2 {
        flex: 6;
        width: 100%;
        margin-left: 16px;
    }
}

.contentCard {
    border-radius: 0;
}
</style>