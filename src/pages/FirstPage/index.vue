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
                    <el-form :model="form" :rules="formRules" ref="loginFormRef">
                        <el-form-item prop="id" :error="LoginFormError.id">
                            <el-input
                                v-model="form.id"
                                placeholder="账号"
                                :prefix-icon="User"
                                size="large"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="password" :error="LoginFormError.password">
                            <el-input
                                v-model="form.password"
                                placeholder="密码"
                                type="password"
                                :prefix-icon="Lock"
                                size="large"
                            ></el-input>
                        </el-form-item>
                        <div class="forget">
                            <el-button class="forget-btn" type="text" @click="handelForgetClick">忘记密码？</el-button>
                        </div>
                        <el-form-item>
                            <el-button
                                class="login-btn"
                                type="primary"
                                @click="onLoginSubmit(this.$refs.loginFormRef)"
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
import { ElMessage } from 'element-plus'
import router from '@/router';
import { getUserName, login } from '@/common/request';
import { resParse } from '@/common/methods';

export default {  
    name: 'FirstPage',
    components: {},
    data () {
        return {
            form: {
                id: '',
                password: ''
            },
            formRules: {
                id: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
            LoginFormError: {
                id: '',
                password: '',
            },
            User,
            Lock
        }
    },
    methods: {
        async onLoginSubmit(formRef) {
            await formRef.validate();
            console.log('submit login', this.form);
            // valid data
            let res = await login(this.form);
            this.dealLogin(res);
        },
        async dealLogin(data) {
            if(data.code === 200) {
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
                // localStorage.setItem('username', data.data.username);
                const usernameRes = await getUserName({});
                const username = resParse('获取辅导员信息', usernameRes);
                if(username !== null) {
                    localStorage.setItem('account', this.form.id);
                    localStorage.setItem('username', username);
                    router.push('/main');
                }
            }
            else {
                this.LoginFormError.password = data.msg
            }
        },
        handelForgetClick() {
            ElMessage.error('请您联系学院管理员重置密码，感谢~');
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
        max-width: 800px;
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