<!-- 绩点分布饼状图 -->
<template>
    <div class='contentCard distribution'>
        <span class="cardTitle">成绩分布</span>
        <div class="secondLine">
            <span class="secTitle">{{typeText[type]}}学生绩点分布</span>
            <div class="between">
                <span class="label">区间：</span>
                <el-select
                    v-model="spaceBetween"
                    class="betweenSelect"
                    placeholder="请选择间距"
                    size="small"
                    @change="betweenChange"
                >
                    <el-option
                        v-for="item in betweens"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="chartContainer">
            <div id="distributionChart"></div>
        </div>
    </div>
</template>

<script>

import { Pie } from '@antv/g2plot';

export default {
    name: 'GpaDistribution',
    components: {},
    props: [
        'type',
        // 'major',
        // 'grade',
        // 'term',
        // 'class',
        'value'
    ],
    data () {
        return {
            typeText: {
                class: '班级',
                grade: '年级'
            },
            columnPlot: null,
            spaceBetween: 1,
            betweens: [0.5, 0.8, 1]
        }
    },
    methods: {
        drawScoreDistribution() {
            // 绘制成绩分布饼图
            this.columnPlot = new Pie('distributionChart', {
                data: this.value,
                angleField: 'value',
                colorField: 'type',
                radius: 0.9,
                label: {
                    content: ({type, value}) => {
                        return type + ', ' + value;
                    }
                },
            });

            this.columnPlot.render();
        },
        betweenChange(val) {
            console.log('between', val);
            // between05Data
            // this.columnPlot.update({
            //     data: between05Data
            // })
            this.$emit('betweenChange', val);
        }
    },
    watch: {
        value: function () {
            console.log('update value', this.value);
            this.columnPlot.update({
                data: this.value
            })
        }
    },
    mounted() {
        this.drawScoreDistribution();
    }
}
</script>
<style lang='scss' scoped>
.distribution {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 360px;

    .secondLine {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .between {
            display: flex;
            align-items: center;
            margin-right: 8px;

            .label {
                margin-right: 4px;
                font-size: 12px;
            }
        }
        .betweenSelect {
            width: 56px;
        }
    }

    .secTitle {
        margin-top: 8px;
        margin-left: 8px;
    }

    .chartContainer {
        width: 100%;
        height: 100%;
        margin-top: 16px;
        margin-left: 8px;
        
        #distributionChart {
            display: flex;
            width: 100%;
            height: 100%;
        }
    }
}
</style>