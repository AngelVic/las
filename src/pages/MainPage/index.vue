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
                    <el-button type="text" @click="toWarning">
                        <el-icon class="notice-icon"><Tickets /></el-icon>
                    </el-button>
                </div>
                <div class="user">
                    <el-icon class="user-icon"><user-filled /></el-icon>
                    <span class="userName">{{username}}</span>
                </div>
                <div class="quit">
                    <el-button class="quit-btn" type="text" @click="handelQuitClick">
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
                    @select="navSelect"
                    :default-active="menuActive"
                >
                    <el-sub-menu index="Score">
                        <template #title>
                            <el-icon><Stopwatch /></el-icon>
                            <span>成绩分析</span>
                        </template>
                        <el-menu-item index="GradeScore">年级成绩</el-menu-item>
                        <el-menu-item index="ClassScore">班级成绩</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="FileManage">
                        <el-icon><Edit /></el-icon>
                        <span>文件管理</span>
                    </el-menu-item>
                    <el-menu-item index="StudentInfo">
                        <el-icon><Document /></el-icon>
                        <span>学生信息</span>
                    </el-menu-item>
                    <el-menu-item index="AccountManage">
                        <el-icon><User /></el-icon>
                        <span>账号管理</span>
                    </el-menu-item>
                    <el-sub-menu index="Admin">
                        <template #title>
                            <el-icon><UserFilled /></el-icon>
                            <span>管理员</span>
                        </template>
                        <el-menu-item index="AdminInfo">负责人信息</el-menu-item>
                        <el-menu-item index="GradeCompare">年级成绩对比</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
            <div class="layout-content">
                <router-view class="router-view" />
            </div>
        </div>
    </div>
</template>

<script>

import { Stopwatch, Edit, Document, User, UserFilled, Tickets } from '@element-plus/icons-vue'
import router from '@/router';
import { ElMessage } from 'element-plus';

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
            menuActive: '',
            username: '-',
        }
    },
    methods: {
        navSelect(value) {
            console.log('nav to', value);
            this.menuActive = value;
            router.push('/main/'+value);
        },
        toWarning(){
            router.push('/main');
            this.menuActive = '';
        },
        handelQuitClick() {
            router.push('/');
            localStorage.clear();
            ElMessage.success('退出成功')
        }
    },
    mounted() {
        this.username = localStorage.getItem('username');
        console.log(router.options.history.location);
        const path = router.options.history.location.split('/');
        console.log(path[path.length-1]);
        this.menuActive = path[path.length-1];
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
                transition: 0.3s;

                .quit-icon {
                    width: 18px;
                }
            }
            .quit-btn:hover {
                opacity: 0.8;
            }
        }
    }
}

.layout-main {
    display: flex;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;

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
        background-color: #f0f2f5;
        overflow-y: scroll;
    }
}

</style>