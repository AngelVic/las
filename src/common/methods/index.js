import { ElMessage } from 'element-plus';

export const resParse = (key, res) => {
    switch(res.code) {
        case 200:
            return res.data;
        case 400:
            ElMessage.error(`暂无数据`);
            return null;
        default:
            ElMessage.error(`${key}错误 错误码:${res.code}`);
            return null;
    }
}

export const gradeClassScoreParse = (data) => {
    function getTitle(num) {
        switch(num) {
            case 0:
                return '无归属';
            case 99:
                return '年级';
            default:
                return `${num}班`;
        }
    }
    return data.map(element => {
        return {
            title: getTitle(element.classNum),
            size: element.totalNum,
            gpaExcellent: ((element.gradePointAB==='NaN'?0:element.gradePointAB)*100).toFixed(2),
            average: ((element.average==='NaN'?0:element.average)*1).toFixed(2),
            failed: element.failNum,
            subjectExcellent: ((element.subjectAB==='NaN'?0:element.subjectAB)*100).toFixed(2),
            passed: ((element.pass==='NaN'?0:element.pass)*100).toFixed(2),
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
            score: parseFloat(element.average.toFixed(2)),
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
            yData: Math.floor(data.classAB * 100) / 100,
        },
        {
            type: '班级',
            xData: '及格率',
            yData: Math.floor(data.classPass * 100) / 100,
        },
        {
            type: '年级',
            xData: '优秀率',
            yData: Math.floor(data.gradeAB * 100) / 100,
        },
        {
            type: '年级',
            xData: '及格率',
            yData: Math.floor(data.gradePass * 100) / 100,
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
                score: parseFloat(item.score),
                secScore: parseFloat(item.makeUp)
            }
        })
        let studentId = t.studentId.toString();
        if(studentId.length === 8) {
            studentId = `0${studentId}`;
        }
        return {
            studentId: studentId,
            name: t.name,
            gpa: t.gradePoint==='NaN'?0:t.gradePoint.toFixed(2),
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
            average: `${element.average.toFixed(2)}`,
            failed: element.failNum,
            subjectExcellent: Math.floor(element.subjectAB * 10000) / 100,
            passed: Math.floor(element.pass * 10000) / 100
        }
    })
}

export const gradeScoreCompareParse = (data) => {
    const resList = []
    data.forEach(element => {
        resList.push({ year: element.grade, type: '优秀率', value: Math.floor(element.subjectAB * 10000) / 100 });
        resList.push({ year: element.grade, type: '及格率', value: Math.floor(element.pass * 10000) / 100 });
    })
    return resList;
}

export const indicatorParse = (data) => {
    return {
        gradeExcellent: data.gradeAB,
        classExcellent: (data.classAB)*100,
        subjectExcellent: data.subjectAB,
        normalPass: data.cutOff,
        specilalPass: data.specialCutoff
    }
}

export const indicatorFormate = (data) => {
    return {
        "classAB": data.classExcellent/100,
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
    let parseGpa = (gpa)=>{
      // 绩点截取
      if(gpa=='NaN'){
          return 'NaN'
      }
      else{
        gpa = (gpa*100).toFixed(0)
        return gpa/100
      }
    



     }
    data.gradeList.forEach(item => {
        gpaList.push({
            term: item.term,
            gpa: parseGpa(item.gradePoint)
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
        gpaList: gpaList.reverse()
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

export const fileListParse = (data) => {
    return data.map(element => {
        const time = Date.parse(element.uploadTime)
        return {
            id: element.fileId,
            grade: element.grade,
            major: element.majorName,
            term: element.term,
            principal: element.admin,
            file: {
                name: element.fileName,
                link: element.fileUrl
            },
            time: new Date(time).toLocaleString(),
            state: element.state
        }
    })
}

export const warningListParse = (data) => {
    return {
        warningListReaded: data.readedList.map(el => {
            const time = Date.parse(el.creatTime);
            let brief='', detail='';
            if(el.warningList.length === 0) {
                return {}
            }
            if('building' in el.warningList[0]) {
                const roomSet = new Set();
                el.warningList.forEach(item => {
                    roomSet.add(`${item.building}#${item.room}`);
                });
                const roomList = Array.from(roomSet);
                brief = `以下学生宿舍在${el.term}学期挂科人数过多，请您及时关注`;
                detail = `
                    <p>亲爱的辅导员您好：</p>
                    <p>以下学生宿舍在${el.term}学期挂科人数过多，请您及时关注：</p>
                    <div style="max-height:50vh;overflow-y:scroll;">
                `
                roomList.forEach(room => {
                    detail += `
                    <p>${room}：</p>
                    `;
                    const dormitoryInfo = room.split('#');
                    console.log('read info', dormitoryInfo, el.warningList)
                    el.warningList.forEach(item => {
                        if(String(item.building)==dormitoryInfo[0] && String(item.room)==dormitoryInfo[1]) {
                            detail += `
                            <p>&emsp;&emsp;${item.studentId} ${item.studentName}；</p>
                            `;
                        }
                    });
                })
                detail += `</div>`;
            } else {
                brief = `以下学生在${el.term}学期挂科科目已超过两门，请您及时关注`;
                detail = `
                    <p>亲爱的辅导员您好：</p>
                    <p>以下学生在${el.term}学期挂科科目已超过两门，请您及时关注：</p>
                    <div style="max-height:50vh;">
                `
                el.warningList.forEach(item => {
                    detail += `
                    <p>&emsp;&emsp;${item.studentId} ${item.studentName} ${item.failNum}门；</p>
                    `;
                });
                detail += `</div>`;
            }
            return {
                id: el.recordId,
                time: new Date(time).toLocaleString(),
                term: el.term,
                brief,
                detail,
            }
        }),
        warningListUnread: data.unreadList.map(el => {
            const time = Date.parse(el.creatTime);
            let brief='', detail='';
            if(el.warningList.length === 0) {
                return {}
            }
            if('building' in el.warningList[0]) {
                const roomSet = new Set();
                el.warningList.forEach(item => {
                    roomSet.add(`${item.building}#${item.room}`);
                });
                const roomList = Array.from(roomSet);
                brief = `以下学生宿舍在${el.term}学期挂科人数过多，请您及时关注`;
                detail = `
                    <p>亲爱的辅导员您好：</p>
                    <p>以下学生宿舍在${el.term}学期挂科人数过多，请您及时关注：</p>
                    <div style="max-height:50vh;">
                `
                roomList.forEach(room => {
                    detail += `
                    <p>${room}：</p>
                    `;
                    const dormitoryInfo = room.split('#');
                    el.warningList.forEach(item => {
                        if(String(item.building)==dormitoryInfo[0] && String(item.room)==dormitoryInfo[1]) {
                            detail += `
                            <p>&emsp;&emsp;${item.studentId} ${item.studentName}；</p>
                            `;
                        }
                    });
                })
                detail += `</div>`;
            } else {
                brief = `以下学生在${el.term}学期挂科科目已超过两门，请您及时关注`;
                detail = `
                    <p>亲爱的辅导员您好：</p>
                    <p>以下学生在${el.term}学期挂科科目已超过两门，请您及时关注：</p>
                    <div style="max-height:50vh;">
                `
                el.warningList.forEach(item => {
                    detail += `
                    <p>&emsp;&emsp;${item.studentId} ${item.studentName} ${item.failNum}门；</p>
                    `;
                });
                detail += `</div>`;
            }
            return {
                id: el.recordId,
                time: new Date(time).toLocaleString(),
                term: el.term,
                brief,
                detail,
            }
        }),
    }
}

export const majorGradeClassListParse = (data) => {
    const res = [];
    for(let i in data) {
        // if(data[i].name == 0 || data[i].name == 99) {
        //     continue;
        // }
        // else {
            res.push({
                id: data[i].gradeId,
                majorName: data[i].major,
                grade: data[i].grade,
                classId: data[i].classId,
                name: data[i].name
            })
        // }
    }
    return res;
}

export const basicGradeDataParse = (data) => {
    return {
        totalNum: data.totalNum,
        failNum: data.failNum,
        failSizeCompare: data.failChange,
        excellentRate: `${Math.floor(data.gradePointAB * 10000) / 100}%`,
        excellentRateComapre: `${Math.floor(data.ABChange * 10000) / 100}%`,
        pass: `${Math.floor(data.pass * 10000) / 100}%`,
        passRateCompare: `${Math.floor(data.passChange * 10000) / 100}%`
    };
}