<!-- 指标设置弹窗 -->
<template>
    <el-dialog
        :model-value="indicatorSetVisible"
        title="指标设置" 
        width="480px"
        @close="close"
    >
        <div class="dialogContent">
            <div class="tabsContainer">
                <el-tabs :model-value="indicatorSetTab" class="tabs" @tab-click="tabClick">
                    <el-tab-pane label="优秀率指标" name="excellent">
                        <div class="settings">
                            <div class="setting">
                                <span class="title">年级优秀率指标：</span>
                                <div class="input">
                                    <span class="prefix">学生绩点 ≥</span>
                                    <el-input v-model="indicatorData.gradeExcellent" class="inputer" size="small"></el-input>
                                    <span class="append">为优秀。</span>
                                </div>
                                <span class="tip">学生绩点总分4分制，仅支持判断至小数点后两位。</span>
                            </div>
                            <el-divider></el-divider>
                            <div class="setting">
                                <span class="title">班级绩点优秀率指标：</span>
                                <div class="input">
                                    <span class="prefix">学生绩点排名年级前</span>
                                    <el-input v-model="indicatorData.classExcellent" class="inputer" size="small"></el-input>
                                    <span class="append">%为优秀。</span>
                                </div>
                                <span class="tip">仅支持判断至小数点后一位。</span>
                            </div>
                            <el-divider></el-divider>
                            <div class="setting">
                                <span class="title">班级科目优秀率指标：</span>
                                <div class="input">
                                    <span class="prefix">学生该科目成绩 ≥</span>
                                    <el-input v-model="indicatorData.subjectExcellent" class="inputer" size="small"></el-input>
                                    <span class="append">为优秀。</span>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="及格线 " name="pass">
                        <div class="settings">
                            <div class="setting">
                                <span class="title">普通学生及格线指标：</span>
                                <div class="input">
                                    <span class="prefix">科目分数 ≥</span>
                                    <el-input v-model="indicatorData.normalPass" class="inputer" size="small"></el-input>
                                    <span class="append">为及格。</span>
                                </div>
                                <span class="tip">普通学生科目分数≥60分为及格，默认不可修改。</span>
                            </div>
                            <el-divider></el-divider>
                            <div class="setting">
                                <span class="title">特殊学生及格线指标：</span>
                                <div class="input">
                                    <span class="prefix">科目分数≥</span>
                                    <el-input v-model="indicatorData.specilalPass" class="inputer" size="small"></el-input>
                                    <span class="append">为及格。</span>
                                </div>
                                <span class="tip">如港澳台、少数民族等及格线非60分的学生，及格线分数可修改；</span>
                                <span class="tip">您可在学生信息中为该名学生修改身份。</span>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-button class="saveBtn" type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
</template>

<script>

export default {
    name: 'IndicatorSetDialog',
    components: {},
    props: [
        'indicatorSetVisible',
        'indicatorSetTab'
    ],
    data () {
        return {
            indicatorData: {
                gradeExcellent: 1.1,
                classExcellent: 10.5,
                subjectExcellent: 85,
                normalPass: 60,
                specilalPass: 40
            }
        }
    },
    methods: {
        tabClick() {

        },
        save() {
            // save async
            this.$emit('onClose');
        },
        close() {
            this.$emit('onClose');
        }
    }
}
</script>
<style lang='scss' scoped>

.dialogContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .tabsContainer {
        width: 100%;
    }
}

.settings {
    display: flex;
    flex-direction: column;

    .setting {
        display: flex;
        flex-direction: column;

        .title {
            font-weight: 600;
        }

        .input {
            display: flex;
            align-items: center;
            margin-top: 8px;

            .inputer {
                width: 56px;
                margin: 0 8px;
            }
        }

        .tip {
            margin-top: 8px;
            font-size: 12px;
            color: #c0c0c0;
        }
    }
}

.saveBtn {
    margin-top: 32px;
}
</style>