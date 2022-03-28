<!-- 首页 -->
<template>
    <div class='firstPage'>
        <div class="leftIntro">
            <!-- <img class="introTitle" src="../../assets/img/intro-title.png" /> -->
            <img class="introImg" src="../../assets/img/intro.png" />
        </div>
        <div class="right">
            <div class="loginBlock">
                <div class="login-title">
                    <span>登录</span>
                </div>
                <div class="loginForm">
                    <el-form :model="form">
                        <el-form-item>
                            <el-input
                                v-model="form.id"
                                placeholder="账号"
                                :prefix-icon="User"
                                size="large"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input
                                v-model="form.password"
                                placeholder="密码"
                                type="password"
                                :prefix-icon="Lock"
                                size="large"
                            ></el-input>
                        </el-form-item>
                        <div class="forget">
                            <el-button class="forget-btn" type="text">忘记密码？</el-button>
                        </div>
                        <el-form-item>
                            <el-button
                                class="login-btn"
                                type="primary"
                                @click="onSubmit"
                                size="large"
                            >登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { User, Lock } from '@element-plus/icons-vue'
import { createAccount } from '../../common/request'

export default {  
    name: 'FirstPage',
    components: {},
    data () {
        return {
            form: {
                id: '',
                password: ''
            },
            User,
            Lock
        }
    },
    methods: {
        async onSubmit() {
            console.log('submit');
        }
    }
}
</script>
<style lang='scss' scoped>
.firstPage {
    display: flex;
    width: 100%;
    height: 100%;

    .leftIntro {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60%;
        max-width: 720px;
        height: 100%;
        background-color: #3267ff;

        .introTitle {
            position: absolute;
            z-index: 1;
            top: 35%;
        }
        .introImg {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .right {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 100%;

        .loginBlock {
            display: flex;
            flex-direction: column;
            width: 55%;

            .login-title {
                display: flex;
                width: 100%;
                span {
                    display: flex;
                    width: 72px;
                    padding-left: 4px;
                    font-size: 24px;
                    font-weight: 600;
                    background: linear-gradient(#fff 0 60%, #81d3f8 60%);
                }
            }
            .loginForm {
                margin-top: 5%;
                
                .forget{
                    display: flex;
                    justify-content: flex-end;
                    width: 100%;
                    
                    .forget-btn {
                        color: #aaaaaa;
                    }
                }

                .login-btn {
                    width: 100%;
                }
            }
        }
    }
}
</style>