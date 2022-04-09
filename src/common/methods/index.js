import { ElMessage } from 'element-plus';

export const resParse = (key, res) => {
    switch(res.code) {
        case 200:
            return res.data;
        default:
            ElMessage.error(`${key}错误 错误码:${res.code}`);
            return null;
    }
}

export const gradeClassScoreParse = (data) => {
    return data.map(element => {
        return {
            title: element.classNum===0?'年级':`${element.classNum}班`,
            size: element.totalNum,
            gpaExcellent: element.gradePointAB,
            average: element.average,
            failed: element.failNum,
            subjectExcellent: element.subjectAB,
            passed: element.pass,
        }
    })
}

export const gradeSubjectsParse = (data) => {
    return data.map(element => {
        return {
            id: element.courseId,
            name: element.courseName,
        }
    })
}

export const gradeAverageParse = (data) => {
    const res = {};
    data.forEach(element => {
        res[`${element.courseId}`] = {
            score: element.average,
            name: element.courseName,
            id: element.courseId
        }
    })
    return res;
}