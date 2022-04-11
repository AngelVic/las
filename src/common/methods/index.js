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

export const subjectsParse = (data) => {
    return data.map(element => {
        return {
            id: element.courseId,
            name: element.courseName,
        }
    })
}

export const averageScoreParse = (data) => {
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

export const classGradeRateParse = (data) => {
    return [
        {
            type: '班级',
            xData: '优秀率',
            yData: data.classAB,
        },
        {
            type: '班级',
            xData: '及格率',
            yData: data.classPass,
        },
        {
            type: '年级',
            xData: '优秀率',
            yData: data.gradeAB,
        },
        {
            type: '年级',
            xData: '及格率',
            yData: data.gradePass,
        },
    ]
}

export const classScoreListParse = (data, courseList) => {
    return data.map(t => {
        const scoreList = {};
        t.scoreList.forEach(item => {
            const subject = courseList.find(course => course.id===item.courseId);
            scoreList[item.courseId] = {
                id: item.courseId,
                name: subject.name,
                state: item.makeUp===0?'normal':'failed',
                score: item.score,
                secScore: item.makeUp
            }
        })
        return {
            studentId: t.studentId,
            name: t.name,
            gpa: t.gradePoint,
            scores: scoreList
        }
    })
}

export const studentListParse = (data, grade, major, className, classId) => {
    return data.map(element => {
        return {
            studentId: element.studentId,
            name: element.name,
            grade: grade,
            major: major,
            'class': classId,
            className: className,
            HMT: element.isSpecial,
            dormitory: element.building,
            room: element.room
        }
    })
}

export const adminListParse = (data, grade, major) => {
    return data.map(element => {
        const time = Date.parse(element.createTime)
        return {
            id: element.id,
            grade: grade,
            major: major,
            principal: element.name,
            account: element.account,
            time: new Date(time).toLocaleString()
        }
    })
}

export const accountDetailParse = (data) => {
    return {
        account: data.account,
        name: data.name,
        gradeClass: data.gradeList.map(t => {
            return [t.grade, t.id]
        })
    }
}

export const majorListParse = (data) => {
    return data.map(element => {
        return {
            id: element.majorId,
            major: element.majorName,
        }
    })
}

export const subjectListParse = (data) => {
    return data.map(element => {
        return {
            id: element.courseId,
            subject: element.courseName,
        }
    })
}

export const gradeScoreListParse = (data) => {
    return data.map(element => {
        return {
            title: `${element.grade}级`,
            size: element.totalNum,
            gpaExcellent: element.gradeAB,
            average: `${element.average}`,
            failed: element.failNum,
            subjectExcellent: element.subjectAB,
            passed: element.pass
        }
    })
}

export const gradeScoreCompareParse = (data) => {
    const resList = []
    data.forEach(element => {
        resList.push({ year: element.grade, type: '优秀率', value: element.gradeAB });
        resList.push({ year: element.grade, type: '及格率', value: element.pass });
    })
    return resList;
}

export const indicatorParse = (data) => {
    return {
        gradeExcellent: data.gradeAB,
        classExcellent: data.classAB,
        subjectExcellent: data.subjectAB,
        normalPass: data.cutOff,
        specilalPass: data.specialCutoff
    }
}

export const indicatorFormate = (data) => {
    return {
        "classAB": data.classExcellent,
        "cutOff": data.normalPass,
        "gradeAB": data.gradeExcellent,
        "specialCutoff": data.specilalPass,
        "subjectAB": data.subjectExcellent
    }
}

export const studentSuggestionParse = (data) => {
    return data.map(element => {
        return {
            value: element.name,
            id: element.studentId
        }
    })
}

export const studentDetailParse = (data, courseList, classId, major, gpa, score) => {
    const gpaList = [];
    data.gradeList.forEach(item => {
        gpaList.push({
            term: item.term,
            gpa: item.gradePoint
        });
    })
    return {
        studentId: data.studentId,
        name: data.name,
        major: major,
        'classId': classId,
        HMT: data.isSpecial,
        dormitory: data.building,
        room: data.room,
        scoreData: [
            {
                classRank: data.classRank,
                gradeRank: data.gradeRank,
                gpa: gpa,
                scores: score
            }
        ],
        gpaList: gpaList
    }
}

export const classListParse = (data) => {
    return data.map(element => {
        return {
            label: element.name,
            id: element.classId
        }
    })
}