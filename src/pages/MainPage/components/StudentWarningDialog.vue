<!-- 学生成绩预警弹窗 -->
<template>
    <el-dialog
        :model-value="warningVisible"
        title="学生成绩预警"
        @close="close"
        width="360px"
    >
        
    </el-dialog>
</template>

<script>

export default {
    name: 'StudentWarningDialog',
    components: {},
    props: ['warningVisible'],
    data () {
        return {

        }
    },
    methods: {
        close() {
            this.$emit('onClose');
        },
    }
}
</script>
<style lang='scss' scoped>
//@import url();
</style>