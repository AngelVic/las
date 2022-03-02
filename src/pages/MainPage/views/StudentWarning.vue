<!-- 学生成绩预警 -->
<template>
    <div class='studentWarning'>
        <div class="contentCard warningCard">
            <div class="topLine">
                <div class="left">
                    <span class="cardTitle">学生成绩预警</span>
                    <span class="unReadSize">您有1条未读消息</span>
                </div>
                <div class="right">
                    <el-button type="primary">全部已读</el-button>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="warningList">
                <div class="warningBlock warning-readed" v-for="warn in warningListReaded" :key="warn.id">
                    <div class="left">
                        <span class="time">{{ warn.time }}</span>
                        <span class="title">学生成绩预警</span>
                        <p class="brief">{{ warn.brief }}</p>
                    </div>
                    <div class="right">
                        <el-button class="detailBtn" type="text" @click="showWarning">查看详情</el-button>
                    </div>
                </div>
                <div class="warningBlock warning-unread" v-for="warn in warningListUnread" :key="warn.id">
                    <div class="left">
                        <span class="time">{{ warn.time }}</span>
                        <span class="title">学生成绩预警</span>
                        <p class="brief">{{ warn.brief }}</p>
                    </div>
                    <div class="right">
                        <el-button class="detailBtn" type="text" @click="showWarning">查看详情</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { ElMessageBox } from 'element-plus'

export default {
    name: 'StudentWarning',
    components: {},
    data () {
        return {
            warningListReaded: [
                {
                    id: 1,
                    time: '2000-00-00 11:11',
                    brief: '亲爱的xxx辅导员您好：以下学生在202001学期挂科科目已超过2门，请您及时关注：031802101 嘻嘻嘻 2门；031802111 喵喵 3门；371628392 哈哈哈 5门；'
                },
                {
                    id: 2,
                    time: '2000-00-00 11:12',
                    brief: '亲爱的xxx辅导员您好：以下学生在202001学期挂科科目已超过2门，请您及时关注：031802101 嘻嘻嘻 2门；031802111 喵喵 3门；371628392 哈哈哈 5门；'
                }
            ],
            warningListUnread: [
                {
                    id: 3,
                    time: '2000-00-00 11:13',
                    brief: '亲爱的xxx辅导员您好：以下学生在202001学期挂科科目已超过2门，请您及时关注：031802101 嘻嘻嘻 2门；031802111 喵喵 3门；371628392 哈哈哈 5门；'
                },
                {
                    id: 4,
                    time: '2000-00-00 11:14',
                    brief: '亲爱的xxx辅导员您好：以下学生在202001学期挂科科目已超过2门，请您及时关注：031802101 嘻嘻嘻 2门；031802111 喵喵 3门；371628392 哈哈哈 5门；'
                },
                {
                    id: 5,
                    time: '2000-00-00 11:14',
                    brief: '亲爱的xxx辅导员您好：以下学生在202001学期挂科科目已超过2门，请您及时关注：031802101 嘻嘻嘻 2门；031802111 喵喵 3门；371628392 哈哈哈 5门；'
                }
            ],
        }
    },
    methods: {
        showWarning() {
            ElMessageBox.alert(
                `
                <p>亲爱的xxx辅导员您好：</p>
                <p>以下学生宿舍在202001学期挂科人数过多，请您及时关注：</p>
                <p>34#123：</p>
                <p>&emsp;&emsp;031802101 嘻嘻嘻；</p>
                <p>&emsp;&emsp;031802111喵喵喵；</p>
                <p>34#222：</p>
                <p>&emsp;&emsp;132453625 哈哈；</p>
                <p>&emsp;&emsp;212134532 嘻嘻；</p>
                `,
                '学生成绩预警',
                {
                    confirmButtonText: '关闭',
                    dangerouslyUseHTMLString: true
                }
            )
        }
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
            height: 180px;
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