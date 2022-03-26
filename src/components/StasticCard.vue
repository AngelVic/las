<!-- 数据统计卡片 -->
<template>
    <div class='contentCard StasticCard'>
        <div class="left">
            <div class="label">
                <span>{{ label }}</span>
                <el-button class="ruleBtn" type="text" @click="clickOpen(this.type)">{{ rule }}</el-button>
            </div>
            <div class="data">
                <span>{{ data }}</span>
            </div>
            <div class="compare">
                <div class="iconContainer"  v-if="type!=='totalSize'">
                    <img class="icon" src="../assets/img/rise.svg" />
                </div>
                <div class="rate"  v-if="type!=='totalSize'">
                    <span>{{ rate }}</span>
                </div>
                <div class="description">
                    <span>{{ description }}</span>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="imgContainer" :style="{ backgroundColor: imgList[type].color }">
                <img class="img" :src="imgList[type].src" />
            </div>
        </div>
    </div>
</template>

<script>

// 脚本文件
const imgList = {
    totalSize: {
        src: '/user.svg',
        color: '#dc7c38'
    },
    failSize: {
        src: '/failure.svg',
        color: '#f5444f'
    },
    excellentRate: {
        src: '/medal.svg',
        color: '#27b488'
    },
    passRate: {
        src: '/graph.svg',
        color: '#0f8fd1'
    }
}

export default {
    name: 'StasticCard',
    props: [
        'label',
        'data',
        'rate',
        'type',
        'description',
        'rule'
    ],
    components: {},
    data () {
        return {
            imgList
        }
    },
    methods: {
        clickOpen(type) {
            if(type === 'excellentRate') {
                this.$emit('onSet', 'excellent');
            }
            else if(type === 'passRate') {
                this.$emit('onSet', 'pass');
            }
        }
    }
}
</script>

<!-- 样式文件 -->
<style lang='scss' scoped>
.StasticCard {
    display: flex;
    width: 100%;
    height: 100%;
}

.left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 85%;
    height: 100%;

    .label {
        display: flex;
        align-items: center;
        color: #6b6b6b;
        font-size: 16px;
        line-height: 16px;

        .ruleBtn {
            margin-left: 4px;
            font-size: 12px;
            line-height: 12px;
            text-decoration: underline;
        }
    }

    .data {
        margin-left: 4%;
        color: #555555;
        font-size: 24px;
    }

    .compare {
        display: flex;
        align-items: center;
        font-size: 14px;

        .icon {
            width: 20px;
        }

        .rate {
            margin-left: 2px;
            color: #67c23a;
        }

        .description {
            margin-left: 12px;
            color: #6b6b6b;
            font-size: 12px;
        }
    }
}

.right {
    display: flex;
    justify-content: flex-end;
    width: auto;

    .imgContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        top: 8px;
        height: 48px;
        width: 48px;
        background-color: #0f83d1;
        border-radius: 50%;

        .img {
            width: 20px;
        }
    }
}
</style>