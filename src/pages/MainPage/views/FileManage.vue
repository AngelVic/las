<!-- 文件管理 -->
<template>
    <div class='FileManage'>
        <div class="filter">
            <FilterBar
                v-if="showFilter"
                @on-filter="filter"
                :gradeFilter="true"
                :termFilter="true"
                :sourceList="gradeMajorList"
            ></FilterBar>
        </div>
        <div class="main_container">
            <div class="row-1">
                <div class="contentCard">
                    <span class="cardTitle">成绩上传</span>
                    <div class="uploadForm">
                        <el-form :inline="true" :model="uploadForm" ref="uploadFormRef">
                            
                            <el-form-item label="上传专业" :rules="[
                                {
                                    required: true,
                                    message: '请选择专业',
                                    trigger: 'blur',
                                }
                            ]">
                                <el-select v-model="uploadForm.major" placeholder="请选择专业" @change="handelUploadMajorSelect">
                                    <el-option v-for="item in uploadMajorList" :key="item" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="上传年级" :rules="[
                                {
                                    required: true,
                                    message: '请选择年级',
                                    trigger: 'blur',
                                }
                            ]">
                                <el-select v-model="uploadForm.grade" placeholder="请选择年级" :disabled="uploadGradeDisabled">
                                    <el-option v-for="item in uploadGradeList" :key="item" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="选择文件" :rules="[
                                {
                                    required: true,
                                    message: '请选择文件',
                                    trigger: 'blur',
                                }
                            ]">
                                <el-upload
                                    ref="uploadFile"
                                    class="upload"
                                    :auto-upload="false"
                                    :limit="1"
                                    action="..."
                                    :data="uploadForm"
                                >
                                    <template #trigger>
                                        <el-button :icon="Upload">上传文件</el-button>
                                    </template>
                                    <el-button
                                        class="submit"
                                        type="primary"
                                        @click="submitUpload(this.$refs.uploadFormRef, this.$refs.uploadFile)"
                                        :disabled="uploadBtnDisabled"
                                    >确认上传</el-button>
                                </el-upload>
                            </el-form-item>
                        </el-form>
                        <div class="tip">
                            <span>请上传与教务处下载的成绩格式一致的excel文件。</span>
                            <el-link type="primary">示例文件.excel</el-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-2">
                <div class="contentCard">
                    <div class="topLine">
                        <span class="cardTitle">成绩上传</span>
                        <el-button type="primary">批量删除</el-button>
                    </div>
                    <div class="table">
                        <el-table :data="fileTable" style="width: 100%">
                            <el-table-column type="index" />
                            <el-table-column label="年级">
                                <template #default="scope">
                                    <span>{{ scope.row.grade }}级</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="major" label="专业" />
                            <el-table-column prop="term" label="学期" />
                            <el-table-column prop="principal" label="负责人" />
                            <el-table-column label="已上传文件" width="240">
                                <template #default="scope">
                                    <el-link type="primary" :href="scope.row.file.link">{{ scope.row.file.name }}</el-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="time" label="上传时间" />
                            <el-table-column prop="state" label="文件状态">
                                <template #default="scope">
                                    <el-tag v-if="scope.row.state=='uploaded'" type="success">已上传</el-tag>
                                    <el-tag v-else-if="scope.row.state=='deleted'" type="info">已删除</el-tag>
                                    <el-tag v-else type="info">未知</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template #default>
                                    <el-button type="text" @click="deleteFile">删除文件</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import FilterBar from '../../../components/FilterBar.vue'
import { Upload } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getGradeMajor } from '@/common/request';
import { resParse } from '@/common/methods';

export default {
    name: 'FileManage',
    components: {
        FilterBar
    },
    data () {
        return {
            showFilter: false,
            gradeMajorList: [],
            curFilter: {},
            uploadForm: {
                grade: '',
                major: ''
            },
            uploadGradeList: [],
            uploadMajorList: [],
            fileTable: [
                {
                    grade: 2000,
                    major: '计算机',
                    term: '200001',
                    principal: '你的名字',
                    file: {
                        name: '202002 18级计算机成绩.excel',
                        link: 'https://baidu.com'
                    },
                    time: '2000-01-01 11:11',
                    state: 'uploaded'
                },
                {
                    grade: 2000,
                    major: '计算机',
                    term: '200001',
                    principal: '你的名字',
                    file: {
                        name: '202002 18级计算机成绩.excel',
                        link: 'https://baidu.com'
                    },
                    time: '2000-01-01 11:11',
                    state: 'deleted'
                }
            ],
            Upload
        }
    },
    computed: {
        uploadBtnDisabled: function() {
            return (this.uploadForm.grade==='' || this.uploadForm.major==='')
        },
        uploadGradeDisabled: function() {
            return this.uploadForm.major===''
        }
    },
    methods: {
        filter(data) {
            console.log('file filter', data);
            this.curFilter = data;
        },
        async submitUpload(formRef, fileRef) {
            await formRef.validate();
            console.log('submitUpload', this.uploadForm);
            fileRef.submit();
        },
        deleteFile() {
            ElMessageBox.confirm(
                '是否删除文件，删除后系统中与该文件相关的数据将全部删除？',
                {
                    title: '删除文件',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'info',
                }
            )
                .then(() => {
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '删除失败',
                    })
                })
        },
        handelUploadMajorSelect(value) {
            this.uploadForm.grade = '';
            const gradeSet = new Set();
            this.gradeMajorList.forEach(element => {
                if(element.majorName === value)
                    gradeSet.add(element.grade);
            });
            this.uploadGradeList = Array.from(gradeSet);
        }
    },
    async mounted() {
        // 筛选数据处理
        const gradeMajorRes = await getGradeMajor({});
        this.gradeMajorList = resParse('获取专业列表', gradeMajorRes);
        // 上传文件选项
        const majorSet = new Set();
        this.gradeMajorList.forEach(element => {
            majorSet.add(element.majorName);
        });
        this.uploadMajorList = Array.from(majorSet);
        this.showFilter = true;
    }
}
</script>
<style lang='scss' scoped>
.FileManage {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.main_container {
    padding: 16px 32px;
    box-sizing: border-box;
}

.row-1 {
    .uploadForm {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
        padding: 0 16px;
        box-sizing: border-box;

        .upload {
            display: flex;
            align-items: center;

            .submit {
                margin-left: 48px;
            }
        }
    }

    .tip {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #ababab;
    }
}

.row-2 {
    margin-top: 32px;
    
    .topLine {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .table {
        margin-top: 16px;
    }
}

</style>