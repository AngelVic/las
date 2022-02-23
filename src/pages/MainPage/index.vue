<!-- 管理页面 -->
<template>
    <div class='mainPage'>
        <div class="layout-top">
            <div class="left">
                <img class="logo" src="../../assets/img/logo.png" />
                <span class="title">学情分析系统</span>
            </div>
            <div class="right">
                <div class="notice">
                    <el-button type="text">
                        <el-icon class="notice-icon"><Tickets /></el-icon>
                    </el-button>
                </div>
                <div class="user">
                    <el-icon class="user-icon"><user-filled /></el-icon>
                    <span class="userName">用户名</span>
                </div>
                <div class="quit">
                    <el-button class="quit-btn" type="text">
                        <img class="quit-icon" src="../../assets/img/quit.svg" />
                    </el-button>
                </div>
            </div>
        </div>
        <div class="layout-main">
            <div class="nav">
                <el-menu
                    class="nav-menu"
                    active-text-color="#badeff"
                    background-color="#001529"
                    text-color="#b3b9bf"
                    default-active="gradeScore"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <el-sub-menu index="score">
                        <template #title>
                            <el-icon><Stopwatch /></el-icon>
                            <span>成绩分析</span>
                        </template>
                        <el-menu-item index="gradeScore">年级成绩</el-menu-item>
                        <el-menu-item index="classScore">班级成绩</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="file">
                        <el-icon><Edit /></el-icon>
                        <span>文件管理</span>
                    </el-menu-item>
                    <el-menu-item index="student">
                        <el-icon><Document /></el-icon>
                        <span>学生信息</span>
                    </el-menu-item>
                    <el-menu-item index="account">
                        <el-icon><User /></el-icon>
                        <span>账号管理</span>
                    </el-menu-item>
                    <el-sub-menu index="admin">
                        <template #title>
                            <el-icon><UserFilled /></el-icon>
                            <span>管理员</span>
                        </template>
                        <el-menu-item index="adminInfo">负责人信息</el-menu-item>
                        <el-menu-item index="gradeCompare">年级成绩对比</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
            <div class="layout-content">
            </div>
        </div>
    </div>
</template>

<script>

import { Stopwatch, Edit, Document, User, UserFilled, Tickets } from '@element-plus/icons-vue'

export default {
    name: 'MainPage',
    components: {
        Stopwatch,
        Edit,
        Document,
        User,
        UserFilled,
        Tickets
    },
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>
<style lang='scss' scoped>
.mainPage {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.layout-top {
    display: flex;
    justify-content: space-between;
    height: 64px;
    padding: 0 32px;
    box-sizing: border-box;
    background-color: #00284d;

    .left {
        display: flex;
        align-items: center;
        height: 100%;

        .logo {
            height:60%;
        }

        .title {
            margin-left: 16px;
            font-size: 21px;
            font-weight: 300;
            color: #fff;
            letter-spacing: 2px;
            cursor: default;
        }
    }

    .right {
        display: flex;
        align-items: center;
        
        .notice {
            margin-right: 16px;
            .notice-icon {
                font-size: 24px;
                color: #fff;
            }
        }

        .user {
            display: flex;
            align-items: center;
            margin-right: 16px;
            font-size: 18px;
            color: #fff;
            font-weight: 400;
            letter-spacing: 1px;
            line-height: 16px;

            .user-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
                margin-right: 8px;
                font-size: 16px;
                color: #fff;
                background-color: #1890ff;
            }
        }

        .quit {
            .quit-btn {
                display: flex;
                justify-content: center;
                align-items: center;

                .quit-icon {
                    width: 18px;
                }
            }
        }
    }
}

.layout-main {
    display: flex;
    height: 100%;

    .nav {
        width: 260px;
        height: 100%;
        background-color: #001529;

        .nav-menu {
            border: none;

            .is-active {
                background-color: #1890ff;
            }
        }
    }

    .layout-content {
        display: flex;
        flex: 1;
        height: 100%;
        background-color: #666666;
    }
}

</style>