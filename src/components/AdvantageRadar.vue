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
            <div id="advantageChart"></div>
        </div>
    </div>
</template>

<script>

import { Radar } from '@antv/g2plot';

const scoreList = {
    'id1': { id: 1, name: '高等数学', score: 75 },
    'id2': { id: 2, name: '软件工程', score: 88 },
    'id3': { id: 3, name: '基础电路与电子学基础电路与电子学（重修）', score: 62 },
}

export default {
    name: 'AdvantageRadar',
    components: {},
    props: [
        'type',
        'major',
        'grade',
        'term',
        'class'
    ],
    data () {
        return {
            subjects: [
                {
                    id: 1,
                    name: '高等数学'
                },
                {
                    id: 2,
                    name: '软件工程' 
                },
                {
                    id: 3,
                    name: '基础电路与电子学基础电路与电子学（重修）'
                }
            ]
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
            const data = [];
            this.advantageRadarPlot = new Radar('advantageChart', {
                data: data,
                xField: 'name',
                yField: 'score',
                meta: {
                    name: {
                        formatter: (value) => {
                            console.log(value);
                            // value为一个字符串
                            // 每5个字符添加一个 \n
                            // return添加完成的字符串
                            return '添加完成字符串';
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
                console.log('id', selectedSubject[i]);
                console.log('update add', scoreList['id'+selectedSubject[i]]);
                newData.push(scoreList['id'+selectedSubject[i]]);
            }
            this.advantageRadarPlot.update({
                data: newData
            })
        }
    },
    mounted() {
        // 根据传入参数请求全部学科成绩
        // get scoreList
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