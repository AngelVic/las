<!-- 班级成绩 -->
<template>
    <div class='ClassScore'>
        <div class="filter">
            <FilterBar
                @on-filter="filter"
                :gradeFilter="true"
                :termFilter="true"
                :classFilter="true"
            ></FilterBar>
        </div>
        <div class="charts">
            <div class="row-1">
                <div class="column-1">
                    <AdvantageRadar
                        type="class"
                        :major="curFilter.major"
                        :grade="curFilter.grade"
                        :term="curFilter.term"
                        :class="curFilter.class"
                    ></AdvantageRadar>
                </div>
                <div class="column-2">
                    <GpaDistribution></GpaDistribution>
                </div>
                <div class="column-3">
                    <div class="contentCard compare">
                        <span class="cardTitle">年级-班级对比</span>
                        <div class="chartContainer">
                            <div id="compareChart"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-2">
                <div class="column-1"></div>
                <div class="column-2"></div>
            </div>
        </div>
    </div>
</template>

<script>

import FilterBar from '../../../components/FilterBar';
import AdvantageRadar from '../../../components/AdvantageRadar';
import GpaDistribution from '../../../components/GpaDistribution';
import { Column } from '@antv/g2plot';

export default {
    name: 'ClassScore',
    components: {
        FilterBar,
        AdvantageRadar,
        GpaDistribution
    },
    data () {
        return {
            curFilter: {
                major: '',
                grade: '',
                term: '',
                class: ''
            },
        }
    },
    methods: {
        filter(data) {
            console.log('class filter', data);
            this.curFilter = data;
        },
        drawCompare() {
            const data = [
                {
                    type: '班级',
                    xData: '优秀率',
                    yData: 11,
                },
                {
                    type: '班级',
                    xData: '及格率',
                    yData: 92,
                },
                {
                    type: '年级',
                    xData: '优秀率',
                    yData: 13,
                },
                {
                    type: '年级',
                    xData: '及格率',
                    yData: 98,
                },
            ];

            const stackedColumnPlot = new Column('compareChart', {
                data,
                isGroup: true,
                xField: 'xData',
                yField: 'yData',
                seriesField: 'type',
                label: {
                    // 可手动配置 label 数据标签位置
                    position: 'middle', // 'top', 'middle', 'bottom'
                    // 可配置附加的布局方法
                    layout: [
                    // 柱形图数据标签位置自动调整
                    { type: 'interval-adjust-position' },
                    // 数据标签防遮挡
                    { type: 'interval-hide-overlap' },
                    // 数据标签文颜色自动调整
                    { type: 'adjust-color' },
                    ],
                },
            });

            stackedColumnPlot.render();
        }
    },
    mounted() {
        this.drawCompare();
    }
}
</script>
<style lang='scss' scoped>
.ClassScore {
    width: 100%;
}

.charts {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;

    .row-1 {
        display: flex;
        width: 100%;
        height: 320px;

        .column-1,
        .column-2,
        .column-3 {
            display: flex;
            width: 33%;
            padding: 8px;
            box-sizing: border-box;
        }

        .compare {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 360px;

            .chartContainer {
                width: 100%;
                height: 100%;
                margin-top: 16px;
                margin-left: 8px;
                
                #compareChart {
                    display: flex;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>