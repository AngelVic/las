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
                >
                    <el-form-item
                        label="旧密码"
                        :rules="[
                            {
                                required: true,
                                message: '请输入旧密码',
                                trigger: 'blur',
                            }
                        ]"
                    >
                        <el-input v-model="changeForm.oldPass" placeholder="6 - 16位密码，区分大小写"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="新密码"
                        :rules="[
                            {
                                required: true,
                                message: '请输入新密码',
                                trigger: 'blur',
                            }
                        ]"
                    >
                        <el-input v-model="changeForm.newPass" placeholder="6 - 16位密码，区分大小写"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="确认新密码"
                        :rules="[
                            {
                                required: true,
                                message: '请再次输入新密码',
                                trigger: 'blur',
                            }
                        ]"
                    >
                        <el-input v-model="changeForm.confirmPass" placeholder="6 - 16位密码，区分大小写"></el-input>
                    </el-form-item>
                    <el-form-item class="btnContainer">
                        <el-button type="primary" @click="confirmChange">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AccountManage',
    components: {},
    data () {
        return {
            changeForm: {
                oldPadd: '',
                newPass: '',
                confirmPass: ''
            }
        }
    },
    methods: {
        confirmChange() {

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