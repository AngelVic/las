<!-- 账号管理 -->
<template>
    <div class='AccountManage'>
        <div class="contentCard">
            <span class="cardTitle">修改密码</span>
            <div class="changeForm">
                <el-form
                    :model="changeForm"
                    style="max-width: 460px"
                    label-position="Right"
                    label-width="auto"
                    :rules="rules"
                    ref="changeFormRef"
                >
                    <el-form-item
                        :error="changeFormError.oldPass"
                        label="旧密码"
                        prop="oldPass"
                    >
                        <el-input type="password" v-model="changeForm.oldPass" placeholder="6 - 16位密码，区分大小写"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="新密码"
                        prop="newPass"
                    >
                        <el-input type="password" v-model="changeForm.newPass" placeholder="6 - 16位密码，区分大小写"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="确认新密码"
                        prop="confirmPass"
                    >
                        <el-input type="password" v-model="changeForm.confirmPass" placeholder="6 - 16位密码，区分大小写"></el-input>
                    </el-form-item>
                    <el-form-item class="btnContainer">
                        <el-button type="primary" @click="confirmChange(this.$refs.changeFormRef)">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { alterAccount } from '@/common/request';
// import { resParse } from '@/common/methods';
import { ElMessage } from 'element-plus';

export default {
    name: 'AccountManage',
    components: {},
    data () {
        return {
            changeForm: {
                oldPass: '',
                newPass: '',
                confirmPass: ''
            },
            rules: {
                oldPass: [
                    {
                        required: true,
                        message: '请输入旧密码',
                        trigger: 'blur',
                    }
                ],
                newPass: [
                    {
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur',
                    }
                ],
                confirmPass: [
                    {
                        required: true,
                        message: '请再次输入新密码',
                        trigger: 'blur',
                    },
                    { validator: this.validatePassConfirm, trigger: 'blur' }
                ]
            },
            changeFormError: {
                oldPass: '',
            },
        }
    },
    methods: {
        async confirmChange(formRef) {
            this.changeFormError.oldPass = '';
            await formRef.validate();
            const alterRes = await alterAccount({
                oldPwd: this.changeForm.oldPass,
                newPwd: this.changeForm.newPass
            });
            if(alterRes.code === 200) {
                ElMessage.success('修改成功');
                this.changeForm = {
                    oldPass: '',
                    newPass: '',
                    confirmPass: ''
                }
            }
            else {
                this.changeFormError.oldPass = alterRes.msg
            }
        },
        validatePassConfirm(rule , value , callback ) {
            if (value !== this.changeForm.newPass) {
                callback(new Error("两次输入密码不一致"))
            } else {
                callback()
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.AccountManage {
    width: 100%;
    justify-content: center;
    padding: 32px;
    box-sizing: border-box;
}

.contentCard {
    display: flex;
    flex-direction: column;

    .changeForm {
        display: flex;
        justify-content: center;
        margin-top: 16px;
    }
}
</style>