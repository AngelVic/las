<!-- 绩点分布饼状图 -->
<template>
    <div class='contentCard distribution'>
        <span class="cardTitle">成绩分布</span>
        <span class="secTitle">年级学生绩点分布</span>
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
    data () {
        return {

        }
    },
    methods: {
        drawScoreDistribution() {
            // 绘制成绩分布饼图
            const columnPlot = new Pie('distributionChart', {
                data: [
                    { type: '0≤x<1', value: 2 },
                    { type: '1≤x<2', value: 32 },
                    { type: '2≤x<3', value: 310 },
                    { type: '3≤x<4', value: 60 }
                ],
                angleField: 'value',
                colorField: 'type',
                radius: 0.9,
                label: {
                    content: ({type, value}) => {
                        return type + ', ' + value;
                    }
                },
            });

            columnPlot.render();
        },
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