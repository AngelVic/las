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
    let i=0;
    let index = 0;
    while(i<4) {
        const plusI = (i*10+between*10)/10;
        pieData.push({
            type: `${i}≤x<${plusI}`,
            value: source[index]
        })
        i = plusI;
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

export const StrIsNumber = (str) => {
    const reg = /^[0-9]+.?[0-9]*$/;
    return reg.test(str);
}

export const completeStudentId = (id) => {
    let idStr = id.toString();
    if(idStr.length === 8) {
        return `0${idStr}`
    }
    return idStr;
}