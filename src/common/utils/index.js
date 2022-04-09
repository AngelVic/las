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