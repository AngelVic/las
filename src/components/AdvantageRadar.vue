<!-- 优势雷达图 -->
<template>
    <div class="contentCard advantage">
        <div class="topLine">
            <span class="cardTitle">科目优势分析雷达图</span>
            <el-select
                class="subjectSelect"
                v-model="advantageSubject"
                multiple
                collapse-tags
                placeholder="选择显示的科目"
                @change="changeShowSubject"
            >
                <el-option
                    v-for="subject in subjects"
                    :key="subject.id"
                    :label="subject.name"
                    :value="subject.id"
                >
                </el-option>
            </el-select>
        </div>
        <div class="chartContainer">
            <div :id="`${position}AdvantageChart`" :style="{height: '280px'}"></div>
        </div>
    </div>
</template>

<script>

import { Radar } from '@antv/g2plot';

export default {
    name: 'AdvantageRadar',
    components: {},
    props: [
        'type',
        'position',
        'subjects',
        'value'
    ],
    data () {
        return {
            advantageSubject: [],
            advantageRadarPlot: null
        }
    },
    methods: {
        changeShowSubject(value) {
            // 切换展示学科
            console.log(value);
            this.updateAdvantageRadar(value);
        },
        drawAdvantageRadar() {
            // 绘制学科优势雷达图
            const data = this.value;
            this.advantageRadarPlot = new Radar(`${this.position}AdvantageChart`, {
                data: data,
                xField: 'name',
                yField: 'score',
                meta: {
                    name: {
                        formatter: (value) => {
                            if(value == 0) {
                                return 0;
                            }
                            let subjectName = value.replace(/.{5}/g,'$&\n');
                            return subjectName;
                        }
                    }
                }
            });
            this.advantageRadarPlot.render();
        },
        updateAdvantageRadar(selectedSubject) {
            console.log('update with', selectedSubject);
            const newData = [];
            for(let i=0; i<selectedSubject.length; i++) {
                newData.push(this.value[selectedSubject[i]]);
            }
            this.advantageRadarPlot.update({
                data: newData
            })
        }
    },
    mounted() {
        // 根据传入参数请求全部学科成绩
        // get scoreList
        console.log('Advantage Radar mounted');
        this.drawAdvantageRadar();
    }
}
</script>
<style lang='scss' scoped>
.advantage {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 360px;

    .topLine {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .subjectSelect {
            width: 160px;
        }
    }

    .chartContainer {
        width: 100%;
        height: 100%;
        margin-top: 16px;
        margin-left: 8px;
        
        #advantageChart {
            display: flex;
            width: 100%;
            height: 100%;
        }
    }
}
</style>