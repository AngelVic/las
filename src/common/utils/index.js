export const getTermByGrade = (term) => {
    const termList = [];
    for(let i=0; i<4; i++) {
        termList.push(parseInt(`${term+i}01`));
        termList.push(parseInt(`${term+i}02`));
    }
    return termList;
}

export const parsePieData = (source, between) => {
    const pieData = [];
    let i=1;
    let index = 0;
    while(i<4) {
        pieData.push({
            type: `${i}≤x<${i+between}`,
            value: source[index]
        })
        i = i+between;
        index = index+1;
    }
    return pieData;
}

export const parseGradeMajorData = (source) => {
    const resData = new Map();
    source.forEach(t => {
        if(resData.has(t.grade)) {
            const oldData = resData.get(t.grade);
            oldData.children.push({
                value: t.id,
                label: t.majorName
            });
            resData.set(t.grade, {
                ...oldData
            })
        }
        else {
            resData.set(t.grade, {
                value: t.grade,
                label: `${t.grade}级`,
                children: [
                    {
                        value: t.id,
                        label: t.majorName
                    }
                ]
            })
        }
    });
    return Array.from(resData.values());
}