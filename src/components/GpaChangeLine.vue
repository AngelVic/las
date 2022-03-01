<!-- 绩点变化折线图 -->
<template>
    <div class="contentCard changeCard">
        <span class="cardTitle">绩点变化曲线</span>
        <div class="chartContainer">
            <div id="gpaLine" ref="gpaLineContainer"></div>
        </div>
    </div>
</template>

<script>

import { Line } from '@antv/g2plot';

export default {
    name: 'GpaChangeLine',
    components: {},
    data () {
        return {
            gpaChange: [
                {
                    term: '202001',
                    gpa: 2.5
                },
                {
                    term: '202002',
                    gpa: 2.4
                },
                {
                    term: '202101',
                    gpa: 1.9
                },
                {
                    term: '202102',
                    gpa: 2.8
                },
                {
                    term: '202201',
                    gpa: 3
                },
                {
                    term: '202202',
                    gpa: 2.8
                },
            ]
        }
    },
    methods: {
        drawCompareLine() {
            const line = new Line('gpaLine', {
                data: this.gpaChange,
                xField: 'term',
                yField: 'gpa',
                point: {
                    size: 3,
                    shape: 'diamond',
                    style: {
                        fill: 'white',
                        stroke: '#000',
                        lineWidth: 2,
                    },
                },
            });

            line.render();
        }
    },
    mounted() {
        this.drawCompareLine();
    },
}
</script>
<style lang='scss' scoped>
.changeCard {
    width: 100%;
    height: 360px;

    .chartContainer {
        height: 100%;
        width: 100%;
        padding: 32px 16px;
        box-sizing: border-box;

        #gpaLine {
            display: flex;
            justify-content: flex-start;
            width: 100%;
            height: 100%;
        }
    }
}
</style>