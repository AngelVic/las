<!-- 学生成绩预警 -->
<template>
    <div class='studentWarning' v-loading="pageLoading">
        <div class="contentCard warningCard">
            <div class="topLine">
                <div class="left">
                    <span class="cardTitle">学生成绩预警</span>
                    <span class="unReadSize">您有{{unReadLength}}条未读消息</span>
                </div>
                <div class="right">
                    <el-button type="primary" @click="handelWarningReadedClick">全部已读</el-button>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="warningList">
                <div class="warningBlock warning-readed" v-for="warn in warningListUnread" :key="warn.id">
                    <div class="left">
                        <span class="time">{{ warn.time }}</span>
                        <span class="title">学生成绩预警</span>
                        <p class="brief">{{ warn.brief }}</p>
                    </div>
                    <div class="right">
                        <el-button class="detailBtn" type="text" @click="showWarning(warn.id, warn.detail)">查看详情</el-button>
                    </div>
                </div>
                <div class="warningBlock warning-unread" v-for="warn in warningListReaded" :key="warn.id">
                    <div class="left">
                        <span class="time">{{ warn.time }}</span>
                        <span class="title">学生成绩预警</span>
                        <p class="brief">{{ warn.brief }}</p>
                    </div>
                    <div class="right">
                        <el-button class="detailBtn" type="text" @click="showWarning(warn.id, warn.detail)">查看详情</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { ElMessageBox, ElMessage } from 'element-plus'
import { getWarningList, setAllWarningReaded, setWarningReaded } from '@/common/request'
import { resParse, warningListParse } from '@/common/methods'

export default {
    name: 'StudentWarning',
    components: {},
    data () {
        return {
            warningListReaded: [],
            warningListUnread: [],
            pageLoading:false,
        }
    },
    methods: {
        showWarning(id, detail) {
            ElMessageBox.alert(
                detail,
                '学生成绩预警',
                {
                    confirmButtonText: '关闭',
                    dangerouslyUseHTMLString: true,
                    callback: () => { this.handelWarningReaded(id) },
                }
            )
        },
        async handelWarningReaded(id) {
            const setReadedRes = await setWarningReaded({
                id
            });
            resParse('设置已读', setReadedRes);
            if(setReadedRes.code === 200) {
                this.updateWraningList()
            }
        },
        async handelWarningReadedClick() {
            const setReadedRes = await setAllWarningReaded({});
            resParse('全部已读', setReadedRes);
            if(setReadedRes.code==200) {
                ElMessage({
                    type: 'success',
                    message: '已读成功',
                });
                this.updateWraningList()
            }
        },
        async updateWraningList() {
            this.pageLoading = true;
            const listRes = await getWarningList({
                account: localStorage.getItem('account')
            })
            const listData = resParse('获取预警列表', listRes);
            const parsedListData = warningListParse(listData);
            this.warningListReaded = parsedListData.warningListReaded;
            this.warningListUnread = parsedListData.warningListUnread;
            console.log(this.$data);
            this.pageLoading = false;
        }
    },
    computed: {
        unReadLength() {
            return this.warningListUnread.length;
        }
    },
    mounted() {
        this.updateWraningList();
    }
}
</script>
<style lang='scss' scoped>
.studentWarning {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
}

.warningCard {
    display: flex;
    flex-direction: column;
    width: 100%;

    .topLine {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .left {
            display: flex;
            flex-direction: column;

            .unReadSize {
                margin-top: 2px;
                color: #409eff;
            }
        }
    }

    .warningList {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0 16px;
        box-sizing: border-box;
        overflow-y: auto;

        .warningBlock {
            display: flex;
            justify-content: space-between;
            align-items: center;
            // height: 180px;
            width: 100%;
            margin-bottom: 8px;
            padding: 16px;
            box-sizing: border-box;
            background-color: #fafafa;
            border-radius: 5px;
            
            .left {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 100%;
                width: 100%;

                .time {
                    font-size: 12px;
                    color: #0f0f0f;
                }

                .title {
                    margin-top: 8px;
                    font-size: 16px;
                    font-weight: 600;
                }

                .brief {
                    height: 44px;
                    margin: 0;
                    margin-top: 8px;
                    overflow: hidden;
                }
            }

            .right {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-left: 16px;
            }
        }

        .warning-readed {
            background-color: #f1f8ff;
            .title {
                color: #333333;
            }
        }

        .warning-unread {
            .title {
                color: #aaaaaa;
            }

            .detailBtn {
                color: #aaaaaa;
            }
        }
    }
}
</style>